import { useState, useEffect } from "react";
import axios from "axios";
import "./TrainingView.css";

const TrainingView = ({ userData, onTrainingDone }) => {
  const [trainingData, setTrainingData] = useState({});
  const [resultOrRating, setResultOrRating] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});
  const backendURL = "/api";

  useEffect(() => {
    axios
      .get(`${backendURL}/default_exercises/${userData.userId}`)
      .then((response) => setTrainingData(response.data))
      .catch(() => setTrainingData(null));
  }, [userData.userId]);

  const categoryNames = {
    1: "Pace",
    2: "Shooting",
    3: "Passing",
    4: "Dribbling",
    5: "Defending",
    6: "Physical",
  };

  const handleMarkAsDone = async (category, exercise) => {
    const hours = Number(resultOrRating[exercise.exercise]?.hours) || 0;
    const minutes = Number(resultOrRating[exercise.exercise]?.minutes) || 0;

    const updatedExercise = {
      exercise: exercise.exercise,
      rating: resultOrRating[exercise.exercise]?.rating || "",
      extraInfo: resultOrRating[exercise.exercise]?.extraInfo || "",
      duration: hours * 60 + minutes,
      playerId: userData.userId,
    };

    console.log("Exercise done:", updatedExercise);

    try {
      const response = await axios.put(`${backendURL}/training/${userData.userId}`, updatedExercise, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
        }
      });
      console.log("Exercise added/updated:", response.data.message);
    } catch (error) {
      console.error("Error during save operation:", error.response ? error.response.data : error.message);
    }

    onTrainingDone(updatedExercise);

    setResultOrRating((prevState) => ({
      ...prevState,
      [exercise.exercise]: {
        hours: "",
        minutes: "",
        rating: "",
        extraInfo: "",
      },
    }));
  };

  const handleInputChange = (exercise, type, value) => {
    setResultOrRating((prev) => ({
      ...prev,
      [exercise]: {
        ...prev[exercise],
        [type]: value,
      },
    }));
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="training-view">
      <h2 className="header-execise">Training Overview</h2>
      {Object.keys(trainingData).map((category) => (
        <div key={category} className="category-card">
          <button
            className="category-header"
            onClick={() => toggleCategory(category)}
          >
            {categoryNames[category] || `Category ${category}`}
          </button>
          {expandedCategories[category] && (
            <div className="exercise-grid">
              {trainingData[category].map((exercise, index) => (
                <div key={index}>
                  <form
                    className="exercise-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleMarkAsDone(category, exercise);
                    }}
                  >
                    <strong className="exercise-title">
                      {exercise.exercise}
                    </strong>
                    <div className="input-group">
                      <div className="time-input-group">
                        <label className="time-label">Time</label>
                        <input
                          type="number"
                          min="0"
                          placeholder="Hours"
                          value={resultOrRating[exercise.exercise]?.hours || ""}
                          onChange={(e) =>
                            handleInputChange(
                              exercise.exercise,
                              "hours",
                              e.target.value
                            )
                          }
                        />
                        <input
                          type="number"
                          min="0"
                          max="59"
                          placeholder="Minutes"
                          value={
                            resultOrRating[exercise.exercise]?.minutes || ""
                          }
                          onChange={(e) =>
                            handleInputChange(
                              exercise.exercise,
                              "minutes",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <select
                        value={resultOrRating[exercise.exercise]?.rating || ""}
                        onChange={(e) =>
                          handleInputChange(
                            exercise.exercise,
                            "rating",
                            e.target.value
                          )
                        }
                      >
                        <option value="" disabled>
                          Give rating...
                        </option>
                        <option value="1">Just started</option>
                        <option value="2">Can do some</option>
                        <option value="3">Can do it</option>
                        <option value="4">Im good at it</option>
                        <option value="5">Im excellent at it</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Give extra info..."
                        value={
                          resultOrRating[exercise.exercise]?.extraInfo || ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            exercise.exercise,
                            "extraInfo",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <button className="add-button" type="submit">
                      Mark as Done
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TrainingView;
