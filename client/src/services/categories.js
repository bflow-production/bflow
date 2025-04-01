import axios from "axios";

const baseUrl = "/api/categories";

const getCategories = async () => {
  const response = await axios.get(`${baseUrl}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });

  return response.data;
};

export default { getCategories };