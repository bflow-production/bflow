import { useState, useEffect } from "react";
import axios from "axios";
import "./TrainingView.css";

const CompletedTrainingsView = ({ userData, completedTrainings }) => {
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const backendURL = "http://127.0.0.1:5000";

  const categoryNames = {
    1: "Pace",
    2: "Shooting",
    3: "Passing",
    4: "Dribbling",
    5: "Defending",
    6: "Physical",
  };

  useEffect(() => {
    axios
      .get(`${backendURL}/api/training/${userData.userId}`)
      .then((response) => {
        setCategories(response.data);
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
      <h2 className="header-execise">Training Overview</h2>
      {Object.keys(categories).map((category) => (
        <div key={category} className="category-card">
          <button
            className="category-header"
            onClick={() => toggleCategory(category)}
          >
            {categoryNames[category] || category}
          </button>
          {expandedCategories[category] && (
            <div className="exercise-grid">
              {categories[category].map((exercise, index) => (
                <div key={index} className="exercise-card">
                  <strong className="exercise-title">
                    {exercise.exercise}
                  </strong>
                  <div className="exercise-inputs">
                    <div className="input-group">
                      <p>{`Exercise Name: ${exercise.exercise}`}</p>
                      <p>{`Info: ${exercise.result || "No result"}`}</p>
                      <p>{`Rating: ${exercise.rating || "0"}`}</p>
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
