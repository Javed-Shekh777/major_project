import React from "react";
import { IoMdClose } from "react-icons/io";
const OrderTracking = ({onClose,orderId,image,price,quantity,billingAddress,paymentMethod,productName}) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
       <div className='mx-auto  p-4 w-full max-w-sm'>

      <div style={{ width: "400px" }}>
      
        <div className="card px-2 py-2  flex flex-col justify-center  ">
          <div className="card-header  ">
            <div className="row ">
            <button className='block ml-auto' onClick={onClose}>
                <IoMdClose/>
            </button>
              <div className="col mb-8">
                <p className="text-muted text-center">
                  {" "}
                  Order ID{" "}
                  <span className="font-weight-bold text-dark">{orderId}</span>
                </p>
                <p className="text-muted text-center">
                  {" "}
                  Place On{" "}
                  <span className="font-weight-bold text-dark">
                    12,March 2019
                  </span>{" "}
                </p>
              </div>
              <div className="flex-col my-auto"></div>
            </div>
          </div>
          <div className="card-body text-center">
            <div className="media image flex-column flex-sm-row text-center">
              <div className="media-body ">
                <h5 className="bold">{productName}</h5>
                <p className="text-muted"> Qt: {quantity} Pair</p>
                <h4 className="mt-3 mb-4 bold">
                  {" "}
                  <span className="mt-5">&#x20B9;</span> {price}{" "}
                  <span className="small text-muted"> via ({paymentMethod}) </span>
                </h4>
                <p className="text-muted">
                  Tracking Status on:{" "}
                  <span className="Today">11:30pm, Today</span>
                </p>
                <button
                  type="button"
                  className="btn  btn-outline-primary d-flex"
                >
                  {billingAddress}
                </button>
              </div>
              <div className="flex items-center justify-center">
              <img
                className="img-fluid "
                src={image || "https://i.imgur.com/bOcHdBa.jpg"}
                width="160 "
                height="160"
              />
              </div>
              
            </div>
          </div>
          <div className="row px-3">
            <div className="col">
              <ul id="progressbar">
                <li className="step0 active " id="step1">
                  PLACED
                </li>
                <li className="step0 active text-center " id="step2">
                  SHIPPED
                </li>
                <li className="step0  text-muted text-right" id="step3">
                  DELIVERED
                </li>
              </ul>
            </div>
          </div>
          <div className="card-footer  bg-white px-sm-3 pt-sm-4 px-0">
            <div className="row text-center  ">
              <div className="col my-auto  border-line ">
                <h5 onClick={onClose}>Close</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default OrderTracking;
