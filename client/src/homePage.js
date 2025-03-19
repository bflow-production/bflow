import React, { useEffect, useState } from "react";
import "./homePage.css";
import SimpleBarChart from "./charts";
import trainingService from "./services/trainings";

const HomePage = ({ userData }) => {
  const [latestExercises, setLatestExercises] = useState([]);

  const ratingToVerbal = {
    1: "Aloitin vasta",
    2: "Osaan jo hieman",
    3: "Osaan",
    4: "Osaan jo hyvin",
    5: "Mestari",
  };

  useEffect(() => {
    if (userData?.userId) {
      trainingService
        .getLatestExercises(userData.userId)
        .then((response) => {
          console.log("Latest exercises fetched:", response);
          setLatestExercises(response);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userData]);

  console.log(latestExercises.length);

  return (
    <div className="home-page">
      <h1>Tervetuloa, {userData.username}!</h1>
      <SimpleBarChart userData={userData} />
      <h2>Viimeisimmät harjoitukset:</h2>
      <div className="content">
        <div className="latest-exercises">
          <div className="exercise-card">
            <h3>{latestExercises[0]?.exercise || "No exercise"}</h3>
            <p>
              Kesto: {latestExercises[0]?.duration || "No duration"} minuuttia
            </p>
            <p>
              Arviointi: {ratingToVerbal[latestExercises[0]?.rating] || "0"}
            </p>
          </div>
          <div className="exercise-card">
            <h3>{latestExercises[1]?.exercise || "No exercise"}</h3>
            <p>
              Kesto: {latestExercises[1]?.duration || "No duration"} minuuttia
            </p>
            <p>
              Arviointi: {ratingToVerbal[latestExercises[1]?.rating] || "0"}
            </p>
          </div>
        </div>
        <div className="profile">
          <div className="player-image">
            {userData.picture ? (
              <img src={userData.picture} alt="Profile" />
            ) : (
              <div className="placeholder">Ei kuvaa</div>
            )}
          </div>
          <div className="profile-info">
            <p>
              <strong>Joukkue:</strong> {userData.team || "Ei joukkueessa"}
            </p>
            <p>
              <strong>Numero:</strong> {userData.number || "Ei numeroa"}
            </p>
            <p>
              <strong>Pelipaikka:</strong>{" "}
              {userData.position || "Ei pelipaikkaa"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
