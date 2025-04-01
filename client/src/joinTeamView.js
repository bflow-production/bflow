import React, { useState } from "react";
import teamService from "./services/teams";
import "./joinTeamView.css";

const JoinTeamView = ({ userData, showNotification }) => {
  const { userId, role } = userData;
  const [teamName, setTeamName] = useState("");

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleJoinTeam = async () => {
    try {
      const teamData = { teamName, playerId: userId, role }; // Include team name and player ID in the data
      await teamService.joinTeam(teamData);
      showNotification("Joined team successfully");
    } catch (error) {
      if (error.response) {
        showNotification("Error joining team", true);
        console.error("Error joining team:", error.response.data);
      } else if (error.request) {
        showNotification("Error joining team: No response from server", true);
        console.error("Error joining team: No response from server");
      } else {
        showNotification("Error joining team", true);
        console.error("Error joining team:", error.message);
      }
    }
  };

  return (
    <div className="join-team-view">
      <h2 className="header-join-team">Liity joukkueeseen</h2>
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
        <button className="hbox-button" onClick={handleJoinTeam}>Liity</button>
      </div>
    </div>
  );
};

export default JoinTeamView;