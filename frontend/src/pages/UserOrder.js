import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";
import OrderTracking from "../pages/OrderTracking";
const UserOrder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openTrack, setOpenTrack] = useState(false);

  const loadingCart = new Array(4).fill(null);
  const [filteredData, setFilteredData] = useState(null);

  const navigate = useNavigate();

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  const formatOrders = (ordersData) => {
    return ordersData.map((order) => {
      const orderId = order.orderId;
      const id = order._id;
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
        billingAddress,
        paymentMethod,
        paymentStatus,
        totalPrice,
        orderItems,
      };
    });
  };

  console.log(data);

  const fetchAllOrders = async () => {
    const fetchData = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const dataResponse = await fetchData.json();

    console.log(" DDDDDDD : ", dataResponse);
    if (dataResponse.success) {
      setData(formatOrders(dataResponse?.data));
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  const handleLoading = async () => {
    await fetchAllOrders();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

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
      fetchAllOrders();
      toast.success(responseData.message);
    }
  };

  const dataFilter = (id) => {
    // console.log(id);
    // const dd = data.filter((item) => {
    //   if (item.id === id) {
    //     const image = item.orderItems[0].productImage;
    //     const productName = item?.orderItems[0].productName;
    //     const paymentMethod = item?.paymentMethod;
    //     const billingAddress = item?.billingAddress;
    //     const orderId = item?.orderId;
    //     const quantity = item?.orderItems?.quantity;
    //     const price = item?.orderItems?.price;

    //     return {
    //       image,
    //       productName,
    //       billingAddress,
    //       orderId,
    //       quantity,
    //       price,
    //       paymentMethod,
    //     };
    //   }
    // });
    // setFilteredData(

    // )

    // console.log(" Filtered : ", filteredData);
    // console.log(" Fi  : ", dd);

    // setOpenTrack(true);
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
                      <div className="px-4 py-2 relative">
                        {/* *delete product  */}
                        <div
                          className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                          onClick={() => deleteCartProduct(product?.id)}
                        >
                          <MdDelete />
                        </div>

                        <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                          {product?.orderItems[0].productName}
                        </h2>

                        <div className="flex items-center justify-between">
                          <p className="text-red-600 font-medium text-lg">
                            {displayINRCurrency(product?.orderItems[0].price)}
                          </p>
                          <p className="text-slate-600 font-semibold text-lg">
                            {displayINRCurrency(product?.totalPrice)}
                          </p>
                        </div>
                        <div className="flex justify-between ">
                          <div>
                            Quantity :{" "}
                            <span>{product?.orderItems[0].quantity}</span>
                          </div>

                          <button
                            onClick={() => {
                              setOpenTrack(true);
                            }}
                            style={{ marginTop: "-8px" }}
                            className=" bg-blue-600 p-4 text-white hover:bg-green-600 hover:text-white   h-6 flex justify-center items-center rounded "
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
            // image={filteredData?.orderItems[0].productImage}
            // orderId={filteredData?.orderId}
            // billingAddress={filteredData?.billingAddress}
            // productName={filteredData?.orderItems[0].productName}
            // quantity={filteredData?.orderItems[0].quantity}
            // paymentMethod={filteredData?.paymentMethod}
            // price={filteredData?.totalPrice}
          />
        )}
      </div>
    </>
  );
};

export default UserOrder;
