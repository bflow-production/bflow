import axios from "axios";

const baseUrl = "/api";

const register = async (userData) => {
  const response = await axios.post(`${baseUrl}/register`, userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

export default { register, login };