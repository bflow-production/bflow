import { useState, useEffect } from "react";
import "./TrainingView.css";
import trainingService from "./services/trainings";

const CompletedTrainingsView = ({ userData }) => {
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});

  const ratingToVerbal = {
    "1": "Aloitin vasta",
    "2": "Osaan jo hieman",
    "3": "Osaan",
    "4": "Osaan jo hyvin",
    "5": "Mestari"
  };
  
  useEffect(() => {
    trainingService
      .getTraining(userData.userId)
      .then((response) => {
        setCategories(response);
        console.log("response", response);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, [userData.userId]);

  if (Object.keys(categories).length === 0) {
    return <div>No data available...</div>;
  }

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="training-view">
      <h2 className="header-execise">Harjoitukset</h2>
      {Object.keys(categories).map((category) => (
        <div key={category} className="category-card">
          <button
            className="category-header"
            onClick={() => toggleCategory(category)}
          >
            {category}
          </button>
          {expandedCategories[category] && (
            <div className="exercise-grid">
              {categories[category].map((exercise, index) => (
                <div key={index} className= "exercise-form">
                  <strong className="exercise-title">
                    {exercise.exercise} |{" "}
                    {new Date(exercise.timestamp).toLocaleString("fi-FI", {
                      weekday: "short",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </strong>
                  <div className="exercise-inputs">
                    <div className="exercise-description">
                      <p>{exercise.description}</p>
                      <p>
                        {" "}
                        Kesto: {Math.floor(exercise.duration / 60)} h{" "}
                        {exercise.duration % 60} min
                      </p>
                      <p>{`Lisätiedot: ${exercise.result || "-"}`}</p>
                      <p>{`Oma arvio: ${ratingToVerbal[exercise.rating] || "0"}`}</p>
                      {exercise.result !== null && (
                        <p>{`Tulos: ${exercise.result || "0"}`}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CompletedTrainingsView;
