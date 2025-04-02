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
  const response = await axios.put(
    `${baseUrl}/training/${id}`,
    updatedExercise,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const getDefaultExercises = async () => {
  const response = await axios.get(`${baseUrl}/default_exercises`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
  return response.data;
};

const createNewExercise = async (exercise) => {
  const response = await axios.post(`${baseUrl}/default_exercises`, exercise, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const getLatestExercises = async (id) => {
  const response = await axios.get(`${baseUrl}/latestexercises/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
    },
  });
  return response.data;
};

export default {
  getTraining,
  updateTraining,
  getDefaultExercises,
  createNewExercise,
  getLatestExercises,
};
