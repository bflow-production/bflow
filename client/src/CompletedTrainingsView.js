import { useState, useEffect } from "react";
import axios from "axios";
import "./TrainingView.css";

const CompletedTrainingsView = ({ userData }) => {
  const [trainingData, setTrainingData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultOrRating, setResultOrRating] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});
  const backendURL = "http://127.0.0.1:5000";

  useEffect(() => {
    const fetchTrainingData = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/api/training/${userData.userId}`
        );

        console.log("Training Data Response:", response.data);

        if (response.data && !response.data.error) {
          setTrainingData(response.data);
        } else {
          throw new Error("Training data not available for this player");
        }
      } catch (error) {
        console.error("Error fetching training data:", error);
        setError("Error fetching training data");
      } finally {
        setLoading(false);
      }
    };
    fetchTrainingData();
  }, [userData.userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
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
      {Object.keys(trainingData).map((category) => (
        <div key={category} className="category-card">
          <h3
            className="category-header"
            onClick={() => toggleCategory(category)}
          >
            {category}
          </h3>
          {expandedCategories[category] && (
            <div className="exercise-grid">
              {trainingData[category].map((exercise, index) => (
                <div key={index} className="exercise-card">
                  <strong className="exercise-title">
                    {exercise.exercise}
                  </strong>
                  <div className="exercise-inputs">
                    <div className="input-group">
                      <p>
                        {`Result: ${
                          resultOrRating[exercise.exercise]?.result ||
                          exercise.result ||
                          "0"
                        }`}
                      </p>
                      <p>
                        {`Rating: ${
                          resultOrRating[exercise.exercise]?.rating ||
                          exercise.rating ||
                          "0"
                        }`}
                      </p>
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
