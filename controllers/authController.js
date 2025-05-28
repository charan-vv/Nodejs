
const { login ,signup,OtpSend,userUpdate,verifyOtp,userSoftDelete,userHardDelete } = require("../services/auth");


// login
const login_request = async (req, res) => {
  try {
    const data = req.body;
    const result = await login(data);
     res.status(result?.status).json({code: result?.status,data:result?.user,token:result?.token,message: result?.message,});
  } catch (err) {
    res.status(500).json({ code: 500, error: err?.message ,message: "Internal Server Error"});
  }
};

// signUp
const signup_request = async (req, res) => {
  try {
    const data =  req.body;
    const result= await signup(data)
    res.status(result.status).json({code:result.status,data:result.data,message:result?.message})
  } catch (err) {
    res.status(500).json({code :500,error:err?.message,message:"Internal Server Error"})
  }
};

// forget password 
const Otp_request = async (req, res) => {
  try {
    const { email_id } = req.body;
    const result = await OtpSend(email_id);
    res.status(result.status).json({code: result.status,message: result.message,...(result?.error && { error: result.error })});
  }catch(err){
    res.status(500).json({code:500,message:"Internal Server Error",error:err?.message})
  }
}

// verify opt

const verifyotp_request = async (req, res) => {
  try {
    const { email_id, otp } = req.body;
    const result = await verifyOtp(email_id, otp);
    res.status(result.status).json({code: result.status,message: result.message,...(result?.error && { error: result.error }),
    });
  } catch (err) {
    res.status(500).json({ code: 500, message: "Internal Server Error", error: err.message });
  }
};

// update auth details

const updateDetails_request =async (req,res)=>{
  try{
    const user_uid=req.params.id
    const data=req.body
    const result=await userUpdate(user_uid,data)
    res.status(result?.status).json({code:result?.status,message:result?.message,data:result?.data})
  }catch(err){
    res.status(500).json({code:500,message:"Internal Server Error",error:err?.message})
  }
}

const softDelete_request =async(req,res)=>{
  try{
    const user_uid=req.params.id
    const result=await userSoftDelete(user_uid)
    res.status(result?.status).json({code:result?.status,message:result?.message,})
  }catch(err){
    res.status(500).json({code:500,message:"Internal Server Error",error:err?.message})
  }
}

const hardDelete_request =async(req,res)=>{
  try{
    const user_uid=req.params.id
    const result=await userHardDelete(user_uid)
    res.status(result?.status).json({code:result?.status,message:result?.message,data:result?.data})
  }catch(err){
    res.status(500).json({code:500,message:"Internal Server Error",error:err?.message})
  }
}

module.exports = { login_request, signup_request,Otp_request,verifyotp_request,updateDetails_request,softDelete_request,hardDelete_request };
