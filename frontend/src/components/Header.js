import React, { useContext, useEffect, useState } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { GrSearch } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { ROLE } from '../common/role';
import Context from '../context';
import { setUserDetails } from '../store/userSlice';
import Logo from './Logo';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const [order, setOrder] = useState(0);

  // const {fetchAllOrders} = useContext(Context);


  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json()



    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if (data.error) {
      toast.error(data.message)
    }

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
      setOrder(dataResponse.data?.length);
     
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  const handleLoading = async () => {
    await fetchAllOrders();
  };

  useEffect(() => {
    handleLoading();
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)

    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate("/search")
    }
  }


  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className=' md:ml-0 ml-4 sm:p-2  flex lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
          <input type='text' placeholder='Search Product here...' className='w-full outline-none ' onChange={handleSearch} value={search} />
          <div className='text-lg min-w-[50px]  flex items-center justify-center rounded-r-full text-white'>
            <GrSearch size={20} color='gray' />
          </div>
        </div>


        <div className='flex items-center gap-5'>

          <div className='relative flex justify-center'>

            {
              user?._id && (
                <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(preve => !preve)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                    ) : (
                      <FaRegCircleUser />
                    )
                  }
                </div>
              )
            }



            {
              menuDisplay && (
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                  <nav>
                    {
                      user?.role === ROLE.ADMIN ? (
                        <><Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Admin Panel</Link><Link to={"/user-detail"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>User Profile</Link></>
                      ) :
                        (<Link to={"/user-detail"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => !preve)}>User Profile</Link>)
                    }







                  </nav>
                </div>
              )
            }

          </div>

          {
            user?._id && (
              <Link to={"/cart"} className='text-2xl relative'>
                <span><FaShoppingCart /> </span>

                <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm text-center relative top-[1px]'>{context?.cartProductCount}</p>
                </div>
              </Link>
            )
          }

          <div>
            {
              order ? (
                (<Link to={"/order-track"} className='relative'>
                  <button className='px-3 py-1 rounded-full text-white bg-blue-500 hover:bg-blue-700'>Orders</button>
                  {/* <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2'>
                    <p className='text-sm text-center relative top-[1px]'>{order}</p>
                  </div> */}
                </Link>)
              ) : ""
            }

          </div>


          <div>
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
              )
                : (
                  <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login</Link>
                )
            }

          </div>

        </div>

      </div>
    </header>
  )
}

export default Header