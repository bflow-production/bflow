import axios from "axios";

const baseUrl = "/api";

const getTraining = async (id, role) => {
  const response = await axios.get(`${baseUrl}/training/${id}?role=${role}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
  return response.data;
};

const updateTraining = async (id, role, updatedExercise) => {
  const response = await axios.put(`${baseUrl}/training/${id}?role=${role}`, updatedExercise, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
  return response.data
};

const getDefaultExercises = async () => {
    const response = await axios.get(`${baseUrl}/default_exercises`);
    return response.data;
  }

const getLatestExercises = async (id, role) => {
  const response = await axios.get(`${baseUrl}/latestexercises/${id}?role=${role}`);
  return response.data;
}


export default { getTraining, updateTraining, getDefaultExercises, getLatestExercises }
