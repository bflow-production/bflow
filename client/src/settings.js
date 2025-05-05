import { useState } from "react";
import settingService from "./services/settingservice";
import "./settings.css";

const SettingsView = ({ showNotification }) => {
  const [language, setLanguage] = useState("fi");
  const [shareWith, setShareWith] = useState([]);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSave = async () => {
    // Validate password fields
    if (newPassword && newPassword !== confirmNewPassword) {
      showNotification("Uusi salasana ja vahvistus eivät täsmää.", true);
      return;
    }

    try {
      // Save other settings (language, shareWith)
      await settingService.updateSettings({ language, shareWith });

      // Handle password change if a new password is provided
      if (newPassword) {
        await settingService.changePassword(currentPassword, newPassword);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }

      showNotification("Asetukset tallennettu onnistuneesti");
    } catch (error) {
      showNotification("Virhe asetusten tallentamisessa", true);
      console.error("Error saving settings:", error);
    }
  };

  return (
    <div className="settings-view">
      <h1 className="settings-title">Asetukset</h1>
      <div className="settings-box">
        <div>
          <label className="label-language">Kieli:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="select-box"
          >
            <option value="fi">Suomi</option>
            <option value="en">Englanti</option>
          </select>
        </div>
        <div className="checkbox-box">
          <label className="label">Harjoitusten jakaminen:</label>
          <label>
            <input
              type="checkbox"
              checked={shareWith.includes("coach")}
              onChange={() => {
                setShareWith((prev) =>
                  prev.includes("coach")
                    ? prev.filter((item) => item !== "coach")
                    : [...prev, "coach"]
                );
              }}
            />
            <span>Valmentaja</span>
          </label>
          <label>
            <input
              type="checkbox"
              checked={shareWith.includes("parent")}
              onChange={() => {
                setShareWith((prev) =>
                  prev.includes("parent")
                    ? prev.filter((item) => item !== "parent")
                    : [...prev, "parent"]
                );
              }}
            />
            <span>Huoltaja</span>
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
        <button className="save-button" onClick={handleSave}>
          Tallenna
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
