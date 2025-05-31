const jwt = require("jsonwebtoken");
const users = require("../models/auth");
const {
  generateOTP,
  sendOtpMail,
} = require("../utils/forgetPasswordOtpMailer");

const otpStore = new Map();
// login
const login = async (data) => {
  try {
    if (!data?.email_id || !data?.password) {
      return {
        success: false,
        status: 400,
        message: "email id and password are required",
      };
    }
    const user = await users.findOne({ email_id: data?.email_id });
    if (!user) {
      return { success: false, status: 400, message: "User not found" };
    }
    const isMatch = await user.comparePassword(data?.password);
    if (!isMatch) {
      return { success: false, status: 400, message: "Invalid password" };
    }
    const token = jwt.sign(
      { uid: user.uid, email: user.email_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    const user_data = {
      uid: user.uid,
      user_name: user.user_name,
      role: user.role,
    };

    return {
      success: true,
      status: 200,
      message: "Login successful",
      data: user_data,
      token,
    };
  } catch (err) {
    return err;
  }
};

// sign up
const signup = async (data) => {
  try {
    const user = await users.findOne({ email_id: data?.email_id });
    if (user) {
      return {
        success: false,
        status: 400,
        message: "User already existing with these Email Id",
      };
    }
    const phoneUser = await users.findOne({
      "phone.phone_number": data?.phone?.phone_number,
    });
    if (phoneUser) {
      return {
        success: false,
        status: 400,
        message: "User already existing with these Phone no",
      };
    }

    const new_user = await users.create(data);
    return {
      success: true,
      status: 200,
      message: "User Created Successfully",
      data: new_user,
    };
  } catch (err) {
    return err;
  }
};

// forget otp
const OtpSend = async (email) => {
  try {
    if (!email) {
      return { success: false, status: 400, message: "Email is required" };
    }

    const user = await users.findOne({ email_id: email });
    if (!user) {
      return {
        success: false,
        status: 400,
        message: "User not found with this email",
      };
    }
    const data = { otp_verified: false };
    await users.updateOne(data);

    const otp = generateOTP();
    const expiry = Date.now() + 120 * 1000;

    otpStore.set(email, { otp, expiry });

    await sendOtpMail(email, otp);
    return {
      success: true,
      status: 200,
      message: "OTP sent to email",
    };
  } catch (err) {
    return { status: 500, message: "Something went wrong", error: err.message };
  }
};

// verified otp
const verifyOtp = async (email, otp) => {
  try {
    const data = otpStore.get(email);
    if (!data) {
      return {
        success: false,
        status: 400,
        message: "No OTP found for this email",
      };
    }
    if (Date.now() > data.expiry) {
      otpStore.delete(email);
      return { success: false, status: 400, message: "OTP has expired" };
    }
    if (data.otp !== otp) {
      return { success: false, status: 400, message: "Invalid OTP" };
    }
    otpStore.delete(email);
    const user = await users.findOne({ email_id: email });
    if (user) {
      const data = { otp_verified: true };
      await users.updateOne(data);
      return {
        success: true,
        status: 200,
        message: "OTP verified successfully",
      };
    }
  } catch (err) {
    return { status: 500, message: "Something went wrong", error: err.message };
  }
};

// user Update
const userUpdate = async (uid, data) => {
  const user = await users.findOne({ uid: uid });
  if (user) {
    await user.updateOne(data);
    return { success: true, status: 200, message: "User Details Update Successfully" };
  } else {
    return {
      false: true,
      status: 400,
      message: "User With the give id not found",
    };
  }
};

// user soft delete
const userSoftDelete = async (uid) => {
  const user = await users.findOne({ uid: uid });
  if (user) {
    const data = {
      is_deleted: true,
    };
    await user.updateOne(data);
    return { success: true, status: 200, message: "User Deleted Successfully" };
  } else {
    return {
      success: false,
      status: 400,
      message: "User With the give id not found",
    };
  }
};

// user Hard Delte
const userHardDelete = async (uid) => {
  const user = await users.findOne({ uid: uid });
  if (user) {
    await user.deleteOne(user);
    return { success: true, status: 200, message: "User Deleted Successfully" };
  } else {
    return {
      success: false,
      status: 400,
      message: "User With the give id not found",
    };
  }
};

module.exports = {
  login,
  signup,
  OtpSend,
  userUpdate,
  verifyOtp,
  userSoftDelete,
  userHardDelete,
};
