
const { token_verification_return } = require('../helpers/response');
const jwt = require("jsonwebtoken");


const extractToken = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7); // Remove 'Bearer ' prefix
  }
  return null;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure to set JWT_SECRET in your env
    return { success: true, decoded };
  } catch (err) {
    return { success: false, error: err.message };
  }
};


const user_detail =(token)=>{
    const tokenVerification = verifyToken(token); 
        if (!tokenVerification.success) {
            token_verification_return()
        }
  
        const decoded = tokenVerification.decoded;
        return  decoded
}





module.exports = {
  user_detail,
  extractToken,
  verifyToken,
};
