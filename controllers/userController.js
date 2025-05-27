const users = require("../models/user");
const { user_not_found } = require("../services/auth");

// login
const login = async (req, res) => {
  try {
    const { email_id, password,role } = req.body;
    const result = await user_not_found(email_id, password,role);
     res.status(result?.status).json({
        code: result?.status,
        data: result?.user,
        message: result?.message,
      });
  } catch (err) {
    console.error("error message login:", err?.message);
    res.status(500).json({ code: 500, error: "Internal server error" ,message: err?.message});
  }
};

// signUp
const signup = async (req, res) => {
  try {
    const data = req.body;
   
  } catch (err) {
    console.error("error message:", err?.message);
  }
};

module.exports = { signup, login };
