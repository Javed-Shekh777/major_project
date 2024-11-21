import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdModeEdit } from "react-icons/md";
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser,setAllUsers] = useState([])
    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id  : ""
    })


    const deleteUser = async (el)=>{

        try {


            const fetchData = await fetch(SummaryApi.deleteUser.url,{
                method : SummaryApi.updateUserRole.method,
                credentials : 'include',
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify({
                    email : el?.email,
                    userID:el?._id,
                })
            })
    
            const dataResponse = await fetchData.json()
    
            if(dataResponse.success){
               
                fetchAllUsers();
                toast.success(dataResponse.message);
            }
    
            if(dataResponse.error){
                toast.error(dataResponse.message)
            }
            
        } catch (error) {
            toast.error(error.message);   
        }
    }

    const fetchAllUsers = async() =>{
        const fetchData = await fetch(SummaryApi.allUser.url,{
            method : SummaryApi.allUser.method,
            credentials : 'include'
        })

        const dataResponse = await fetchData.json()

        if(dataResponse.success){
            setAllUsers(dataResponse.data);
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

    }

    useEffect(()=>{
        fetchAllUsers()
    },[])

  return (
    <div className='bg-white pb-4 overflow-x-auto '>
        <table className='w-full userTable'>
            <thead>
                <tr className='bg-black text-white'>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className=''>
                {
                    allUser?.map((el,index) => {
                        return(
                            <tr>
                                <td>{index+1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('LL')}</td>
                                <td className='flex justify-evenly align-center '>
                                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                                    onClick={()=>{
                                        setUpdateUserDetails(el)
                                        setOpenUpdateRole(true)

                                    }}
                                    >
                                        <MdModeEdit/>
                                         
                                    </button>

                                    <button className='bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white' 
                                    onClick={()=>{
                                        deleteUser(el);
                                       

                                    }}
                                    >
                                        <MdDelete />
                                         
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>

        {
            openUpdateRole && (
                <ChangeUserRole 
                    onClose={()=>setOpenUpdateRole(false)} 
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )      
        }
    </div>
  )
}

export default AllUsers