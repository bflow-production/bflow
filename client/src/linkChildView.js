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
      showNotification("Child linked successfully");
    } catch (error) {
      if (error.response) {
        showNotification("Error linking child", true);
        console.error("Error linking child:", error.response.data);
      } else if (error.request) {
        showNotification("Error linking child: No response from server", true);
        console.error("Error linking child: No response from server");
      } else {
        showNotification("Error linking child", true);
        console.error("Error linking child:", error.message);
      }
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