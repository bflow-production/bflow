import React, { useState } from "react";
import axios from 'axios';
import "./joinTeamView.css";

const JoinTeamView = ({ userData }) => {
  const { userId, role } = userData;
  const backendURL = "http://127.0.0.1:5000";

  const [teamName, setTeamName] = useState("");

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleJoinTeam = async () => {
    try {
      const teamData = { teamName, playerId: userId, role }; // Include team name and player ID in the data
      const response = await axios.post(`${backendURL}/api/join-team`, teamData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });
      alert("Joined team successfully");
    } catch (error) {
      if (error.response) {
        alert(`Error joining team: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        alert("Error joining team: No response from server");
      } else {
        alert(`Error joining team: ${error.message}`);
      }
    }
  };

  return (
    <div className="join-team-view">
      <h2 className="header-join-team">Join Team</h2>
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