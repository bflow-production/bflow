import axios from "axios";

const baseUrl = "/api";

const getTraining = async (id) => {
  const response = await axios.get(`${baseUrl}/training/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
  return response.data;
};

const updateTraining = async (id, updatedExercise) => {
  const response = await axios.put(`${baseUrl}/training/${id}`, updatedExercise, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
  return response.data
};

const getDefaultExercises = async (id) => {
    const response = await axios.get(`${baseUrl}/default_exercises/${id}`);
    return response.data;
  }

const getLatestExercises = async (id) => {
  const response = await axios.get(`${baseUrl}/latestexercises/${id}`);
  return response.data;
}


export default { getTraining, updateTraining, getDefaultExercises, getLatestExercises }
