import React, { useState } from "react";
import linkChildService from "./services/linkChild";
import "./linkChildView.css";

const LinkChildView = ({ userData }) => {
  const { userId, role } = userData;
  const [childUsername, setChildUsername] = useState("");

  const handleChildUsernameChange = (e) => {
    setChildUsername(e.target.value);
  };

  const handleLinkChild = async () => {
    try {
      const linkData = { childUsername, parentId: userId, role }; // Include child username and parent ID in the data
      await linkChildService.createLink(linkData);
      alert("Child linked successfully");
    } catch (error) {
      if (error.response) {
        alert(`Error linking child: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        alert("Error linking child: No response from server");
      } else {
        alert(`Error linking child: ${error.message}`);
      }
    }
  };

  return (
    <div className="link-child-view">
      <h2 className="header-link-child">Link Child</h2>
      <div className="right-container">
        <div className="hbox">
          <div className="vbox">
            <div className="row">
              <div>
                <label>Lapsen käyttäjätunnus:</label>
                <input
                  type="text"
                  name="childUsername"
                  value={childUsername}
                  onChange={handleChildUsernameChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button className="hbox-button" onClick={handleLinkChild}>Link</button>
      </div>
    </div>
  );
};

export default LinkChildView;