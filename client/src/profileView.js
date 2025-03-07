import React, { useState, useEffect } from "react";
import userService from "./services/user";
import teamService from "./services/teams";
import "./profileView.css";
import '@fortawesome/fontawesome-free/css/all.min.css';



const ProfileView = ({ userData }) => {
  const { userId, role } = userData;
  const [editMode, setEditMode] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const [profile, setProfile] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    picture: "",
    birthYear: "",
    position: "",
    country: "",
    number: "",
    team: "",
    coach: "",
    coachEmail: "",
    parent: "",
    parentEmail: "",
    childName: "",
    childEmail: "",
    role: role, 
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getUserByRole(userId, role);
        setProfile(response);
        console.log("Profile data:", response);

        if (role === 'coach') {
          const teamResponse = await teamService.getTeam(userId);
          console.log("Coach team data:", teamResponse);

          if (teamResponse.teamName) {
            setProfile((prevProfile) => ({
              ...prevProfile,
              team: teamResponse.teamName
            }));
          }
        }

        if (role === 'player' && response.team_id) {
          const teamResponse = await teamService.getTeam(response.team_id);
          console.log("Player team data:", teamResponse);

          if (teamResponse.teamName) {
            setProfile((prevProfile) => ({
              ...prevProfile,
              team: teamResponse.teamName,
              coach: response.coach,
              coachEmail: response.coachEmail
            }));
          }
        }
        if (role === 'parent' && response.child_id) {
          const childResponse = await userService.getUserByRole(response.child_id, 'player');
          console.log("Parent profile data:", response);

          if (childResponse.name) {
            setProfile((prevProfile) => ({
              ...prevProfile,
              childName: childResponse.name,
              childEmail: childResponse.email
            }));
          }
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
      [name]: value
    }));

  };

  const handleSave = async () => {
    try {
      const profileData = { ...profile, role };
      console.log("Profile data to save:", profileData);
      
      const response = await userService.updateUser(userId, profileData);
      console.log("Profile update response:", response);

      setEditMode(false);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error during save operation:", error);
    }
  };

  const handleCardClick = () => {
    if (!editMode) {
      setIsFlipped((prev) => !prev);
    }
  };


  return (
    <div className="profile-container">
    {/* Top Section: Player Info and Image */}
    <div className="top-section">
      {/* Image wrapper div */}
      <div className="imageVbox">
        <div className="player-image">
          {profile.picture ? (
            <img src={profile.picture} alt="Profiilikuva" />
          ) : (
            <div className="placeholder">Ei kuvaa</div>
          )}
        </div>
      </div>
        <div className="player-info">
          <h2>{profile.name}</h2>
          {['username', 'birthYear', 'position', 'team', 'number'].map((field) => (
            <p key={field}>
              <strong>{field === 'username' ? 'Käyttäjätunnus' : field === 'birthYear' ? 'Syntymävuosi' : field === 'position' ? 'Pelipaikka' : field === 'team' ? 'Joukkue' : 'Numero'}:</strong>
              {editMode ? (
                <input
                  type="text"
                  name={field}
                  value={profile[field]}
                  onChange={handleChange}
                  className="profile-input"
                />
              ) : (
                <span className="editable-field" onClick={() => setEditMode(true)}>
                  {profile[field]} <span className="edit-icon"><i className="fas fa-pen"></i></span>
                </span>
                
              )}
            </p>
          ))}
        </div>
      </div>

      {/* Bottom Section: Coach & Parent Info */}
      <div className="bottom-section">
        <div className="coach-info">
          <h3>Valmentajan Tiedot</h3>
          {['coach', 'coachEmail'].map((field) => (
            <p key={field}>
              <strong>{field === 'coach' ? 'Valmentaja' : 'Sähköposti'}:</strong>
              {editMode ? (
                <input
                  type="text"
                  name={field}
                  defaultValue={profile[field]}
                  onChange={handleChange}
                  className="profile-input"
                />
              ) : (
                <span className="editable-field" onClick={() => setEditMode(true)}>
                  {profile[field]} <span className="edit-icon"><i className="fas fa-pen"></i></span>
                </span>
              )}
            </p>
          ))}
        </div>

        {/* FLIPPING CARD: Huoltajan Tiedot */}
        <div className="parent-card">
          <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
            {/* Front Side */}
            
            <div className="card-front">
            <span className="flip-icon" onClick={handleCardClick}><i className="fas fa-sync-alt"></i></span>
              <h3>Huoltajan Tiedot</h3>
              {["parent", "parentEmail"].map((field) => (
                <p key={field}>
                  <strong>{field === 'parent' ? 'Huoltaja' : 'Sähköposti'}:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name={field}
                      value={profile[field]}
                      onChange={handleChange}
                      className="profile-input"
                    />
                  ) : (
                    <span className="editable-field" onClick={() => setEditMode(true)}>
                      {profile[field]} <span className="edit-icon"><i className="fas fa-pen"></i></span>
                    </span>
                  )}
                </p>
              ))}
            </div>

            {/* Back Side */}
            <div className="card-back">
            <span className="flip-icon" onClick={handleCardClick}><i className="fas fa-sync-alt"></i></span>
              <h3>Huoltajan Tiedot</h3>
              {["parent", "parentEmail"].map((field) => (
                <p key={field}>
                  <strong>{field === 'parent' ? 'Huoltaja' : 'Sähköposti'}:</strong>
                  {editMode ? (
                    <input
                      type="text"
                      name={field}
                      value={profile[field]}
                      onChange={handleChange}
                      className="profile-input"
                    />
                  ) : (
                    <span className="editable-field" onClick={() => setEditMode(true)}>
                      {profile[field]} <span className="edit-icon"><i className="fas fa-pen"></i></span>
                    </span>
                  )}
                </p>
              ))}
            </div>
          </div>
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
        <button className="edit-button">
          Poista profiili
        </button>
      </div>
    </div>
  );
};


export default ProfileView;