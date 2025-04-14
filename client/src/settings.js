import { useState } from "react";
import "./settings.css";

const SettingsView = ({ showNotification }) => {
  const [language, setLanguage] = useState("fi");
  const [shareWith, setShareWith] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSave = () => {
    if (newPassword !== confirmNewPassword) {
      showNotification("Uusi salasana ja vahvistus eivät täsmää.", "error");
      return;
    }
  }

  return (
    <div className="settings-view">
      <h1 className="settings-title">Asetukset</h1>
      <div className="settings-box">
        <div>
          <label className="label">Kieli:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="select-box"
          >
            <option value="fi">Suomi</option>
            <option value="en">Englanti</option>
          </select>
        </div>
        <div className="radiobutton-box">
          <label className="label">Harjoitusten jakaminen:</label>
          <label>
            <input
              type="radio"
              value="coach"
              checked={shareWith === "coach"}
              onChange={(e) => setShareWith(e.target.value)}
            />
            Valmentaja
          </label>
          <label>
            <input
              type="radio"
              value="parent"
              checked={shareWith === "parent"}
              onChange={(e) => setShareWith(e.target.value)}
            />
            Huoltaja
          </label>
        </div>
        <div>
          <label className="label">Vaihda salasana:</label>
          <input
            type="password"
            placeholder="Vanha salasana"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="password-input"
          />
          <input
            type="password"
            placeholder="Uusi salasana"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="password-input"
          />
          <input
            type="password"
            placeholder="Varmista uusi salasana"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="password-input"
          />
        </div>
        <button className="save-button" onClick={handleSave}>Tallenna</button>
      </div>
    </div>
  );
};

export default SettingsView;