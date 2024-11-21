import React, { useState } from "react";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import displayINRCurrency from "../helpers/displayCurrency";
import AdminEditProduct from "./AdminEditProduct";

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);
 
  const handleDeleteProduct = async() =>{
     
    const response = await fetch(SummaryApi.deleteProduct.url,{
      method : SummaryApi.deleteProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({_id : data?._id})
    })
    
     

    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData?.message)
        
        fetchdata()
    }


    if(responseData.error){
      toast.error(responseData?.message)
    }
  

  }

  

  return (
    <div className="bg-white p-4 rounded ">
      <div className="w-40 adminProduct">
        <div className="w-32 h-32 flex justify-center items-center">
          <img
            src={data?.productImage[0]}
            alt=""
            className="mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>

        <div>
          <p className="font-semibold">
            {displayINRCurrency(data.sellingPrice)}
          </p>

          {/* <div className=' w-full ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                    <MdModeEditOutline className='bg-red-200'  />
                    
                </div> */}

           <div className="flex justify-between items-center w-full ml-auto">
           <div className=' w-auto  p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                    <MdModeEditOutline    />
                    
                </div>


                <div className=' w-auto p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer' onClick={handleDeleteProduct}  >
                <MdDelete />
                    
                </div>
           </div>




          {/* <div className="flex justify-between items-center w-full ml-auto p-2 bg-green-100 rounded-full">
            <MdModeEditOutline onClick={() => setEditProduct(true)} />
            <MdDelete />
          </div> */}





        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;
