import axios from "axios";

const AUTH_BASE_URL = "http://localhost:5001/api/auth";
const USER_BASE_URL = "http://localhost:5002/api/users";
const ADMIN_BASE_URL = "http://localhost:5003/api/admin";

export const loginUser = async (formData) => {
  const response = await axios.post(`${AUTH_BASE_URL}/login`, formData);
  return response.data;
};

export const registerUser = async (formData) => {
  const response = await axios.post(`${AUTH_BASE_URL}/register`, formData);
  return response.data;
};

export const getMyProfile = async (token) => {
  const response = await axios.get(`${USER_BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getWelcomeMessage = async (token) => {
  const response = await axios.get(`${USER_BASE_URL}/welcome`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllUsers = async (token) => {
  const response = await axios.get(`${ADMIN_BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createAdminUser = async (token, userData) => {
  const response = await axios.post(`${ADMIN_BASE_URL}/users`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateAdminUser = async (token, userId, userData) => {
  const response = await axios.put(`${ADMIN_BASE_URL}/users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteAdminUser = async (token, userId) => {
  const response = await axios.delete(`${ADMIN_BASE_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};