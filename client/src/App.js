import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./App.css";
import Login from "./login";
import Register from "./register";
import ProfileView from "./profileView";
import StatsView from "./statsView";
import TrainingView from "./TrainingView";
import CompletedTrainingsView from "./CompletedTrainingsView";
import CreateTeam from "./CreateTeam";
import JoinTeamView from "./joinTeamView";
import LinkChildView from "./linkChildView";
import SettingsView from "./settings";
import HomePage from "./homePage";
import Notification from "./components/Notification";
import PlayerSidebar from "./components/PlayerSidebar";
import CoachSidebar from "./components/CoachSidebar";
import ParentSidebar from "./components/ParentSidebar";
import CoachProfile from "./components/CoachProfile";
import ParentProfile from "./components/ParentProfile";
import CreateExerciseForm from "./components/CreateExerciseForm";
import logoutIcon from "./logout.png";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [activeView, setActiveView] = useState("home");
  const [authView, setAuthView] = useState("login");
  const [sidebarOpen, setsidebarOpen] = useState(true);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    console.log("Token from localStorage:", token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Validate token expiration
        if (decodedToken.exp * 1000 < Date.now()) {
          throw new Error("Token expired");
        }

        console.log(decodedToken);
        setUserData({
          userId: decodedToken.user_id,
          username: decodedToken.username,
          role: decodedToken.role,
          // Any other user-specific data in the token
        });
      } catch (error) {
        console.error("Invalid or expired token:", error);
        localStorage.removeItem("jwtToken");
        setUserData(null);
      }
    }
  }, []);

  useEffect(() => {
    if (userData?.role === "coach") {
      setActiveView("coachProfile");
    } else if (userData?.role === "parent") {
      setActiveView("parentProfile");
    } else {
      setActiveView("home");
    }
  }, [userData?.role]);

  // useEffect(() => {
  //   const clearLocalStorage = () => {
  //     localStorage.clear();
  //   };
  //   window.onbeforeunload = clearLocalStorage;
  //   return () => {
  //     window.onbeforeunload = null;
  //   };
  // }, []);

  const showNotification = (message, isError = false, duration = 3000) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification({ message: null, isError: null });
    }, duration);
  };

  const renderView = () => {
    switch (activeView) {
      case "home":
        return <HomePage userData={userData} />;
      case "profile":
        return (
          <ProfileView
            userData={userData}
            showNotification={showNotification}
          />
        );
      case "coachProfile":
        return (
          <CoachProfile
            userData={userData}
            showNotification={showNotification}
          />
        );
      case "parentProfile":
        return (
          <ParentProfile
            userData={userData}
            showNotification={showNotification}
          />
        );
      case "stats":
        return <StatsView userData={userData} />;
      case "startTraining":
        return (
          <TrainingView
            userData={userData}
            showNotification={showNotification}
          />
        );
      case "completedTrainings":
        return <CompletedTrainingsView userData={userData} />;
      case "createTeam":
        return (
          <CreateTeam userData={userData} showNotification={showNotification} />
        );
      case "createExercise":
        return (
          <CreateExerciseForm
            userData={userData}
            showNotification={showNotification}
          />
        );
      case "joinTeam":
        return (
          <JoinTeamView
            userData={userData}
            showNotification={showNotification}
          />
        );
      case "linkChild":
        return (
          <LinkChildView
            userData={userData}
            showNotification={showNotification}
          />
        );
      case "settings":
        return (
          <SettingsView
            userData={userData}
            showNotification={showNotification}
          />
        );
      default:
        return <div>Invalid View</div>;
    }
  };

  if (!userData) {
    return (
      <div className="auth-container">
        <Notification notification={notification} />
        {authView === "login" ? (
          <Login
            setAuthView={setAuthView}
            setUserData={setUserData}
            setActiveView={setActiveView}
            showNotification={showNotification}
          />
        ) : (
          <Register
            setAuthView={setAuthView}
            showNotification={showNotification}
          />
        )}
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setUserData(null);
    setActiveView("login");
  };

  const togglesidebar = () => {
    setsidebarOpen(!sidebarOpen);
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    if (window.innerWidth <= 768) {
      setsidebarOpen(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <button className="sidebar-toggle" onClick={togglesidebar}>
          ☰
        </button>
        <h1>
          <span className="app-title">B'FLOW</span>
        </h1>
        <h2>{userData?.name}</h2>
        <button className="logout-button" onClick={handleLogout}>
          <img src={logoutIcon} className="logout-icon" />
        </button>
      </header>

      <Notification notification={notification} />

      <div className="app-content">
        {userData.role === "player" && (
          <PlayerSidebar
            onViewChange={handleViewChange}
            sidebarOpen={sidebarOpen}
            handleLogout={handleLogout}
          />
        )}

        {userData.role === "coach" && (
          <CoachSidebar
            onViewChange={handleViewChange}
            sidebarOpen={sidebarOpen}
            handleLogout={handleLogout}
          />
        )}

        {userData.role === "parent" && (
          <ParentSidebar
            onViewChange={handleViewChange}
            sidebarOpen={sidebarOpen}
            handleLogout={handleLogout}
          />
        )}
        <main className="main">{renderView()}</main>
      </div>
    </div>
  );
};

export default App;
