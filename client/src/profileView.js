import React, { useState, useEffect } from "react";

import "./profileView.css";

const ProfileView = ({ userData }) => {

const [editMode, setEditMode] = useState(false);
const [isFlipped, setIsFlipped] = useState(false);

 
 const id = userData.userId;
 const role = userData.role;
 const backendURL = "http://127.0.0.1:5000";

  const [profile, setProfile] = useState({
    username: "MMatti",
    password: "'''''",
    email: "Matti@gmail.com",
    name: "",
    picture: "",
    birthYear: "2000",
    country: "Suomi",
    shirtNumber: "92",
    team: "Manu",
    coach: "ölakdölas",
    coachEmail: "fdhkjdhasjkhd",
    parent: "klfjlkad",
    parentEmail: "kajdkasjkö",
    role: ""
  });

  useEffect(() => {
    //const id = userData.userId;
    const role = userData.role;
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${backendURL}/api/user/${id}?role=${role}`);
  
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
  
        const data = await response.json();
        console.log(data)
  
        setProfile({
          username: data.username || "Matti",
          email: data.email || "",
          name: data.name || "",
          picture: data.picture || "",
          birthYear: data.birthYear || "",
          country: data.country || "",
          shirtNumber: data.shirtNumber || "",
          team: data.team || "",
          coach: data.coach || "",
          coachEmail: data.coachEmail || "",
          parent: data.parent || "",
          parentEmail: data.parentEmail || ""
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
  
    fetchProfileData();
  }, [id, role]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,  
      
    }));
  };

  const handleSave = async () => {
    try {
        const response = await fetch(`${backendURL}/api/user/${userData.userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`, 
            },
            body: JSON.stringify(profile),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("User updated:", data.message);
        } else {
            const errorData = await response.json();
            console.error("Error updating user:", errorData.error);
        }
    } catch (error) {
        console.error("Error during save operation:", error);
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
        {['Käyttäjänimi', 'Syntymävuosi', 'Pelipaikka', 'joukkue', 'Pelinumero'].map((field) => (
          <p key={field}>
            <strong>{field}:</strong>
            {editMode ? (
              <input
                type="text"
                name={field}
                value={profile[field]}
                onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
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
                onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
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
       <div className="parent-card" onClick={() => setIsFlipped(!isFlipped)}>
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
                    onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
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
    <div className = "buttonDiv">
        {/* Edit Button */}
    <button className="edit-button" onClick={() => setEditMode(!editMode)}>
      {editMode ? "Tallenna" : "Muokkaa"}
    </button>
     {/* Delete Button */}
     <button className="edit-button" onClick={() => setEditMode(!editMode)}>
      { "Poista profiili"}
    </button>
    </div>
  
  </div>
);
}

export default ProfileView;
