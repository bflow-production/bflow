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
      showNotification("Joukkue luotu onnistuneesti");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "No response from server";
      showNotification(`Virhe luodessa joukkuetta`, true);
      console.error("Error creating team:", errorMessage);
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