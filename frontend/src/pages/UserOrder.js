import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";
import OrderTracking from "../pages/OrderTracking";
import Context from "../context";
const UserOrder = () => {
  const { fetchUserAddToCart } = useContext(Context)

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openTrack, setOpenTrack] = useState(false);
  const [orderStatus, setOrderStatus] = useState({});


  const loadingCart = new Array(4).fill(null);
 
  const formatOrders = (ordersData) => {
    return ordersData.map((order) => {
      const orderId = order.orderId;
      const id = order._id;
      const updatedAt = order.updatedAt;
      const orderStatus = order?.orderStatus;
      const billingAddress = order.billingAddress;
      const paymentMethod = order.paymentMethod;
      const paymentStatus = order.paymentStatus;
      const totalPrice = order.totalPrice;
      const orderItems = order.orderItems.map((item) => ({
        category: item?.productId?.category,
        productImage: item?.productId?.productImage[0], // Assuming you want the first image
        productName: item?.productId?.productName,
        price: item.price,
        brandName: item?.productId?.brandName,
        quantity: item.quantity,
      }));

      return {
        id,
        orderId,
        orderStatus,
        billingAddress,
        paymentMethod,
        paymentStatus,
        updatedAt,
        totalPrice,
        orderItems,
      };
    });
  };


  const handleOrderStatus = (id) => {
    const item = data.filter((item) => item.id === id);
    setOrderStatus({
      orderId: item[0]?.orderId,
      updatedAt: item[0]?.updatedAt,
      id:item[0]?.id,
      orderStatus: item[0]?.orderStatus,
      productName: item[0]?.orderItems[0].productName,
    })
    
    setOpenTrack(true);
  }

  const fetchAllOrders = async () => {
    const fetchData = await fetch(SummaryApi.getOrders.url, {
      method: SummaryApi.getOrders.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const dataResponse = await fetchData.json();

    
    if (dataResponse.success) {
      setData(formatOrders(dataResponse?.data));
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  const handleLoading = async () => {
    await fetchAllOrders();
    fetchUserAddToCart();
  };

  


  useEffect(() => {
    setLoading(true);

    handleLoading();
    setLoading(false);
  }, []);

  const CancelOrder = async (id) => {
     
    const response = await fetch(SummaryApi.cancelOrder.url, {
      method: SummaryApi.cancelOrder.method,
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
      fetchAllOrders();
      toast.success(responseData.message);
    }
  };

 

  return (
    <>
      <div className="container mx-auto">
        <div className="text-center text-lg my-3">
          {data.length === 0 && !loading && (
            <p className="bg-white py-5">No Data</p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
          {/***view product */}
          <div className="w-full max-w-3xl">
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
                    key={index}
                    className="w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        alt=""
                        src={product?.orderItems[0].productImage}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative flex flex-col justify-between">
                      {/* *delete product  */}
                      <div
                        className="absolute right-2 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                        onClick={() => CancelOrder(product?.id)}
                      >
                        <MdDelete />
                      </div>

                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.orderItems[0].productName}
                      </h2>

                      <div className="flex items-center justify-between">
                        <p className="text-red-600 font-medium text-lg">
                          Price : {displayINRCurrency(product?.orderItems[0].price)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          Total Price : {displayINRCurrency(product?.orderItems[0].price *product?.orderItems[0].quantity)}
                        </p>
                      </div>


                      <div className="flex items-center justify-between">
                        <p className="">
                          Quantity :{" "}<span>{product?.orderItems[0].quantity}</span>
                        </p>
                        <button
                          onClick={() => {
                            handleOrderStatus(product?.id);
                          }}
                          className=" bg-blue-600 py-1 px-2 text-white hover:bg-green-600 hover:text-white    flex justify-center items-center rounded "
                        >
                          Track Order
                        </button>
                      </div>



                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {openTrack && (
          <OrderTracking
            onClose={() => setOpenTrack(false)}
            order={orderStatus}
          />
        )}
      </div>
    </>
  );
};

export default UserOrder;
