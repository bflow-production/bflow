import axios from "axios";

const baseUrl = "/api/link-child";

const createLink = async (linkData) => {
  const response = await axios.post(baseUrl, linkData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json"
    },
  });
  return response.data;
}

export default { createLink }