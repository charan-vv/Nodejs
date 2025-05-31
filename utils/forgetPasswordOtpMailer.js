const crypto = require("crypto");
const nodemailer = require("nodemailer");


function generateOTP() {
  return crypto.randomInt(100000, 999999).toString(); // Secure 6-digit OTP
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpMail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP for Password Reset",
    text: `Your OTP is ${otp}. It expires in 120 seconds.`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { generateOTP, sendOtpMail };
