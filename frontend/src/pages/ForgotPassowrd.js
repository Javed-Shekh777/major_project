import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SummaryApi from "../common";
 
const ForgotPassowrd = () => {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hide, setHide] = useState(false);
  const [otphide, setOtphide] = useState(false);
  const [reset, setReset] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.request_otp.url, {
      method: SummaryApi.request_otp.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const dataApi = await dataResponse.json();
  

    if (dataApi.success) {
      toast.success(dataApi.message);
      setHide(true);
      setOtphide(true)
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.verify_otp.url, {
      method: SummaryApi.verify_otp.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ otp, email }),
    });

    const dataApi = await dataResponse.json();
    

    if (dataApi.success) {
      toast.success(dataApi.message);
      setHide(true)
      setOtphide(false)
      setReset(true);
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  const resetPsw = async (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      return toast.success("Password must be matched.");
    }
    const dataResponse = await fetch(SummaryApi.new_psw.url, {
      method: SummaryApi.new_psw.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });
   

    const dataApi = await dataResponse.json();
   

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/login");
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="text-center mx-auto">
            <h2 className="fs-2" style={{ fontSize: 25 }}>
              {reset ? "Update Password" : "Verify Email By OTP"}
            </h2>
          </div>

         {hide ? "":( <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Send OTP
            </button>
          </form>
)}

          {otphide ?(
             <form className="pt-6 flex flex-col gap-2" onSubmit={verifyOTP}>
             <div className="grid">
               <label>Email : </label>
               <div className="bg-slate-100 p-2">
                 <input
                   type="email"
                   placeholder="Enter email"
                   name="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full h-full outline-none bg-transparent"
                 />
               </div>
             </div>

             <div className="grid">
               <label>OTP : </label>
               <div className="bg-slate-100 p-2">
                 <input
                   type="text"
                   placeholder="Enter opt"
                   name="otp"
                   value={otp}
                   onChange={(e) => setOtp(e.target.value)}
                   className="w-full h-full outline-none bg-transparent"
                 />
               </div>
             </div>
             <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
               Verify OTP
             </button>
           </form>
          ):""}



          {reset ? (
             <form className="pt-6 flex flex-col gap-2" onSubmit={resetPsw}>
             <div className="grid">
               <label>Email : </label>
               <div className="bg-slate-100 p-2">
                 <input
                   type="email"
                   placeholder="Enter email"
                   name="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full h-full outline-none bg-transparent"
                 />
               </div>
             </div>
             
             <div>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='Enter password'
                                    value={password}
                                    name='password' 
                                    onChange={(e)=>setPassword(e.target.value)}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>
                                <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaEyeSlash/>
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label>Confirm Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input 
                                    type={showConfirmPassword ? "text" : "password"} 
                                    placeholder='Enter confirm password'
                                    value={cPassword}
                                    name='confirmPassword' 
                                    onChange={(e)=>setCPassword(e.target.value)}
                                    required
                                    className='w-full h-full outline-none bg-transparent'/>

                                <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((preve)=>!preve)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                <FaEyeSlash/>
                                            )
                                            :
                                            (
                                                <FaEye/>
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
             <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[200px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
               Update Password
             </button>
           </form>
 
          ):""}
        </div>
      </div>
    </section>
  );
};

export default ForgotPassowrd;
