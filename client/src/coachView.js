import React, { useState } from "react";
import axios from 'axios';
import "./coachView.css";

const CoachView = ({ userData }) => {
  const { userId, role } = userData;
  const backendURL = "/api";

  const [teamName, setTeamName] = useState("");

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSave = async () => {
    try {
      const teamData = { teamName, coachId: userId, role }; // Include team name and coach ID in the data
      const response = await axios.post(`${backendURL}/team`, teamData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });
      alert("Team created successfully");
    } catch (error) {
      if (error.response) {
        alert(`Error creating team: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        alert("Error creating team: No response from server");
      } else {
        alert(`Error creating team: ${error.message}`);
      }
    }
  };

  return (
    <div className="coach-view">
      <h2 className="header-coach">Create Team</h2>
      <div className="right-container">
        <div className="hbox">
          <div className="vbox">
            <div className="row">
              <div>
                <label>Joukkueen nimi:</label>
                <input
                  type="text"
                  name="team"
                  value={teamName}
                  onChange={handleTeamNameChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button className="hbox-button" onClick={handleSave}>Tallenna</button>
      </div>
    </div>
  );
};

export default CoachView;