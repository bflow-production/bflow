import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./App.css";
import Login from "./login";
import Register from "./register";
import ProfileView from "./profileView";
import StatsView from "./statsView";
import TrainingView from "./TrainingView";
import CompletedTrainingsView from "./CompletedTrainingsView";
import CoachView from "./coachView";
import JoinTeamView from "./joinTeamView";
import LinkChildView from "./linkChildView";
import SettingsView from "./settings";
import userService from "./services/user";
import HomePage from "./homePage";
import Notification from "./components/Notification";

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

  // Fetch user data from the backend using userId
  //todo: API needs a decorator to check the token(unimplemented)
  useEffect(() => {
    if (userData?.userId) {
      userService
        .getUserByRole(userData.userId, userData.role)
        .then((response) => {
          setUserData((prevData) => ({ ...prevData, ...response }));
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
        return <ProfileView userData={userData} />;
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
      case "coach":
        return userData.role === "coach" ? (
          <CoachView userData={userData} />
        ) : (
          <div>Invalid View</div>
        );
      case "joinTeam":
        return userData.role === "player" ? (
          <JoinTeamView userData={userData} />
        ) : (
          <div>Invalid View</div>
        );
      case "linkChild":
        return userData.role === "parent" ? (
          <LinkChildView userData={userData} />
        ) : (
          <div>Invalid View</div>
        );
      case "settings":
        return <SettingsView userData={userData} />;
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

  const handleSettings = () => {
    setActiveView("settings");
  };

  const togglesidebar = () => {
    setsidebarOpen(!sidebarOpen);
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
      </header>

      <Notification notification={notification} />

      <div className="app-content">
        <nav className={`nav ${sidebarOpen ? "open" : ""}`}>
          <button
            onClick={() => setActiveView("home")}
            className={activeView === "home" ? "active" : ""}
          >
            Koti
          </button>
          <button
            onClick={() => setActiveView("profile")}
            className={activeView === "profile" ? "active" : ""}
          >
            Profiili
          </button>
          <button
            onClick={() => setActiveView("stats")}
            className={activeView === "stats" ? "active" : ""}
          >
            Tilastot
          </button>
          <button
            onClick={() => setActiveView("startTraining")}
            className={activeView === "startTraining" ? "active" : ""}
          >
            Tee harjoitus
          </button>
          <button
            onClick={() => setActiveView("completedTrainings")}
            className={activeView === "completedTrainings" ? "active" : ""}
          >
            Tehdyt harjoitukset
          </button>
          {userData.role === "coach" && (
            <button
              onClick={() => setActiveView("coach")}
              className={activeView === "coach" ? "active" : ""}
            >
              Valmentaja
            </button>
          )}
          {userData.role === "player" && (
            <button
              onClick={() => setActiveView("joinTeam")}
              className={activeView === "joinTeam" ? "active" : ""}
            >
              Liity joukkueeseen
            </button>
          )}
          {userData.role === "parent" && (
            <button
              onClick={() => setActiveView("linkChild")}
              className={activeView === "linkChild" ? "active" : ""}
            >
              Linkitä lapsi
            </button>
          )}
          <button className="settings-button" onClick={handleSettings}>
            Asetukset
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Kirjaudu ulos
          </button>
        </nav>
        <main className="main">{renderView()}</main>
      </div>
    </div>
  );
};

export default App;
