import React, {use, useState} from "react";
import TotalBarChart from "./totalBarChart";
import "./statsView.css";
import VerbalBarChart from "./verbalBarChart";
import NumericalBarChart from "./numericalBarChart";

const StatsView = () => {
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
      <TotalBarChart/>

      <div className="dropdown-box">
        <button onClick={toggleDefending} className="section-button"> 
            {isDefendingOpen ? "Puolustus" : "Puolustus"}
        </button>
      </div>

      {isDefendingOpen && (
        <div className="dropdown-container">
          <div className="row-container">
            <h3>Taklaus:</h3>
            <button
              onClick={() => setIsTacklingOpen(!isTacklingOpen)}
              className="sub-section-button"
            >
            {isTacklingOpen ? "↑" : "↓"}
          </button>
        </div>
          {isTacklingOpen && <VerbalBarChart/>}
          <div className="row-container">
            <h3>Merkkaus:</h3>
            <button
              onClick={() => setIsMarkinggOpen(!isMarkingOpen)}
              className="sub-section-button"
            >
            {isMarkingOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isMarkingOpen && <VerbalBarChart/>}
          <div className="row-container">
            <h3>Sieppaus:</h3>
            <button
              onClick={() => setIsInterceptionsOpen(!isInterceptionsOpen)}
              className="sub-section-button"
            >
            {isInterceptionsOpen ? "↑" : "↓"}
            </button>
          </div>
          {isInterceptionsOpen && <VerbalBarChart/>}
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
              <h3>Zidane valetemppu:</h3>
              <button
                onClick={() => setIsZidaneOpen(!isZidaneOpen)}
                className="sub-section-button"
              >
             {isZidaneOpen ? "↑" : "↓"}
            </button>
           </div>
          {isZidaneOpen && <VerbalBarChart/>}
          <div className="row-container">
            <h3>Askelharhautus:</h3>
            <button
              onClick={() => setIsStepoversOpen(!isStepoversOpen)}
              className="sub-section-button"
            >
              {isStepoversOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isStepoversOpen && <VerbalBarChart/>}
          <div className="row-container">
            <h3>Elastico-temppu:</h3>
            <button
              onClick={() => setIsElasticoOpen(!isElasticoOpen)}
              className="sub-section-button"
            >
              {isElasticoOpen ? "↑" : "↓"}
            </button>
            </div>
          {isElasticoOpen && <VerbalBarChart/>}
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
            <h3>Juoksunopeus:</h3>
            <button
             onClick={() => setIsSprintOpen(!isSprintOpen)}
              className="sub-section-button"
            >
            {isSprintOpen ? "↑" : "↓"}
            </button>
          </div>
          {isSprintOpen && <NumericalBarChart/>}
          {isSprintOpen && <VerbalBarChart/>}
          <div className="row-container">
            <h3>Kiihtyvyys:</h3>
            <button
              onClick={() => setIsAccelerationOpen(!isAccelerationOpen)}
              className="sub-section-button"
            >
            {isAccelerationOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isAccelerationOpen && <NumericalBarChart/>}
          {isAccelerationOpen && <VerbalBarChart/>}
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
            <h3>Lyhytsyöttö:</h3>
            <button
              onClick={() => setIsShortPassOpen(!isShortPassOpen)}
              className="sub-section-button"
            >
            {isShortPassOpen ? "↑" : "↓"}
            </button>
          </div>
          {isShortPassOpen && <VerbalBarChart/>}
          <div className="row-container">
            <h3>Pitkäsyöttö:</h3>
            <button
              onClick={() => setIsLongPassOpen(!isLongPassOpen)}
              className="sub-section-button"
            >
            {isLongPassOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isLongPassOpen && <VerbalBarChart/>}
          <div className="row-container">
            <h3>Keskitys:</h3>
            <button
              onClick={() => setIsCrossingOpen(!isCrossingOpen)}
              className="sub-section-button"
            >
            {isCrossingOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isCrossingOpen && <VerbalBarChart/>}
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
          {isStrengthOpen && <VerbalBarChart/>}
          <div className="row-container">
            <h3>Kestävyys:</h3>
            <button
              onClick={() => setIsStaminaOpen(!isStaminaOpen)}
              className="sub-section-button"
            >
            {isStaminaOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isStaminaOpen && <VerbalBarChart/>}
          <div className="row-container">
            <h3>Ponnistuskyky:</h3>
            <button
              onClick={() => setIsJumpingOpen(!isJumpingOpen)}
              className="sub-section-button"
            >
            {isJumpingOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isJumpingOpen && <VerbalBarChart/>}
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
            <h3>Laukauksen nopeus (tutka):</h3>
            <button
              onClick={() => setIsShotSpeedOpen(!isShotSpeedOpen)}
              className="sub-section-button"
            >
            {isShotSpeedOpen ? "↑" : "↓"}
            </button>
          </div>
          {isShotSpeedOpen && <NumericalBarChart/>}
          {isShotSpeedOpen && <VerbalBarChart/>}
          <div className="row-container">
            <h3>Kaukolaukaus:</h3>
            <button
              onClick={() => setIsLongShotsOpen(!isLongShotsOpen)}
              className="sub-section-button"
            >
            {isLongShotsOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isLongShotsOpen && <VerbalBarChart/>}
          <div className="row-container">
            <h3>Vapaapotku tarkkuus:</h3>
            <button
              onClick={() => setIsFreeKickOpen(!isFreeKickOpen)}
              className="sub-section-button"
            >
            {isFreeKickOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isFreeKickOpen && <VerbalBarChart/>}
        </div>
      )}
    </div>
  );
};

export default StatsView;
