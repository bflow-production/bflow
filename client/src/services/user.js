import axios from 'axios'

const baseUrl = "/api/user"

const getUserByRole = async (userId, role) => {
  const response = await axios.get(`${baseUrl}/${userId}?role=${role}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    }
  });
  return response.data;
}

const updateUser = async (id, profileData) => {
  const response = await axios.put(`${baseUrl}/${id}`, profileData, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
    }
  })

  return response.data
}

export default { getUserByRole, updateUser }
