import React, { useState } from "react";
import "./profileView.css";
const ProfileView = ({ userData }) => {
  const [profile, setProfile] = useState({
    username: userData?.profile?.username || "",
    password: userData?.profile?.password || "",
    email: userData?.profile?.email || "",
    name: userData?.profile?.name || "",
    picture: userData?.profile?.picture || "",
    birthYear: userData?.profile?.birthYear || "",
    country: userData?.profile?.country || "",
    playerNumber: userData?.profile?.playerNumber || "",
    team: userData?.profile?.team || "",
    coach: userData?.profile?.coach || "",
    coachEmail: userData?.profile?.coachEmail || "",
    parent1: userData?.profile?.parent1 || "",
    parent1Email: userData?.profile?.parent1Email || "",
    parent2: userData?.profile?.parent2 || "",
    parent2Email: userData?.profile?.parent2Email || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Updated Profile:", profile);
    // Add save logic here 
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
                  value={profile.username}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Salasana:</label>
                <input
                  type="password"
                  name="password"
                  value={profile.password}
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
                  value={profile.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Nimi:</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
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
                  name="playerNumber"
                  value={profile.playerNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Joukkue:</label>
                <input
                  type="text"
                  name="team"
                  value={profile.team}
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
                  value={profile.coach}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Valmentajan mailiosoite:</label>
                <input
                  type="email"
                  name="coachEmail"
                  value={profile.coachEmail}
                  onChange={handleChange}
                />
              </div>
            </div>
  
            <div className="row">
              <div>
                <label>Vanhempi 1:</label>
                <input
                  type="text"
                  name="parent1"
                  value={profile.parent1}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Mailiosoite:</label>
                <input
                  type="email"
                  name="parent1Email"
                  value={profile.parent1Email}
                  onChange={handleChange}
                />
              </div>
            </div>
  
            <div className="row">
              <div>
                <label>Vanhempi 2:</label>
                <input
                  type="text"
                  name="parent2"
                  value={profile.parent2}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Mailiosoite:</label>
                <input
                  type="email"
                  name="parent2Email"
                  value={profile.parent2Email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button className="hbox-button" onClick={handleSave}>Tallenna</button>
      </div>
    </div>
  );
  
};

export default ProfileView;
