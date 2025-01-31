import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import "./App.css";
import Login from "./login";
import Register from "./register";
import ProfileView from './profileView';
import StatsView from './statsView';
import TrainingView from './trainingView';

const backendURL = "http://127.0.0.1:5000";

function App() {
  const [userData, setUserData] = useState(null);
  const [activeView, setActiveView] = useState("profile");
  const [authView, setAuthView] = useState("login");
  const [dropdownOpen, setDropdownOpen] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Validate token expiration 
        if (decodedToken.exp * 1000 < Date.now()) {
          throw new Error("Token expired");
        }
        setUserData({
          userId: decodedToken.user_id,
          username: decodedToken.username,
          // Any other user-specific data in the token
        });
      } catch (error) {
        console.error("Invalid or expired token:", error);
        localStorage.removeItem("jwtToken"); 
        setUserData(null); 
      }
    }
  }, []);  

  // Fetch user data from the backend using userId 
  //todo: API needs a decorator to check the token(unimplemented)
  useEffect(() => {
    if (userData?.userId) {
      axios
        .get(`${backendURL}/api/user/${userData.userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")}` }
        })
        .then((response) => {
          setUserData((prevData) => ({ ...prevData, ...response.data }));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userData?.userId]); 

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.clear();
    };
    window.onbeforeunload = clearLocalStorage;
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const renderView = () => {
    switch (activeView) {
      case "profile":
        return <ProfileView userData={userData} />;
      case "stats":
        return <StatsView userData={userData} />;
      case "training":
        return <TrainingView userData={userData} />;
      case "settings":
        return <div>Settings View (coming soon!)</div>;
      default:
        return <div>Invalid View</div>;
    }
  };
  

  if (!userData) {
    return (
      <div className="auth-container">
        {authView === "login" ? (
          <Login setAuthView={setAuthView} setUserData={setUserData} setActiveView={setActiveView} />
        ) : (
          <Register setAuthView={setAuthView} />
        )}
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setUserData(null);
    setActiveView("login")
    setDropdownOpen(false);
  };

  const handleSettings = () => {
    setActiveView("settings");
    setDropdownOpen(false); // Close the dropdown when navigating to settings
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <span className="app-title">B'FLOW</span>
        </h1>
        <h2>{userData?.name}</h2>
        
      <div className="dropdown">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
          ☰
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button className="settings-button" onClick={handleSettings}>Settings</button>
              <button className="logout-button" onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </div>
      </header>

      <div className="app-content">
        <nav className="nav">
          <button
            onClick={() => setActiveView("profile")}
            className={activeView === "profile" ? "active" : ""}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveView("stats")}
            className={activeView === "stats" ? "active" : ""}
          >
            Stats
          </button>
          <button
            onClick={() => setActiveView("training")}
            className={activeView === "training" ? "active" : ""}
          >
            Training
          </button>
        </nav>
        <main className="main">{renderView()}</main>
      </div>
    </div>
  );
}

export default App;