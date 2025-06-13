const {
  login,
  signup,
  OtpSend,
  userUpdate,
  verifyOtp,
  userSoftDelete,
  userHardDelete,
} = require("../services/auth");
const {internal_Server_Response,response} =require("../helpers/response")

// login
const login_request = async (req, res) => {
  try {
    const data = req.body;
    const result = await login(data);
    response(res,result)
  } catch (err) {
    internal_Server_Response(res,err)
  }
};

// signUp
const signup_request = async (req, res) => {
  try {
    const data = req.body;
    const result = await signup(data);
    response(res,result)
  } catch (err) {
    internal_Server_Response(res,err)
  }
};

// forget password
const Otp_request = async (req, res) => {
  try {
    const { email_id } = req.body;
    const result = await OtpSend(email_id);
    response(res,result)
  } catch (err) {
     internal_Server_Response(res,err)
  }
};

// verify opt

const verifyotp_request = async (req, res) => {
  try {
    const { email_id, otp } = req.body;
    const result = await verifyOtp(email_id, otp);
    response(res,result)
  } catch (err) {
     internal_Server_Response(res,err)
  }
};

// update auth details

const updateDetails_request = async (req, res) => {
  try {
    const user_uid = req.params.id;
    const data = req.body;
    const result = await userUpdate(user_uid, data);
     response(res,result)
  } catch (err) {
    internal_Server_Response(res,err)
  }
};

const softDelete_request = async (req, res) => {
  try {
    const user_uid = req.params.id;
    const result = await userSoftDelete(user_uid);
     response(res,result)
  } catch (err) {
    internal_Server_Response(res,err)
  }
};

const hardDelete_request = async (req, res) => {
  try {
    const user_uid = req.params.id;
    const result = await userHardDelete(user_uid);
    response(res,result)
  } catch (err) {
     internal_Server_Response(res,err)
  }
};

module.exports = {
  login_request,
  signup_request,
  Otp_request,
  verifyotp_request,
  updateDetails_request,
  softDelete_request,
  hardDelete_request,
};
