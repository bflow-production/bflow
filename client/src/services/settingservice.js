import axios from "axios";

const baseUrl = "/api";

const updateSettings = async (settings) => {
  const response = await axios.post(`${baseUrl}/settings`, settings, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const changePassword = async (currentPassword, newPassword) => {
  const response = await axios.post(
    `${baseUrl}/change-password`,
    {
      currentPassword,
      newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export default { updateSettings, changePassword };
