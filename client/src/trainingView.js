import { useState, useEffect } from 'react';
import axios from 'axios';
import "./TrainingView.css";

const TrainingView = ({ userData }) => {
  const [trainingData, setTrainingData] = useState({});  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultOrRating, setResultOrRating] = useState({}); 
  const [expandedCategories, setExpandedCategories] = useState({});
  const backendURL = "http://127.0.0.1:5000";

  useEffect(() => {
    
    const fetchTrainingData = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/training/${userData.userId}`);

        console.log('Training Data Response:', response.data);
        
        if (response.data && !response.data.error) {
          setTrainingData(response.data);  
        } else {
          throw new Error('Training data not available for this player');
        }
      } catch (error) {
        console.error('Error fetching training data:', error);
        setError('Error fetching training data');
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

  const addExercise = async (exercise, result, rating) => {
    try {
      const response = await axios.put(`${backendURL}/api/training/${userData.userId}`, {
        exercise, 
        result,   
        rating, 
        playerId: userData.userId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
        }
      });
      console.log("Exercise added/updated:", response.data.message);
    } catch (error) {
      console.error("Error during save operation:", error.response ? error.response.data : error.message);
    }
  };

  const handleInputChange = (exercise, type, value) => {
    setResultOrRating(prevState => ({
      ...prevState,
      [exercise]: { 
        ...prevState[exercise], 
        [type]: value 
      }
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
                  <strong className="exercise-title">{exercise.exercise}</strong>
                  <div className="exercise-inputs">
                    <div className="input-group">
                      <input
                        type="text"
                        
                        placeholder={`Result: ${resultOrRating[exercise.exercise]?.result || exercise.result || ''}`}
                        
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
                        placeholder={`Rating: ${resultOrRating[exercise.exercise]?.rating || exercise.rating || ''}`}
                        onChange={(e) =>
                          handleInputChange(
                            exercise.exercise,
                            "rating",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                  <button
                    className="add-button"
                    onClick={() =>
                      addExercise(
                        exercise.exercise,
                        resultOrRating[exercise.exercise]?.result || "N/A",
                        resultOrRating[exercise.exercise]?.rating || 0,
                      )
                    }
                  >
                    Update
                  </button>
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



