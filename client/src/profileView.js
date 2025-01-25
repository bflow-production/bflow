import React, { useState, useEffect } from "react";

import "./profileView.css";

const ProfileView = ({ userData }) => {
 
 const id = userData.userId;
 const backendURL = "http://127.0.0.1:5000";

  const [profile, setProfile] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    picture: "",
    birthYear: "",
    country: "",
    shirtNumber: "",
    team: "",
    coach: "",
    coachEmail: "",
    parent: "",
    parentEmail: ""
  });

  useEffect(() => {
    const id = userData.userId;
    
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${backendURL}/api/user/${id}`);
  
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
  
        const data = await response.json();
        console.log(data)
  
        setProfile({
          username: data.username || "",
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
  }, [id]);
  

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
    <div className="profile-view">
      <h2>PROFIILI</h2>
  
      <div className="right-container">
        {/* HBox container */}
        <div className="hbox">
          {/* VBox 1 */}
          <div className="vbox">
            <div className="row">
              <div>
                <label>Käyttäjätunnus:</label>
                <input
                  type="text"
                  name="username"
                  value={profile.username }
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Salasana:</label>
                <input
                  type="password"
                  name="password"
                  value={"*****"}
                  onChange={handleChange}
                />
              </div>
            </div>
  
            <div className="row">
              <div>
                <label>Mailiosoite:</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email }
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Nimi:</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name }
                  onChange={handleChange}
                />
              </div>
            </div>
  
            <div className="row">
              <div>
                <label>Syntymävuosi:</label>
                <input
                  type="number"
                  name="birthYear"
                  value={profile.birthYear}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
  
          {/* VBox 2 */}
          <div className="vbox">
            <div className="row">
              <div>
                <label>Maa:</label>
                <input
                  type="text"
                  name="country"
                  value={profile.country}
                  onChange={handleChange}
                />
              </div>
            </div>
  
            <div className="row">
              <div>
                <label>Pelinumero:</label>
                <input
                  type="text"
                  name="shirtNumber"
                  value={profile.shirtNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Joukkue:</label>
                <input
                  type="text"
                  name="team"
                  value={profile.team }
                  onChange={handleChange}
                />
              </div>
            </div>
  
            <div className="row">
              <div>
                <label>Joukkueen valmentaja:</label>
                <input
                  type="text"
                  name="coach"
                  value={profile.coach }
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Valmentajan mailiosoite:</label>
                <input
                  type="email"
                  name="coachEmail"
                  value={profile.coachEmail }
                  onChange={handleChange}
                />
              </div>
            </div>
  
            <div className="row">
              <div>
                <label>Vanhempi 1:</label>
                <input
                  type="text"
                  name="parent"
                  value={profile.parent}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Mailiosoite:</label>
                <input
                  type="email"
                  name="parentEmail"
                  value={profile.parentEmail}
                  onChange={handleChange}
                />
              </div>
            </div>
  
            
            </div>
          </div>
        </div>
        <button className="hbox-button" onClick={handleSave}>Tallenna</button>
      </div>
   
  );
  
};

export default ProfileView;
