import { useState, useEffect } from "react";
import trainingService from "./services/trainings";
import "./TrainingView.css";

const TrainingView = ({ userData, showNotification }) => {
  const [trainingData, setTrainingData] = useState({});
  const [resultOrRating, setResultOrRating] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    trainingService
      .getDefaultExercises()
      .then((response) => {
        setTrainingData(response);
        console.log(response);
      })
      .catch(() => setTrainingData(null));
  }, [userData.userId]);

  const handleMarkAsDone = async (exercise) => {
    const hours = Number(resultOrRating[exercise.exercise]?.hours) || 0;
    const minutes = Number(resultOrRating[exercise.exercise]?.minutes) || 0;

    const updatedExercise = {
      exercise: exercise.exercise,
      result: resultOrRating[exercise.exercise]?.result || "",
      rating: resultOrRating[exercise.exercise]?.rating || "",
      extraInfo: resultOrRating[exercise.exercise]?.extraInfo || "",
      duration: hours * 60 + minutes,
      playerId: userData.userId,
    };

    console.log("Exercise done:", updatedExercise);

    try {
      const response = await trainingService.updateTraining(
        userData.userId,
        userData.role,
        updatedExercise
      );
      console.log("Exercise added/updated:", response.message);
      showNotification("Harjoitus merkitty tehdyksi", false);
    } catch (error) {
      console.error(
        "Error during save operation:",
        error.response ? error.response.data : error.message
      );
      showNotification("Virhe tallennettaessa", true);
    }

    setResultOrRating((prevState) => ({
      ...prevState,
      [exercise.exercise]: {
        hours: "",
        minutes: "",
        rating: "",
        result: "",
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
      <h2 className="header-execise" >Harjoitukset</h2>
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
                      handleMarkAsDone(exercise);
                    }}
                  >
                    <strong className="exercise-title">
                      {exercise.exercise}
                    </strong>
                    <p className="exercise-description">
                      {exercise.description}
                    </p>
                    <div className="input-group">
                      <div className="time-input-group">
                        <p className="time-label">Kestoaika</p>
                        <input
                          type="number"
                          min="0"
                          placeholder="Tunnit"
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
                          placeholder="Minuutit"
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
                          Anna itsearvio...
                        </option>
                        <option value="1">Aloitin vasta</option>
                        <option value="2">Osaan jo hieman</option>
                        <option value="3">Osaan</option>
                        <option value="4">Osaan jo hyvin</option>
                        <option value="5">Mestari</option>
                      </select>
                      {exercise.is_numeric_rating !== 0 && (
                        <input
                          type="number"
                          min="0"
                          placeholder="Anna tulos..."
                          value={
                            resultOrRating[exercise.exercise]?.result || ""
                          }
                          onChange={(e) =>
                            handleInputChange(
                              exercise.exercise,
                              "result",
                              e.target.value
                            )
                          }
                        />
                      )}
                      <input
                        type="text"
                        placeholder="Anna lisätietoa..."
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
                    <div className="add-button-holder">
                      <button className="add-button" type="submit">
                        Merkitse tehdyksi
                      </button>
                    </div>
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
