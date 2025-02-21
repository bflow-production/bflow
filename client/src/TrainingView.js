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
      .get(`${backendURL}/training/${userData.userId}`)
      .then((response) => setTrainingData(response.data))
      .catch(() => setTrainingData(null));
  }, [userData.userId]);

  if (Object.keys(trainingData).length === 0) {
    return <div>No data available...</div>;
  }

  // const addExercise = async (exercise, result, rating) => {
  //   try {
  //     const response = await axios.put(`${backendURL}/api/training/${userData.userId}`, {
  //       exercise,
  //       result,
  //       rating,
  //       playerId: userData.userId
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
  //       }
  //     });
  //     console.log("Exercise added/updated:", response.data.message);
  //   } catch (error) {
  //     console.error("Error during save operation:", error.response ? error.response.data : error.message);
  //   }
  // };

  const handleMarkAsDone = (category, exercise) => {
    const updatedExercise = {
      ...exercise,
      result: resultOrRating[exercise.exercise]?.result || "",
      rating: resultOrRating[exercise.exercise]?.rating || "",
      category
    };

    console.log("Exercise done:", updatedExercise);
    onTrainingDone(updatedExercise); // Lähetetään päivitetty harjoitus
    
    setTrainingData((prevData) => {
      const updatedCategory = prevData[category].filter(
        (ex) => ex.exercise !== exercise.exercise
      );
      return {
        ...prevData,
        [category]: updatedCategory,
      };
    });

    setResultOrRating((prevState) => ({
      ...prevState,
      [exercise.exercise]: {
        result: "",
        rating: "",
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
            {category}
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
                      <input
                        type="text"
                        placeholder={"Give result..."}
                        value={resultOrRating[exercise.exercise]?.result || ""}
                        onChange={(e) =>
                          handleInputChange(
                            exercise.exercise,
                            "result",
                            e.target.value
                          )
                        }
                      />
                      <input
                        type="number"
                        placeholder={"Give rating..."}
                        value={resultOrRating[exercise.exercise]?.rating || ""}
                        onChange={(e) =>
                          handleInputChange(
                            exercise.exercise,
                            "rating",
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
