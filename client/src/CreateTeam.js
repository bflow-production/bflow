import React, { useState } from "react";
import teamService from './services/teams';
import "./CreateTeam.css";

const CreateTeam = ({ userData, showNotification }) => {
  const { userId, role } = userData;
  const [teamName, setTeamName] = useState("");

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSave = async () => {
    try {
      const teamData = { teamName, coachId: userId, role }; // Include team name and coach ID in the data
      await teamService.createTeam(teamData);
      showNotification("Team created successfully");
    } catch (error) {
      if (error.response) {
        showNotification(`Error creating team: ${error.response.data.error || ""}`, true);
        console.error("Error creating team:", error.response.data);
      } else if (error.request) {
        showNotification("Error creating team: No response from server", true);
        console.error("Error creating team: No response from server");
      } else {
        showNotification("Error creating team", true);
        console.error("Error creating team:", error.message);
      }
    }
  };

  return (
    <div className="coach-view">
      <h2 className="header-coach">Luo joukkue</h2>
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

export default CreateTeam;