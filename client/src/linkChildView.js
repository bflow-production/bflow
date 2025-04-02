import React, { useState } from "react";
import linkChildService from "./services/linkChild";
import "./linkChildView.css";

const LinkChildView = ({ userData, showNotification}) => {
  const { userId, role } = userData;
  const [childUsername, setChildUsername] = useState("");

  const handleChildUsernameChange = (e) => {
    setChildUsername(e.target.value);
  };

  const handleLinkChild = async () => {
    try {
      const linkData = { childUsername, parentId: userId, role }; // Include child username and parent ID in the data
      await linkChildService.createLink(linkData);
      showNotification("Lapsi linkitetty onnistuneesti");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "No response from server";
      showNotification("Virhe linkityksessä", true);
      console.error("Error while linking child:", errorMessage);
    }
  };

  return (
    <div className="link-child-view">
      <h2 className="header-link-child">Linkintä lapsi</h2>
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