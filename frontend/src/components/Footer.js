import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Footer = () => {
  return (

    <>
      <footer className=" bg-[#fbfbfd]" style={{ boxShadow: "0 0 3px" }}>
        <div className=" py-9   relative overflow-hidden">
          <div className="container mx-auto px-4 z-30">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="f_widget company_widget wow fadeInLeft" data-wow-delay="0.2s">
                <h3 className="f-title font-semibold text-[#263b5e] text-[18px] mb-[30px]">Get in Touch</h3>
                <p className="text-[#6a7695] text-[16px] font-light leading-[28px] mb-[20px]">Don’t miss any updates of our new templates and extensions!</p>
                <form action="#" className="f_subscribe_two mailchimp" method="post" noValidate>
                  <input type="text" name="EMAIL" className="form-control memail border rounded p-2" placeholder="Email" />
                  <button className="btn_get btn_get_two bg-[#5e2ced] text-white border border-[#5e2ced] rounded p-2 mt-5 hover:bg-transparent hover:text-[#5e2ced]" type="submit">Subscribe</button>
                  <p className="mchimp-errmessage hidden"></p>
                  <p className="mchimp-sucmessage hidden"></p>
                </form>
              </div>
              <div className="f_widget about-widget pl-4 wow fadeInLeft" data-wow-delay="0.4s">
                <h3 className="f-title font-semibold text-[#263b5e] text-[18px] mb-[30px]">Menu</h3>
                <ul className="list-unstyled f_list">
                  {['Mouse', 'Refrigrator', 'Earphones', 'Processors', 'Televisions'].map(item => (
                    <li key={item} className="mb-[11px]"><Link href="#" className="text-[#6a7695] hover:text-[#5e2ced]">{item}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="f_widget about-widget pl-4 wow fadeInLeft" data-wow-delay="0.6s">
                <h3 className="f-title font-semibold text-[#263b5e] text-[18px] mb-[30px]">Help</h3>
                <ul className="list-unstyled f_list">
                  {['FAQ', 'Terms & Conditions', 'Reporting', 'Documentation', 'Support Policy', 'Privacy'].map(item => (
                    <li key={item} className="mb-[15px]"><Link href="#" className="text-[#6a7695] hover:text-[#5e2ced]">{item}</Link></li>
                  ))}
                </ul>
              </div>
              <div className="f_widget social-widget pl-4 wow fadeInLeft" data-wow-delay="0.8s">
                <h3 className="f-title font-semibold text-[#263b5e] text-[18px] mb-[30px]">Team Solutions</h3>
                <div className="f_social_icon flex space-x-4">
                  <div
                    className="w-[46px] h-[46px] flex items-center justify-center rounded-full bg-[#ebeef5] text-[#858da8] border border-[#e2e2eb] hover:bg-[#5e2ced] hover:border-[#5e2ced] hover:text-white transition-all duration-200 cursor-pointer"><FaFacebookF /></div>
                  <div href="#" className="w-[46px] h-[46px] flex items-center justify-center rounded-full bg-[#ebeef5] text-[#858da8] border border-[#e2e2eb] hover:bg-[#5e2ced] hover:border-[#5e2ced] hover:text-white transition-all duration-200 cursor-pointer"><FaTwitter /></div>
                  <div href="#" className="w-[46px] h-[46px] flex items-center justify-center rounded-full bg-[#ebeef5] text-[#858da8] border border-[#e2e2eb] hover:bg-[#5e2ced] hover:border-[#5e2ced] hover:text-white transition-all duration-200 cursor-pointer"><FaLinkedinIn /></div>

                  <div href="#" className="w-[46px] h-[46px] flex items-center justify-center rounded-full bg-[#ebeef5] text-[#858da8] border border-[#e2e2eb] hover:bg-[#5e2ced] hover:border-[#5e2ced] hover:text-white transition-all duration-200 cursor-pointer"><FaPinterestP /></div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className=" z-[0] footer_bg absolute bottom-0 bg-center bg-no-repeat w-full h-[266px]" style={{ backgroundImage: 'url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigB8iI5tb8WSVBuVUGc9UjjB8O0708X7Fdic_4O1LT4CmLHoiwhanLXiRhe82yw0R7LgACQ2IhZaTY0hhmGi0gYp_Ynb49CVzfmXtYHUVKgXXpWvJ_oYT8cB4vzsnJLe3iCwuzj-w6PeYq_JaHmy_CoGoa6nw0FBo-2xLdOPvsLTh_fmYH2xhkaZ-OGQ/s16000/footer_bg.png")' }}></div> */}
          {/* <div className=" z-[0] footer_bg absolute bottom-0 bg-center bg-no-repeat w-full h-full bg-[rgba(0,0,0,0.1)]"  ></div> */}

        </div>
        <div className="footer_bottom bg-gray-200 p-5">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <div className="col-lg-6 col-sm-7">
                <p className="mb-0 text-[#7f88a6] text-[14px] font-light leading-[20px]">© javed Inc. 2019 All rights reserved.</p>
              </div>
              <div className="col-lg-6 col-sm-5 text-right">
                <p>Developed By <span className="text-red-500">❤️</span>   <a href="http://javed-shekh.netlify.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Javed Shekh</a></p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>




  );
};

export default Footer;

// <footer className="bg-gray-100">
//     <div className="new_footer_top">
//         <div className="container mx-auto px-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 <div className="f_widget company_widget wow fadeInLeft" data-wow-delay="0.2s">
//                     <h3 className="f-title font-semibold text-gray-800 text-lg">Get in Touch</h3>
//                     <p>Don’t miss any updates of our new templates and extensions!</p>
//                     <form action="#" className="f_subscribe_two mailchimp" method="post" noValidate>
//                         <input type="text" name="EMAIL" className="form-control memail border rounded p-2" placeholder="Email" />
//                         <button className="btn btn_get btn_get_two bg-blue-600 text-white rounded p-2 ml-2" type="submit">Subscribe</button>
//                         <p className="mchimp-errmessage hidden"></p>
//                         <p className="mchimp-sucmessage hidden"></p>
//                     </form>
//                 </div>
//                 <div className="f_widget about-widget pl-4 wow fadeInLeft" data-wow-delay="0.4s">
//                     <h3 className="f-title font-semibold text-gray-800 text-lg">Download</h3>
//                     <ul className="list-unstyled f_list">
//                         {['Company', 'Android App', 'iOS App', 'Desktop', 'Projects', 'My tasks'].map(item => (
//                             <li key={item}><Link href="#" className="text-blue-600 hover:underline">{item}</Link></li>
//                         ))}
//                     </ul>
//                 </div>
//                 <div className="f_widget about-widget pl-4 wow fadeInLeft" data-wow-delay="0.6s">
//                     <h3 className="f-title font-semibold text-gray-800 text-lg">Help</h3>
//                     <ul className="list-unstyled f_list">
//                         {['FAQ', 'Terms & Conditions', 'Reporting', 'Documentation', 'Support Policy', 'Privacy'].map(item => (
//                             <li key={item}><Link href="#" className="text-blue-600 hover:underline">{item}</Link></li>
//                         ))}
//                     </ul>
//                 </div>
//                 <div className="f_widget social-widget pl-4 wow fadeInLeft" data-wow-delay="0.8s">
//                     <h3 className="f-title font-semibold text-gray-800 text-lg">Team Solutions</h3>
//                     <div className="f_social_icon flex space-x-4">
//                         <Link href="#" className="text-gray-600 hover:text-blue-600"><FaFacebookF /></Link>
//                         <Link href="#" className="text-gray-600 hover:text-blue-600"><FaTwitter /></Link>
//                         <Link href="#" className="text-gray-600 hover:text-blue-600"><FaLinkedinIn /></Link>
//                         <Link href="#" className="text-gray-600 hover:text-blue-600"><FaPinterestP /></Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div className="footer_bg">
//             <div className="footer_bg_one"></div>
//             <div className="footer_bg_two"></div>
//         </div>
//     </div>
//     <div className="footer_bottom bg-gray-200 py-4">
//         <div className="container mx-auto px-4">
//             <div className="flex justify-between items-center">
//                 <div className="col-lg-6 col-sm-7">
//                     <p className="mb-0 text-gray-600">© cakecounter Inc. 2019 All rights reserved.</p>
//                 </div>
//                 <div className="col-lg-6 col-sm-5 text-right">
//                     <p>Made with <span className="text-red-500">❤️</span> in <a href="http://cakecounter.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CakeCounter</a></p>
//                 </div>
//             </div>
//         </div>
//     </div>
// </footer>