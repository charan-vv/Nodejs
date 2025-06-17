// 

const internal_Server_Response = (res, err) => {
  res.status(500).json({
    success: false,
    code: 500,
    message: "Internal server error",
    error: err?.message,
  });
};




const response = (res, result) => {
  res.status(result?.status).json({
    success: result?.success,
    code: result?.status,
    message: result?.message,
    ...(result?.data && { data: result?.data }),
    ...(result?.total && { total: result?.total }),
    ...(result?.token && { token: result?.token }),
  });
};




const no_token_response =(res)=>{
  res.status(401).json({
        success: false,
        code: 401,
        message: "Invalid or expired tokend"
      });
}




const token_verification_return = () => {
  return {
    success: false,
    status: 401,
    message: "Invalid or expired token",
  };
};




module.exports = {
  internal_Server_Response,
  response,
  token_verification_return,
  no_token_response
};
