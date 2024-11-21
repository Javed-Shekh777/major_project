import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import PaymentDetail from "../components/PaymentDetail";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";

const Cart = () => {
  const initial = {
    name: "",
    email: "",
    address: "",
    products: [],
    cartId:"",
    quantity : 0,
    totalPrice: 0,
  };
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(4).fill(null);
  const [userInfo, setUserInfo] = useState(initial);
 
 

  const navigate = useNavigate();

 


  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  


  const loadRazorpay = (Result,ID,cartId) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        

        const { amount, id: order_id, currency ,} = Result.data;


        const options = {
          key: process.env.PAY_SECRET,
          amount: amount.toString(),
          currency: currency,
          name: "Ecommerce Services",
          description: "Test Transaction",
          order_id: order_id,
          handler: async (response) => {
             
            const Data = {
              id: ID,
              cartId:cartId,
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };

            try {
          

              const fetchData = await fetch(SummaryApi.paymentSuccess.url, {
                method: SummaryApi.paymentSuccess.method,
                credentials:'include',
                headers : {
                  "content-type" : "application/json"
              },
                body: JSON.stringify(Data),
              });
          
             
              const response = await fetchData.json();
            
              toast.success(response.data.message);
              navigate("/order-track");
            } catch (error) {

              toast.error("Payment Failed!!");
            }
          },
          prefill: {
            name: "Javed Shekh",
            email: "javedshekh777@gmail.com",
            contact: "6307354106",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#61dafb",
          },
        };

        const paymentObject = new window.Razorpay(options);
       
        paymentObject.on("payment.failed",async function (response){

            await fetch(SummaryApi.paymentSuccess.url, {
            method: SummaryApi.paymentSuccess.method,
            credentials:'include',
            headers : {
              "content-type" : "application/json"
          },
            body: JSON.stringify({check:true}),
          });

          toast.error(response.error.reason);
        });

        paymentObject.open();
      } catch (error) {
        toast.error(error);
      }
    };
    document.body.appendChild(script);
  };

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      toast.success(responseData.message);
      context.fetchUserAddToCart();
    }
  };



 
  const handleUser = async (el) => {
    
     
    const order = {
      quantity : 0,
      productId : "",
      price : 0,
    }
    
    if (el && el.productId) {
      
      order.productId = el?.productId?._id;
      order.quantity = el?.quantity;
      order.price = order.quantity * el?.productId?.sellingPrice

      setUserInfo({
        ...userInfo,
        totalPrice: el?.quantity * el?.productId?.sellingPrice,
        quantity: el?.quantity,
        products : [ order],
        cartId:el?._id
      });


    }else{
      const newProducts = data.map(item => {
        // Only add items that meet certain criteria, e.g., price > 150
        if (item ) {
          return {
            quantity: item?.quantity,
            productId: item?.productId?._id,
            price : item?.quantity * item?.productId?.sellingPrice
          };
        }
        return null; // Skip items that don't meet criteria
      }).filter(item => item !== null); //
      setUserInfo({
        ...userInfo,
        totalPrice: totalPrice,
        quantity: totalQty,
        products : [...newProducts]
      });

      
    }
    setOpenPayment(true);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenPayment(false);
 
    const fetchData = await fetch(SummaryApi.saveOrder.url, {
      method: SummaryApi.saveOrder.method,
      credentials:'include',
      headers : {
        "content-type" : "application/json"
    },
      body: JSON.stringify({
        amount : userInfo.totalPrice,
        orderItems :  userInfo.products,
        address: userInfo.address,
      }),
    });

   

    const responseData = await fetchData.json();
 


    if (responseData) {
      
      toast.success(responseData.message);
      setUserInfo(initial);
      const confirm = window.confirm("Order confirm or not");
      if(confirm){
        const fetchData = await fetch(SummaryApi.createOrder.url, {
          method: SummaryApi.createOrder.method,
          credentials:'include',
          headers : {
            "content-type" : "application/json"
        },
          body: JSON.stringify({
            id : responseData?.data?._id,
          }),
        });
    
        const response = await fetchData.json();
      

         if(response.success){
          loadRazorpay(response,responseData?.data?._id,userInfo.cartId);

         }
      }else{
        alert("Order cancelled");
      }
    } else {
      
      toast.error(responseData.message);
      setUserInfo(initial);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
  

    setUserInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

 
  
  return (
    <>
      <div className="container mx-auto">
        <div className="text-center text-lg my-3 ">
          {data.length === 0 && !loading && (
            <p className="bg-white py-5">No Data</p>
          )}
        </div>

        <div className="flex flex-col  lg:flex-row gap-10 lg:justify-between p-4">
          {/***view product */}
          <div className="w-full max-w-3xl ">
            {loading
              ? loadingCart?.map((el, index) => {
                  return (
                    <div
                      key={el + "Add To Cart Loading" + index}
                      className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                    ></div>
                  );
                })
              : data?.map((product, index) => {
                  return (
                    <div
                      key={product?._id + "Add To Cart Loading"}
                      className="w-full bg-white h-42 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr] "
                    >
                      <div className="w-32 h-[143px] bg-slate-200">
                        <img
                          alt=""
                          src={product?.productId?.productImage[0]}
                          className="w-full h-full object-scale-down mix-blend-multiply"
                        />
                      </div>
                      <div className="px-4 py-2 relative">
                        {/**delete product */}
                        <div
                          className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                          onClick={() => deleteCartProduct(product?._id)}
                        >
                          <MdDelete />
                        </div>

                        <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                          {product?.productId?.productName}
                        </h2>
                        <p className="capitalize text-slate-500">
                          {product?.productId.category}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="text-red-600 font-medium text-lg">
                            {displayINRCurrency(
                              product?.productId?.sellingPrice
                            )}
                          </p>
                          <p className="text-slate-600 font-semibold text-lg">
                            {displayINRCurrency(
                              product?.productId?.sellingPrice *
                                product?.quantity
                            )}
                          </p>
                        </div>
                        <div className="flex justify-between align-center  gap-3 mt-1">
                          <div className="flex gap-3">
                            <button
                              className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                              onClick={() =>
                                decraseQty(product?._id, product?.quantity)
                              }
                            >
                              -
                            </button>
                            <span>{product?.quantity}</span>
                            <button
                              className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded "
                              onClick={() =>
                                increaseQty(product?._id, product?.quantity)
                              }
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => handleUser(product)}
                            className=" bg-blue-600 p-4 text-white hover:bg-green-600 hover:text-white  h-6 flex justify-center items-center rounded "
                          >
                            Payment
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
          </div>

          {/***summary  */}
          {/* <div className="mt-5 lg:mt-0 w-full max-w-sm">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="h-36 bg-white">
                <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Quantity</p>
                  <p>{totalQty}</p>
                </div>

                <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                  <p>Total Price</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>

                <button
                  // onClick={loadRazorpay}
                  onClick={handleUser}
                  className="bg-blue-600 p-2 text-white w-full mt-2"
                >
                  Pay for All Products
                </button>
              </div>
            )}
          </div> */}
        </div>
      </div>

      {openPayment && (
        <PaymentDetail
          data={userInfo}
          setData={setUserInfo}
          handleOnChange={handleOnChange}
          handleSubmit={handleSubmit}
          onClose={() => setOpenPayment(false)}
        />
      )}
    </>
  );
};

export default Cart;
