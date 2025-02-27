import axios from 'axios'
const baseUrl = 'api/team'

const getTeam = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  })
  return response.data
}

export default { getTeam }