import { useState, useEffect } from "react";
import axios from "axios";
import "./TrainingView.css";

const CompletedTrainingsView = ({ userData, completedTrainings }) => {
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const backendURL = "http://127.0.0.1:5000";

  useEffect(() => {
    axios
      .get(`${backendURL}/api/training/${userData.userId}`)
      .then((response) => {
        const data = response.data;
        setCategories(Object.keys(data));
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, [userData.userId]);

  if (categories.length === 0) {
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
      {categories.map((category) => (
        <div key={category} className="category-card">
          <button
            className="category-header"
            onClick={() => toggleCategory(category)}
          >
            {category}
          </button>
          {expandedCategories[category] && (
            <div className="exercise-grid">
              {completedTrainings
                .filter((exercise) => exercise.category === category)
                .map((exercise, index) => (
                  <div key={index} className="exercise-card">
                    <strong className="exercise-title">
                      {exercise.exercise}
                    </strong>
                    <div className="exercise-inputs">
                      <div className="input-group">
                        <p>{`Result: ${exercise.result || "No result"}`}</p>
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
