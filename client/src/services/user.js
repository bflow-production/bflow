import axios from "axios";

const baseUrl = "/api/user";

const getUserByRole = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
  return response.data;
};

const updateUser = async (id, profileData) => {
  const response = await axios.put(`${baseUrl}/${id}`, profileData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export default { getUserByRole, updateUser };
