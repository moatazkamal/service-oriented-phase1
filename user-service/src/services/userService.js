const User = require("../models/User");

const getMe = async (userId) => {
  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const getWelcomeMessage = async (userId) => {
  const user = await User.findById(userId).select("name");

  if (!user) {
    throw new Error("User not found");
  }

  return `Welcome ${user.name}`;
};

module.exports = {
  getMe,
  getWelcomeMessage,
};