import React from "react";
import { FaCheckCircle, FaCloudDownloadAlt, FaRegCheckCircle, FaShoppingCart } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

import OrderConfirm from "../assest/confirm.png";
import OrderOutOfDelivery from "../assest/delivery.png";
import OrderDelivered from "../assest/house.png";
import OrderShipped from "../assest/shipping.png";
import SummaryApi from "../common";
 

import { toast } from "react-toastify";


const OrderTracking = ({ onClose, order }) => {
 
 
 
const date = order?.updatedAt.split('T')[0] || new Date().getDate();

  
  

  const statuses = ['PENDING', 'SHIPPED', 'DELIVERED',"CANCELLED"];

  const getStatusIndex = (status) => {
    
    return statuses.indexOf(status);
  };


  const handleDownload = async () => {

    const Url = new URL(SummaryApi.invoiceDownload.url);
    Url.searchParams.append('_id', order?.id); // Append the _id as a query parameter


    const response = await fetch(Url, {
      method: SummaryApi.invoiceDownload.method, // This should be 'GET'
      credentials: "include",
      headers: {
        "Accept": "application/pdf", // Expecting a PDF response
      },
    });
    if (!response.ok) {
      toast("Network response was not ok");
    }

    let fileName = `invoice-${order.id}.pdf`;
    const blob = await response.blob();

    function down() {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      return true;
    }
    if (down()) {
      await fetch(`${SummaryApi.invoiceDelete.url}/${fileName}`, {
        method: SummaryApi.invoiceDelete.method,
        credentials: "include",
        headers: {
          "Accept": "application/json",
        },
      });
      
    }
  };



  return (
    <div style={{zIndex:1000}} className='fixed top-0 bottom-0 left-0 right-0 w-full h-full overflow-y-scroll  flex justify-between items-center bg-[rgba(0,0,0,0.3)] bg-opacity-50'>
      <div className='relative mx-auto bg-white rounded-md shadow-lg p-6 w-[80%] '>
        <div className="absolute right-2 top-3 cursor-pointer" onClick={() => onClose()}>
          <RxCross1 size={25} />
        </div>
        <div className="heading my-2 w-full">
          <h1 className="text-center text-xl font-bold"> {order?.productName}</h1>
        </div>
        <div className="deliveryDetails flex md:flex-row flex-col items-center md:space-y-0 space-y-2  md:justify-between">
          <div className="deliveryDetailLeft">
            <div className="shipped   ">
              <div className="flex  gap-2">
                <div className="icon  cursor-pointer">
                  <FaShoppingCart size={25} />
                </div>
                <div className=" cursor-pointer">
                  <p className=""> ORDER ID : <span className="font-bold">#{order?.orderId.split("_")[1]}</span>
                  </p>
                </div>
              </div>

              <div className="flex text-white gap-2 md:w-[80%] w-full items-center justify-center p-2 rounded-md" onClick={handleDownload} style={{ background: "green" }}>
                <div className="icon  cursor-pointer">
                  <FaCloudDownloadAlt size={25} />
                </div>
                <div className="cursor-pointer">
                  <button target="_blank">Download Invoice</button>
                </div>
              </div>



            </div>
          </div>
          <div className="deliveryDetailRight">
            <div className="top">
              <p>Expected Arrival : <span className="text-white inline-block bg-blue-500 p-2 rounded-md cursor-pointer">{date}</span></p>
            </div>
            <div className="bottom">
              <p>   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tracking ID :&nbsp; <span className="text-white inline-block bg-red-500  p-2 rounded-md cursor-pointer">{order?.id.slice(0,10)}</span></p>
            </div>
          </div>
        </div>

        <div className="progress flex md:flex-col flex-row   md:space-y-11 justify-evenly  my-5">
          <div className="greenLines cursor-pointer md:w-full md:flex-row flex-col h-full flex items-center ">
            {statuses.map((status, index) => (
              <React.Fragment key={status}>
                <div className="circle z-0" title={`Order ${status.replace('_', ' ')}`}>
                  {getStatusIndex(order?.orderStatus) >= index ? (
                    <FaCheckCircle size={25} color="green" />
                  ) : (
                    <FaRegCheckCircle size={25} />
                  )}
                </div>
                {index < statuses.length - 1 && (
                  <div
                    title={`Order ${status.replace('_', ' ')}`}
                    className="line md:w-full md:h-2 h-[5rem] w-2 ml-[-2px] mr-[-2px]"
                    style={{
                      background: getStatusIndex(order?.orderStatus) >= index ? "green" : "gray"
                    }}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="orderImages flex items-center md:w-full md:flex-row flex-col md:space-y-0 space-y-5 justify-between cursor-pointer">
            <div className="firstStep flex items-center gap-2">
              <div className="firstStepLeft">
                <div className="imageContainer">
                  <img src={OrderConfirm} alt="Order Confirmed" className="h-full w-full" />
                </div>
              </div>
              <div className="firstStepRight flex flex-col items-center">
                <span>Order</span><span className="inline-block mt-[-3px]">Confirmed</span>
              </div>
            </div>
            <div className="secondStep flex items-center gap-2">
              <div className="secondStepLeft">
                <div className="imageContainer">
                  <img src={OrderShipped} alt="Order Confirmed" className="" />
                </div>
              </div>
              <div className="secondStepRight flex flex-col items-center">
                <span>Order</span><span className="inline-block mt-[-3px]">Shipped</span>
              </div>
            </div>
            <div className="thirdStep flex items-center gap-2">
              <div className="thirdStepLeft">
                <div className="imageContainer">
                  <img src={OrderOutOfDelivery} alt="Order Confirmed" className="" />
                </div>
              </div>
              <div className="thirdStepRight flex flex-col items-center">
                <span>Out for</span><span className="inline-block mt-[-3px]">Delivery</span>
              </div>
            </div>
            <div className="fourthStep flex items-center gap-2">
              <div className="fourthStepLeft">
                <div className="imageContainer">
                  <img src={OrderDelivered} alt="Order Confirmed" className="" />
                </div>
              </div>
              <div className="fourthStepRight flex flex-col items-center">
                <span>Order</span><span className="inline-block mt-[-3px]">Delivered</span>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>

  );
};

export default OrderTracking;

