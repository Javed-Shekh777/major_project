import moment from "moment";
import { default as React, useEffect, useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import { ORDERSTATUS, PAYMENTSTATUS } from "../common/role";





const ChangeUserRole = ({ Role, onClose, userID, callFun }) => {

  const [status, setStatus] = useState("");



  const handleOnChangeSelect = (e) => {
    setStatus(e.target.value);

   
  };

  const updateStatus = async () => {
    const fetchResponse = await fetch(SummaryApi.changeStatus.url, {
      method: SummaryApi.changeStatus.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        pstatus: Object.keys(Role).length === 3 ? status : "",
        ostatus: Object.keys(Role).length === 4 ? status : "",
        id: userID,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      callFun();
      onClose();
    } else {
      toast.error(responseData.message);
      callFun();
      onClose();

    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0  h-auto z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-2 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>

        <h1 className="pb-2 text-lg font-medium text-center">Change Status</h1>

        <div className="flex items-center justify-between my-4">
          <p>Status :</p>
          <select
            className="border px-2 py-1"
            value={status}
            onChange={handleOnChangeSelect}
          >
            {Object.values(Role)?.map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>

        <button
          className="w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700"
          onClick={updateStatus}
        >
          Change Status
        </button>
      </div>
    </div>
  );
};

const AllOrders = () => {
  const initial = {
    orderId: "",
    createdAt: "",
    customer: {
      image: "",
      name: "",
    },
    totalPrice: `Rs${0}`,
    qty: 0,
    status: "",
  };
  const [allOrder, setAllOrders] = useState([]);




  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [set, setSet] = useState({
    id: "",
    status: "",
  });




  const formatOrders = (ordersData) => {
    return ordersData.map((order) => {
      const customer = {
        image: order?.user?.profilePic, // You can populate this with the user's image URL if available
        name: order?.user?.name,

      };

      const totalPrice = `Rs${order.totalPrice}`;

      const qty = order.orderItems.reduce(
        (acc, item) => acc + item?.quantity,
        0
      );

      const paymentStatus = order?.paymentStatus;
      const orderStatus = order?.orderStatus;
      const id = order?._id;


      return {
        orderId: order?.orderId,
        createdAt: order?.createdAt,
        customer,
        totalPrice,
        qty,
        paymentStatus,
        orderStatus,
        id
      };
    });
  };

  const deleteUser = async (el) => {
    try {
      const fetchData = await fetch(SummaryApi.deleteUser.url, {
        method: SummaryApi.updateUserRole.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: el?.email,
          userID: el?._id,
        }),
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        fetchAllOrders();
        toast.success(dataResponse.message);
      }

      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchAllOrders = async () => {
    const fetchData = await fetch(SummaryApi.getOrders.url, {
      method: SummaryApi.getOrders.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();
    

    if (dataResponse.success) {
      setAllOrders(formatOrders(dataResponse.data));
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (


    <div className='bg-white pb-4 overflow-x-auto '>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>Created</th>
            <th>Customer</th>
            <th>TotalPrice</th>
            <th>QTY</th>
            <th>Payment</th>
            <th>Order</th>
          </tr>
        </thead>

        <tbody className="">
          {allOrder?.map((el, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{moment(el?.createdAt).format("LL")}</td>
                <td className="flex items-center justify-center  p-2 gap-3">
                  {el?.customer ? (
                    <img
                      src={el?.customer?.image}
                      alt="no"
                      className="fluid w-10 h-10 rounded-full border-0"
                    />
                  ) : (
                    <FaRegCircleUser />
                  )}

                  <span>{el?.customer?.name}</span>
                </td>
                <td>{el?.totalPrice}</td>
                <td>0{el?.qty}</td>

                <td className="p-1">
                  <button
                    className="bg-green-100 px-2 py-1 w-[90%] rounded-full cursor-pointer hover:bg-green-500 hover:text-black "
                    style={{
                      background:
                        el?.paymentStatus === "PAID" ? "green" : "yellow",
                      color:
                        el?.paymentStatus === "PAID" ? "white" : "black",
                    }}
                    onClick={() => {
                      setSet((prev) => ({
                        ...prev,
                        id: el?.id,
                        status: PAYMENTSTATUS
                      })
                      );
                      setOpenUpdateRole(true);
                    }}
                  >
                    {el?.paymentStatus}
                    <i className="fa-solid fa-sort"></i>
                  </button>
                </td>

                <td className="gap-2">
                  <button
                    className="bg-green-100 px-2 py-1 w-[90%] rounded-full cursor-pointer hover:bg-green-500 hover:text-black "
                    style={{
                      background:
                        el?.orderStatus === "DELIVERED" ? "green" : "aqua",
                      color:
                        el?.orderStatus === "DELIVERED" ? "white" : "black",
                    }}
                    onClick={() => {
                      setSet((prev) => ({
                        ...prev,
                        id: el?.id,
                        status: ORDERSTATUS
                      })
                      );
                      setOpenUpdateRole(true);
                    }}
                  >
                    {el?.orderStatus}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {openUpdateRole && (
        <>
          <ChangeUserRole callFun={fetchAllOrders} Role={set.status} userID={set.id} onClose={() => setOpenUpdateRole(false)} />
        </>
      )}
    </div>
  );
};

export default AllOrders;
