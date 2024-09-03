import React, { useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { toast } from "react-toastify";
import SummaryApi from "../common";

const PaymentDetail = ({ onClose, data, setData,handleOnChange ,handleSubmit}) => {
 
  

  const userData = async () => {
    const fetchData = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const responseData = await fetchData.json();

    if (responseData.success) {
      setData((prev) => {
        return {
          ...prev,
          name: responseData?.data?.name,
          email: responseData?.data?.email,
        };
      });
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    userData();
  }, []);

  return (
    <>
      <div className="fixed w-full  h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
        <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
          <div className="flex justify-between items-center pb-3">
            <h2 className="font-bold text-lg">User Payment Details</h2>
            <div
              className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
              onClick={onClose}
            >
              <CgClose />
            </div>
          </div>

          <form
            className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
            onSubmit={handleSubmit}
          >
            <label htmlFor="name">Username :</label>
            <input
              type="text"
              id="name"
              readOnly
              name="name"
              value={data.name}
                onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
              required
            />

            <label htmlFor="email">Email :</label>
            <input
              type="text"
              id="email"
              readOnly
              name="email"
              value={data.email}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
              required
            />

            <label htmlFor="quantity">No of Products :</label>
            <input
              type="text"
              id="quantity"
              readOnly
              name="quantity"
              value={data.quantity}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
              required
            />

           

            <label htmlFor="totalPrice" className="mt-3">
              Price :
            </label>
            <input
              type="number"
              id="totalPrice"
              readOnly
              placeholder="enter price"
              value={data.totalPrice}
              name="totalPrice"
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
              required
            />

            <label htmlFor="address" className="mt-3">
              Address :
            </label>
            <textarea
              className="h-28 bg-slate-100 border resize-none p-1"
              placeholder="enter user address"
              rows={2}
              onChange={handleOnChange}
              name="address"
               
              value={data.address}
            ></textarea>

            <button className="px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700">
              Create Order
            </button>
          </form>
        </div>

        {/***display image full screen */}
        {/* {
        openFullScreenImage && (
          <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
       } */}
      </div>
    </>
  );
};

export default PaymentDetail;
