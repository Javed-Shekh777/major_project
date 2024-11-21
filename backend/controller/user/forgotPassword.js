//       user route for forgot password
const UserModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const generateOTP = require("../../helpers/generateOTP");
let otps = {};

const RequestOtp = async (req, res, next) =>{
  const { email  } = req.body;

  try {
    if (!email ) {
      return res.status(404).json({
        message: "Please Enter Email",
        success: false,
        error:true
      });
    }

    const userExist = await UserModel.findOne({email});

    if (!userExist) {
      return res.status(404).json({
        message:"User does not Exist!!",
        success: false,
        error:true
      });
    }

    const otp = generateOTP();
    otps[email] = otp;

    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_KEY,
      },
    });

    const mailOptions = {
      from: "test@gmail.com",
      to: userExist.email,
      subject: "Email Verification",
      html: `
    
      <div
      style="background : #fff;border: 1px solid #ccc;padding : 10px;border-radius : 10px;box-shadow : 3px 4px 5px 5px black;line-height : 15px">


      <h3 style="display : inline-block;">Hey ${userExist.name},</h3> <br />
      Thank You for joining Ecommerce Website!
      <br /><br />
      Welcome to you. Before you begin your journey, we need to verify your account.
      Follow these steps to complete the verification process:
      <br />

      <center>
          <h2
              style="color : white;background:#000;border:2px solid lightblue;align-self:center;width:150px;border-radius:8px;box-shadow:2px 2px 4px #000;justify-content:center;padding:3px; ">
              <div style="display: flex;align-items:center;height:25px;">
                  <span style="border-right:1px solid red;padding:6px;">${otp[0]}</span>
                  <span style="border-right:1px solid red;padding:6px;">${otp[1]}</span>
                  <span style="border-right:1px solid red;padding:6px;">${otp[2]}</span>
                  <span style="border-right:1px solid red;padding:6px;">${otp[3]}</span>
                  <span style="border-right:1px solid red;padding:6px;">${otp[4]}</span>
                  <span style=" padding:6px;">${otp[5]}</span>
              </div>
          </h2>
      </center>

      If you have any questions, simply reply to this email.
      I'm here to help.
      <br />
      <h4 style="display : inline-block;">Best Regards,</h4>
      <h2 style="color:green;font-size:15;margin-top:-8px;">JAVED SHEKH</h2>

  </div>
    `,
    };

    userExist.verified = true;
    await userExist.save({validateBeforeSave:false});
  
 



     
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(402).json({
            message:"OTP not send",
            success: false,
            error:true
          });
        }
  
        return res.status(200).json({
          success: true,
          error:false,
          message: "OTP Send Successfully!!",
        });
      });

    
    



  } catch (error) {
   
   return res.status(500).json({
          message:error.message,
          success: false,
          error:true
        });
  }
};

const VerifyOtp = async (req, res) => {
  const { otp, email  } = req.body;
  try {
    if (!otp || !email ) {
      return res.status(404).json({
        success: false,
        error:true,
        message: "Please enter email and OTP send to email",
      });
    }

    if (otps[email] && otps[email] === otp) {
      delete otps[email];

      return res.status(200).json({
        success: true,
        error:false,
        message: "OTP Verified Successfully!!",
      });
    } else {
      return res.status(200).json({
        success: true,
        error:true,
        message: "Invalid OTP",
      });
    }
  } catch (error) {
    
    return res.status(500).json({
      message: error.message,
      status: false,
      error:true
    });
  }
}

const newPsw = async (req, res) => {
  const {   email, password } = req.body;

  if (!password || !email ) {
    return res.status(404).json({
      success: false,
      error:true,
      message: "Please Enter Email and Password!!",
    });
  }
  try {
    const userExist = await UserModel.findOne({email});

    if (userExist && userExist.verified != true) {
      return res.status(402).json({
        status: false,
        error:true,
        message: "Please first verify Email by OTP!!",
      });
    }


    const salt = bcrypt.genSaltSync(10);
    
    const hashPassword = await bcrypt.hashSync(password, salt);

    if(!hashPassword){
        throw new Error("Something is wrong")
    }

    userExist.password = hashPassword;
    userExist.verified = false;
    userExist.save();

    res.status(200).json({
      success: true,
      error:false,
      message: "Password Updated Successfully!!",
    });
  } catch (error) {
    
    return res.status(500).json({
      message: error.message,
      success: false,
      error:true,
    });
  }
}


module.exports = { RequestOtp, VerifyOtp, newPsw };
