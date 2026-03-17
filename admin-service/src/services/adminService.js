const bcrypt = require("bcryptjs");
const User = require("../models/User");

const getAllUsers = async () => {
  return await User.find().select("-password");
};

const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const createUserByAdmin = async (name, email, password, role = "user") => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    createdAt: newUser.createdAt,
    updatedAt: newUser.updatedAt,
  };
};

const updateUserByAdmin = async (id, updateData) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  if (updateData.email && updateData.email !== user.email) {
    const existingUser = await User.findOne({ email: updateData.email });
    if (existingUser) {
      throw new Error("Another user already exists with this email");
    }
  }

  if (updateData.name !== undefined) user.name = updateData.name;
  if (updateData.email !== undefined) user.email = updateData.email;
  if (updateData.role !== undefined) user.role = updateData.role;

  if (updateData.password !== undefined && updateData.password !== "") {
    user.password = await bcrypt.hash(updateData.password, 10);
  }

  await user.save();

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const deleteUserByAdmin = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  await User.findByIdAndDelete(id);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
};

module.exports = {
  getAllUsers,
  getUserById,
  createUserByAdmin,
  updateUserByAdmin,
  deleteUserByAdmin,
};