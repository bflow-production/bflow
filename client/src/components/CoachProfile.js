import React, { useState, useEffect } from "react";
import userService from "../services/user";
import teamService from "../services/teams";
import "../profileView.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const CoachProfile = ({ userData, showNotification }) => {
  const { userId, role } = userData;
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    picture: "",
    birthYear: "",
    country: "",
    team: "",
    role: role,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getUserByRole(userId);
        setProfile(response);
        console.log("Profile data:", response);
        console.log("Userdata:", userData);

        const teamResponse = await teamService.getTeam(userId);
        console.log("Coach team data:", teamResponse);

        if (teamResponse.teamName) {
          setProfile((prevProfile) => ({
            ...prevProfile,
            team: teamResponse.teamName,
          }));
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, [userId, role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const profileData = { ...profile, role };
      console.log("Profile data to save:", profileData);

      const response = await userService.updateUser(userId, profileData);
      console.log("Profile update response:", response);

      setEditMode(false);
      showNotification("Profiili päivitetty onnistuneesti");
    } catch (error) {
      showNotification("Virhe profiilia päivitettäessä", true);
      console.error("Error during save operation:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="top-section">
        <div className="player-info">
          <h2>{profile.name}</h2>
          {["username", "email", "birthYear", "country", "team"].map(
            (field) => {
              const getFieldLabel = (field) => {
                switch (field) {
                  case "username":
                    return "Käyttäjätunnus";
                  case "email":
                    return "Sähköposti";
                  case "birthYear":
                    return "Syntymävuosi";
                  case "country":
                    return "Maa";
                  case "team":
                    return "Joukkue";
                  default:
                    return "Tuntematon kenttä";
                }
              };
              return (
                <p key={field}>
                  <strong>{getFieldLabel(field)}</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name={field}
                      value={profile[field]}
                      onChange={handleChange}
                      className="profile-input"
                    />
                  ) : (
                    <span
                      className="editable-field"
                      onClick={() => setEditMode(true)}
                    >
                      {profile[field]}{" "}
                      <span className="edit-icon">
                        <i className="fas fa-pen"></i>
                      </span>
                    </span>
                  )}
                </p>
              );
            }
          )}
        </div>
      </div>

      <div className="buttonDiv">
        {/* Edit Button */}
        {!editMode ? (
          <button className="edit-button" onClick={() => setEditMode(true)}>
            Muokkaa
          </button>
        ) : (
          <button className="edit-button" onClick={handleSave}>
            Tallenna
          </button>
        )}
        {/* Delete Button */}
        <button className="edit-button">Poista profiili</button>
      </div>
    </div>
  );
};

export default CoachProfile;
