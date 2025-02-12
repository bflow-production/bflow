import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./profileView.css";

const ProfileView = ({ userData }) => {
  const { userId, role } = userData;
  const [editMode, setEditMode] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const backendURL = "http://127.0.0.1:5000";

  const [profile, setProfile] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    picture: "",
    birthYear: "",
    country: "",
    number: "",
    team: "",
    coach: "",
    coachEmail: "",
    parent: "",
    parentEmail: "",
    childName: "",
    childEmail: "",
    role: role, // Ensure role is set correctly
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/user/${userId}?role=${role}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
          }
        });
        setProfile(response.data);

        if (role === 'coach') {
          const teamResponse = await axios.get(`${backendURL}/api/team/${userId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
          });
          if (teamResponse.data.teamName) {
            setProfile((prevProfile) => ({
              ...prevProfile,
              team: teamResponse.data.teamName
            }));
          }
        }
        if (role === 'player' && response.data.team_id) {
          const teamResponse = await axios.get(`${backendURL}/api/team/${response.data.team_id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
          });
          if (teamResponse.data.teamName) {
            setProfile((prevProfile) => ({
              ...prevProfile,
              team: teamResponse.data.teamName,
              coach: teamResponse.data.coachName,
              coachEmail: teamResponse.data.coachEmail
            }));
          }
        }
        if (role === 'parent' && response.data.child_id) {
          const childResponse = await axios.get(`${backendURL}/api/user/${response.data.child_id}?role=player`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
          });
          console.log("Parent profile data:", response.data);
          if (childResponse.data.name) {
            setProfile((prevProfile) => ({
              ...prevProfile,
              childName: childResponse.data.name,
              childEmail: childResponse.data.email
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [userId, role, backendURL]);

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
      const response = await axios.put(`${backendURL}/api/user/${userId}`, profileData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
      });
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
        <div className="player-image">
          {profile.picture ? (
            <img src={profile.picture} alt="Profile" />
          ) : (
            <div className="placeholder">Ei kuvaa</div>
          )}
        </div>
        <div className="player-info">
          <h2>{profile.name}</h2>
          {['username', 'birthYear', 'position', 'team', 'number'].map((field) => (
            <p key={field}>
              <strong>{field}:</strong>
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
                  {profile[field]} <span className="edit-icon">✏️</span>
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
          {['Valmentaja', 'Sähköposti'].map((field) => (
            <p key={field}>
              <strong>{field}:</strong>
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
                  {profile[field]} <span className="edit-icon">✏️</span>
                </span>
              )}
            </p>
          ))}
        </div>

        {/* FLIPPING CARD: Huoltajan Tiedot */}
        <div className="parent-card" onClick={handleCardClick}>
          <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
            {/* Front Side */}
            <div className="card-front">
              <h3>Huoltajan Tiedot</h3>
              {["Huoltaja", "Sähköposti"].map((field) => (
                <p key={field}>
                  <strong>{field}:</strong>
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
                      {profile[field]} <span className="edit-icon">✏️</span>
                    </span>
                  )}
                </p>
              ))}
            </div>

            {/* Back Side */}
            <div className="card-back">
              <h3>Lisätiedot</h3>
              <p>Muu tärkeä tieto tähän...</p>
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
}

export default ProfileView;