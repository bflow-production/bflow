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
import userService from "./services/user";
import HomePage from "./homePage";

function App() {
  const [userData, setUserData] = useState(null);
  const [activeView, setActiveView] = useState("home");
  const [authView, setAuthView] = useState("login");
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const [completedTrainings, setCompletedTrainings] = useState([]);

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
          setUserData((prevData) => ({ ...prevData, ...response}));
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          console.log(userData)
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

  const handleTrainingDone = (exercise) => {
    setCompletedTrainings((prev) => [...prev, exercise]);
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
            onTrainingDone={handleTrainingDone}
          />
        );
      case "completedTrainings":
        return (
          <CompletedTrainingsView
            userData={userData}
            completedTrainings={completedTrainings}
          />
        );
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
        return <div>Settings View (coming soon!)</div>;
      default:
        return <div>Invalid View</div>;
    }
  };

  if (!userData) {
    return (
      <div className="auth-container">
        {authView === "login" ? (
          <Login
            setAuthView={setAuthView}
            setUserData={setUserData}
            setActiveView={setActiveView}
          />
        ) : (
          <Register setAuthView={setAuthView} />
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

      <div className="app-content">
        <nav className={`nav ${sidebarOpen ? "open" : ""}`}>
          <button
            onClick={() => setActiveView("home")}
            className={activeView === "home" ? "active" : ""}
          >
            Home
          </button>
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
            onClick={() => setActiveView("startTraining")}
            className={activeView === "startTraining" ? "active" : ""}
          >
            Start Training
          </button>
          <button
            onClick={() => setActiveView("completedTrainings")}
            className={activeView === "completedTrainings" ? "active" : ""}
          >
            Completed Trainings
          </button>
          {userData.role === "coach" && (
            <button
              onClick={() => setActiveView("coach")}
              className={activeView === "coach" ? "active" : ""}
            >
              Coach
            </button>
          )}
          {userData.role === "player" && (
            <button
              onClick={() => setActiveView("joinTeam")}
              className={activeView === "joinTeam" ? "active" : ""}
            >
              Join Team
            </button>
          )}
          {userData.role === "parent" && (
            <button
              onClick={() => setActiveView("linkChild")}
              className={activeView === "linkChild" ? "active" : ""}
            >
              Link Child
            </button>
          )}
          <button className="settings-button" onClick={handleSettings}>
            Settings
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </nav>
        <main className="main">{renderView()}</main>
      </div>
    </div>
  );
}

export default App;
