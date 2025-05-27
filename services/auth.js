const users = require("../models/user");

// login

const user_not_found = async (email_id, password) => {
  try {
    const user = await users.findOne({ email_id: email_id });
    if (email_id && password) {
      if (!user) {
        return { status: 400, message: "User not found" };
      } else if (user.password !== password) {
        return { status: 400, message: "Invalid password" };
      }
      return { status: 200, message: "Login successful", user };
    } else {
      return { status: 400, message: "email id and password are required" };
    }
  } catch (err) {
    return err;
  }
};

// sign up
const existing_credientials = async ({ user_name, email_id }) => {
  try {
    const user = await users.findOne(user_name);
  } catch (err) {
    return err;
  }
};

module.exports = {
  existing_credientials,
  user_not_found,
};
