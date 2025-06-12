const extractToken = (req) => {
  
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7); // Remove 'Bearer ' prefix
  }
  

  
  return null;
};


module.exports ={
    extractToken
}

