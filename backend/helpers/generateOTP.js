const generateOTP = () => {
    let otp = "";
    const character = "0123456789";
  
    for (let i = 0; i < 6; i++) {
      otp += character.charAt(Math.floor(Math.random() * character.length));
    }
  
    return otp;
  };
  
  module.exports = generateOTP;
  