import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import SummaryApi from "../common";
import { toast } from 'react-toastify';
import { FaRegCircleUser } from 'react-icons/fa6';
import imageTobase64 from '../helpers/imageTobase64';
import uploadImage from '../helpers/uploadImage';





const UserDetail = () => {
    const [data, setData] = React.useState(
        {
            email : "",
            name : "",
            profilePic : "",
        }
    );
    const [preview,SetPreview] = useState("");
 

    const userData = async () => {
        const fetchData = await fetch(SummaryApi.current_user.url, {
            method: SummaryApi.current_user.method,
            credentials: "include",
        });

        const data = await fetchData.json();

        if (data.success) {
            // setData(data.data);
            setData({
                name:data?.data?.name,
                profilePic:data?.data?.profilePic,
                email:data?.data?.email,

            })
        }
        if (data.error) {
            toast.error(data.message);
        }
    }

    const handleOnChange = (e) =>{
        const { name , value } = e.target
  
        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleUploadPic = async(e) =>{
        const file = e.target.files[0];
         const cloudinary =await uploadImage(file);
        
         if(cloudinary && cloudinary?.url){
            toast.success("Image Uploaded Successfully!!");
        }else{
            toast.success("Image Not Uploaded !!");
        }
        const imagePic = await imageTobase64(file);
        SetPreview(imagePic);
        
        setData((preve)=>{
          return{
            ...preve,
            profilePic : cloudinary?.url || "",
          }
        })
    
      }
    

      const handleSubmit = async(e) =>{
        e.preventDefault()
  
        if(data.password === data.confirmPassword){
  
          const dataResponse = await fetch(SummaryApi.updateUser.url,{
              method : SummaryApi.signUP.method,
              credentials : 'include',
              headers : {
                  "content-type" : "application/json"
              },
              body : JSON.stringify(data)
            })
      
            const dataApi = await dataResponse.json()
  
            if(dataApi.success){
              toast.success(dataApi.message)
             
            }
  
            if(dataApi.error){
              toast.error(dataApi.message)
            }
      
        }else{
          toast.error("Please check password and confirm password")
        }
  
    }
  
    




    React.useEffect(() => {
        userData();
    }, []);


    return (
        <div className="container rounded  bg-white mt-5 mb-5 h-[80vh]">
            <div className="userDetail flex h-full md:flex-row sm:flex-col">
                <div className="border-r md:border-r-2 md:w-[25rem] sm:w-full">
                    <div className="flex flex-col items-center text-center p-3 py-5">
                        <div className='relative my-5  '>
                            <div className='text-7xl cursor-pointer relative flex justify-center'>
                                {
                                    data?.profilePic || preview? (
                                        <img src={preview || data?.profilePic} className='w-20 h-20 rounded-full' alt={data?.name} />
                                    ) : (
                                        <FaRegCircleUser />
                                    )
                                }
                            </div>
                            <form>
                                <label>
                                    <div title='Edit Profile Image' className=' absolute right-0 bottom-0  border-black border-[2px] rounded-full h-8 w-8 flex items-center justify-center cursor-pointer'>
                                        <MdEdit />
                                    </div>
                                    <input type='file' className='hidden' name='profilePic' onChange={handleUploadPic} />
                                </label>
                            </form>




                        </div>
                        <span className="font-bold">{data?.name || "Username"}</span>
                        <span className="text-gray-500">{data?.email || "test@mail.com"}</span>
                    </div>
                </div>

                <div className="   w-full">

                    <div className='heading border-b-[1px] border-b-gray-300 w-full p-3 text-center'>
                        <h1 className='font-bold text-2xl'>Profile Setting</h1>
                    </div>

                    <div className='formContainer w-full flex items-center justify-center my-2'>
                        <form className='form w-[60%] flex flex-col items-center justify-center  '>
                            <div className='inputField  rounded-md p-2 w-full flex flex-col gap-1'>
                                <label htmlFor='name '>Username</label>
                                <input type="text" id="name" name='name' value={data?.name} onChange={handleOnChange} className='border-[1px] border-gray-300 rounded-md p-2' />
                            </div>

                            <div className='inputField  rounded-md p-2 w-full flex flex-col gap-1'>
                                <label htmlFor='email'>Email</label>
                                <input type="text" id='email' name='email' onChange={handleOnChange} value={data?.email} className='border-[1px] border-gray-300 rounded-md p-2' />
                            </div>
                            <div className='inputField bg-blue-500 mt-4 text-white hover:bg-blue-800   rounded-md p-2 w-full flex flex-col gap-1' onClick={handleSubmit}>
                                <button type="submit  "  >Save Changes</button>

                            </div>


                        </form>
                    </div>


                </div>


            </div>
        </div>
    );
};

export default UserDetail;