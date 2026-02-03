const nodemailer = require("nodemailer");

const sendOtpMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "designncode07@gmail.com",
      pass: "hiud rghy owff xfpg" // Gmail App Password
    }
  });

  await transporter.sendMail({
    from: "DesignNCode",
    to: email,
    subject: "Your OTP Verification Code",
    text: `Your OTP is ${otp}. Valid for 5 minutes.`
  });
};

module.exports = sendOtpMail;
