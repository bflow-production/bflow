import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userData, setUserData] = useState(null);
  const [activeView, setActiveView] = useState("profile");
  const userId = 2;
  const backendURL = "http://127.0.0.1:5000";

  useEffect(() => {
    axios
      .get(`${backendURL}/api/user/${userId}`)
      .then((response) => setUserData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const renderView = () => {
    switch (activeView) {
      case "profile":
        return (
          <div className="profile-view">
            <h2>Profile</h2>
            <p>Age: {userData?.profile?.age}</p>
            <p>Location: {userData?.profile?.location}</p>
          </div>
        );
      case "stats":
        return (
          <div className="stats-view">
            <h2>Stats</h2>
            <p>Workouts: {userData?.stats?.workouts}</p>
            <p>Total Time: {userData?.stats?.total_time}</p>
          </div>
        );
      case "training":
        return (
          <div className="training-view">
            <h2>Training</h2>
            <ul>
              {userData?.training?.map((item, index) => (
                <li key={index}>
                  {item?.date}: {item?.workout}
                </li>
              ))}
            </ul>
          </div>
        );
      default:
        return <div>Invalid View</div>;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <span className="app-title">B'FLOW</span>
        </h1>
        <h2>{userData?.name}</h2>
      </header>
      <div className="app-content">
        {" "}
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
