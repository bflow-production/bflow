import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./profileView.css";

const ProfileView = ({ userData }) => {
  const { userId, role } = userData;
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
      alert("Profile updated successfully");
    } catch (error) {
      if (error.response) {
        alert(`Error updating profile: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        alert("Error updating profile: No response from server");
      } else {
        alert(`Error updating profile: ${error.message}`);
      }
    }
  };

  return (
    <div className="profile-view">
      <h2 className="header-profile">Profile</h2>
      <div className="right-container">
        <div className="hbox">
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
                  value={"*****"}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div>
                <label>Nimi:</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </div>
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
            {role === 'player' && (
              <>
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
                <div className="row">
                  <div>
                    <label>Pelinumero:</label>
                    <input
                      type="number"
                      name="number"
                      value={profile.number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}
            
            {role === 'parent' && (
              <>
                <div className="row">
                  <div>
                    <label>Lapsen nimi:</label>
                    <input
                      type="text"
                      name="childName"
                      value={profile.childName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label>Lapsen mailiosoite:</label>
                    <input
                      type="email"
                      name="childEmail"
                      value={profile.childEmail}
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
              </>
            )}
          </div>
        </div>
        <button className="hbox-button" onClick={handleSave}>Tallenna</button>
      </div>
    </div>
  );
};

export default ProfileView;