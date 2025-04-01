import axios from 'axios'

const baseUrl = "/api"

const getTeam = async (id) => {
  const response = await axios.get(`${baseUrl}/team/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  })
  return response.data
}

const createTeam = async (teamData) => {
  const response = await axios.post(`${baseUrl}/team`, teamData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  })
  return response.data
}

const joinTeam = async (teamData) => {
  const response = await axios.post(`${baseUrl}/join-team`, teamData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
  return response.data;
}

export default { getTeam, createTeam, joinTeam }