import React, {useState} from "react";
import TotalBarChart from "./totalBarChart";
import "./statsView.css";
import VerbalBarChart from "./verbalBarChart";
import NumericalBarChart from "./numericalBarChart";

const StatsView = ({ userData }) => {
  const [isTacklingOpen, setIsTacklingOpen] = useState(false);
  const [isMarkingOpen, setIsMarkinggOpen] = useState(false);
  const [isInterceptionsOpen, setIsInterceptionsOpen] = useState(false);

  const [isZidaneOpen, setIsZidaneOpen] = useState(false);
  const [isStepoversOpen, setIsStepoversOpen] = useState(false);
  const [isElasticoOpen, setIsElasticoOpen] = useState(false);

  const [isSprintOpen, setIsSprintOpen] = useState(false);
  const [isAccelerationOpen, setIsAccelerationOpen] = useState(false);

  const [isShortPassOpen, setIsShortPassOpen] = useState(false);
  const [isLongPassOpen, setIsLongPassOpen] = useState(false);
  const [isCrossingOpen, setIsCrossingOpen] = useState(false);

  const [isStrengthOpen, setIsStrengthOpen] = useState(false);
  const [isStaminaOpen, setIsStaminaOpen] = useState(false);
  const [isJumpingOpen, setIsJumpingOpen] = useState(false);

  const [isShotSpeedOpen, setIsShotSpeedOpen] = useState(false);
  const [isLongShotsOpen, setIsLongShotsOpen] = useState(false);
  const [isFreeKickOpen, setIsFreeKickOpen] = useState(false);

  const [isDefendingOpen, setIsDefendingOpen] = useState(false);
  const [isDribblingOpen, setIsDribblingOpen] = useState(false);
  const [isPaceOpen, setIsPaceOpen] = useState(false);
  const [isPassingOpen, setIsPassingOpen] = useState(false);
  const [isPhysicalOpen, setIsPhysicalOpen] = useState(false);
  const [isShootingOpen, setIsShootingOpen] = useState(false);


  const toggleDefending = () => {
    const newState = !isDefendingOpen;
    setIsDefendingOpen(newState);
    setIsTacklingOpen(false);
    setIsMarkinggOpen(false);
    setIsInterceptionsOpen(false);
  }

  const toggleDribbling = () => {
    const newState = !isDribblingOpen;
    setIsDribblingOpen(newState);
    setIsZidaneOpen(false);
    setIsStepoversOpen(false);
    setIsElasticoOpen(false);
  }

  const togglePace = () => {
    const newState = !isPaceOpen;
    setIsPaceOpen(newState);
    setIsSprintOpen(false);
    setIsAccelerationOpen(false);
  }

  const togglePassing = () => {
    const newState = !isPassingOpen;
    setIsPassingOpen(newState);
    setIsShortPassOpen(false);
    setIsLongPassOpen(false);
    setIsCrossingOpen(false);
  }

  const togglePhysical = () => {
    const newState = !isPhysicalOpen;
    setIsPhysicalOpen(newState);
    setIsStrengthOpen(false);
    setIsStaminaOpen(false);
    setIsJumpingOpen(false);
  }

  const toggleShooting = () => {
    const newState = !isShootingOpen;
    setIsShootingOpen(newState);
    setIsShotSpeedOpen(false);
    setIsLongShotsOpen(false);
    setIsFreeKickOpen(false);
  }

  return (
    <div className="stats-view">
      <h1>Tilastot</h1>
      <TotalBarChart userData={userData}/>

      <div className="dropdown-box">
        <button onClick={toggleDefending} className="section-button"> 
            {isDefendingOpen ? "Puolustus" : "Puolustus"}
        </button>
      </div>

      {isDefendingOpen && (
        <div className="dropdown-container">
          <div className="row-container">
            <h3>Taklaaminen:</h3>
            <button
              onClick={() => setIsTacklingOpen(!isTacklingOpen)}
              className="sub-section-button"
            >
            {isTacklingOpen ? "↑" : "↓"}
          </button>
        </div>
          {isTacklingOpen && <VerbalBarChart userData={userData} exercise="Taklaaminen"/>}
          <div className="row-container">
            <h3>Vartiointi:</h3>
            <button
              onClick={() => setIsMarkinggOpen(!isMarkingOpen)}
              className="sub-section-button"
            >
            {isMarkingOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isMarkingOpen && <VerbalBarChart userData={userData} exercise="Vartiointi"/>}
          <div className="row-container">
            <h3>Katkot:</h3>
            <button
              onClick={() => setIsInterceptionsOpen(!isInterceptionsOpen)}
              className="sub-section-button"
            >
            {isInterceptionsOpen ? "↑" : "↓"}
            </button>
          </div>
          {isInterceptionsOpen && <VerbalBarChart userData={userData} exercise="Katkot"/>}
        </div>
      )}

      <div className="dropdown-box">
        <button onClick={toggleDribbling} className="section-button"> 
            {isDribblingOpen ? "Pallonkäsittely" : "Pallonkäsittely"}
        </button>
      </div>

      {isDribblingOpen && (
        <div className="dropdown-container">
            <div className="row-container">
              <h3>Zidane Fake Pass:</h3>
              <button
                onClick={() => setIsZidaneOpen(!isZidaneOpen)}
                className="sub-section-button"
              >
             {isZidaneOpen ? "↑" : "↓"}
            </button>
           </div>
          {isZidaneOpen && <VerbalBarChart userData={userData} exercise="Zidane Fake Pass"/>}
          <div className="row-container">
            <h3>Stepoverit:</h3>
            <button
              onClick={() => setIsStepoversOpen(!isStepoversOpen)}
              className="sub-section-button"
            >
              {isStepoversOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isStepoversOpen && <VerbalBarChart userData={userData} exercise="Stepoverit"/>}
          <div className="row-container">
            <h3>Elastico:</h3>
            <button
              onClick={() => setIsElasticoOpen(!isElasticoOpen)}
              className="sub-section-button"
            >
              {isElasticoOpen ? "↑" : "↓"}
            </button>
            </div>
          {isElasticoOpen && <VerbalBarChart userData={userData} exercise="Elastico"/>}
        </div>
      )}

      <div className="dropdown-box">
        <button onClick={togglePace} className="section-button"> 
            {isPaceOpen ? "Nopeus" : "Nopeus"}
        </button>
      </div>

      {isPaceOpen && (
        <div className="dropdown-container">
          <div className="row-container">
            <h3>Sprinttinopeus:</h3>
            <button
             onClick={() => setIsSprintOpen(!isSprintOpen)}
              className="sub-section-button"
            >
            {isSprintOpen ? "↑" : "↓"}
            </button>
          </div>
          {isSprintOpen && <NumericalBarChart userData={userData} exercise="Sprinttinopeus"/>}
          {isSprintOpen && <VerbalBarChart userData={userData} exercise="Sprinttinopeus"/>}
          <div className="row-container">
            <h3>Kiihtyvyys:</h3>
            <button
              onClick={() => setIsAccelerationOpen(!isAccelerationOpen)}
              className="sub-section-button"
            >
            {isAccelerationOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isAccelerationOpen && <NumericalBarChart userData={userData} exercise="Kiihtyvyys"/>}
          {isAccelerationOpen && <VerbalBarChart userData={userData} exercise="Kiihtyvyys"/>}
        </div>
      )}

      <div className="dropdown-box">
        <button onClick={togglePassing} className="section-button"> 
            {isPassingOpen ? "Syöttö" : "Syöttö"}
        </button>
      </div>

      {isPassingOpen && (
        <div className="dropdown-container">
          <div className="row-container">
            <h3>Lyhyet syötöt:</h3>
            <button
              onClick={() => setIsShortPassOpen(!isShortPassOpen)}
              className="sub-section-button"
            >
            {isShortPassOpen ? "↑" : "↓"}
            </button>
          </div>
          {isShortPassOpen && <VerbalBarChart userData={userData} exercise="Lyhyet syötöt"/>}
          <div className="row-container">
            <h3>Pitkät syötöt:</h3>
            <button
              onClick={() => setIsLongPassOpen(!isLongPassOpen)}
              className="sub-section-button"
            >
            {isLongPassOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isLongPassOpen && <VerbalBarChart userData={userData} exercise="Pitkät syötöt"/>}
          <div className="row-container">
            <h3>Keskitykset:</h3>
            <button
              onClick={() => setIsCrossingOpen(!isCrossingOpen)}
              className="sub-section-button"
            >
            {isCrossingOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isCrossingOpen && <VerbalBarChart userData={userData} exercise="Keskitykset"/>}
        </div>
      )}

      <div className="dropdown-box">
        <button onClick={togglePhysical} className="section-button"> 
            {isPhysicalOpen ? "Fyysisyys" : "Fyysisyys"}
        </button>
      </div>

      {isPhysicalOpen && (
        <div className="dropdown-container">
          <div className="row-container">
            <h3>Voima:</h3>
            <button
              onClick={() => setIsStrengthOpen(!isStrengthOpen)}
              className="sub-section-button"
            >
            {isStrengthOpen ? "↑" : "↓"}
            </button>
          </div>
          {isStrengthOpen && <VerbalBarChart userData={userData} exercise="Voima"/>}
          <div className="row-container">
            <h3>Kestävyys:</h3>
            <button
              onClick={() => setIsStaminaOpen(!isStaminaOpen)}
              className="sub-section-button"
            >
            {isStaminaOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isStaminaOpen && <VerbalBarChart userData={userData} exercise="Kestävyys"/>}
          <div className="row-container">
            <h3>Hyppy:</h3>
            <button
              onClick={() => setIsJumpingOpen(!isJumpingOpen)}
              className="sub-section-button"
            >
            {isJumpingOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isJumpingOpen && <VerbalBarChart userData={userData} exercise="Hyppy"/>}
        </div>
      )}

      <div className="dropdown-box">
        <button onClick={toggleShooting} className="section-button"> 
            {isShootingOpen ? "Laukaus" : "Laukaus"}
        </button>
      </div>

      {isShootingOpen && (
        <div className="dropdown-container">
          <div  className="row-container">
            <h3>Laukaisuvoima (tutka):</h3>
            <button
              onClick={() => setIsShotSpeedOpen(!isShotSpeedOpen)}
              className="sub-section-button"
            >
            {isShotSpeedOpen ? "↑" : "↓"}
            </button>
          </div>
          {isShotSpeedOpen && <NumericalBarChart userData={userData} exercise="Laukaisuvoima (tutka)"/>}
          {isShotSpeedOpen && <VerbalBarChart userData={userData} exercise="Laukaisuvoima (tutka)"/>}
          <div className="row-container">
            <h3>Kaukolaukaukset:</h3>
            <button
              onClick={() => setIsLongShotsOpen(!isLongShotsOpen)}
              className="sub-section-button"
            >
            {isLongShotsOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isLongShotsOpen && <VerbalBarChart userData={userData} exercise="Kaukolaukaukset"/>}
          <div className="row-container">
            <h3>Vapaapotkut:</h3>
            <button
              onClick={() => setIsFreeKickOpen(!isFreeKickOpen)}
              className="sub-section-button"
            >
            {isFreeKickOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isFreeKickOpen && <VerbalBarChart userData={userData} exercise="Vapaapotkut"/>}
        </div>
      )}
    </div>
  );
};

export default StatsView;
