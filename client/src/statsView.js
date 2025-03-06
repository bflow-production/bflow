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
      <h1>Statistics</h1>
      <TotalBarChart/>

      <div className="dropdown-box">
        <h2 className="trainingTitle">Defending</h2>
        <button onClick={toggleDefending} className="section-button"> 
            {isDefendingOpen ? "↑" : "↓"}
        </button>
      </div>

      {isDefendingOpen && (
        <div className="dropdown-container">
          <h3>Tackling:</h3>
          <button
            onClick={() => setIsTacklingOpen(!isTacklingOpen)}
            className="sub-section-button"
          >
            {isTacklingOpen ? "Close Stats" : "Open Stats"}
          </button>
          {isTacklingOpen && <VerbalBarChart/>}
          <h3>Marking:</h3>
          <button
            onClick={() => setIsMarkinggOpen(!isMarkingOpen)}
            className="sub-section-button"
          >
            {isMarkingOpen  ? "Close Stats" : "Open Stats"}
          </button>
          {isMarkingOpen && <VerbalBarChart/>}
          <h3>Interceptions:</h3>
          <button
            onClick={() => setIsInterceptionsOpen(!isInterceptionsOpen)}
            className="sub-section-button"
          >
            {isInterceptionsOpen ? "Close Stats" : "Open Stats"}
          </button>
          {isInterceptionsOpen && <VerbalBarChart/>}
        </div>
      )}

      <div className="dropdown-box">
        <h2 className="trainingTitle">Dribbling</h2>
        <button onClick={toggleDribbling} className="section-button"> 
            {isDribblingOpen ? "CLOSE STATS" : "OPEN STATS"}
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
          {isZidaneOpen && <VerbalBarChart/>}
          <div className="row-container">
            <h3>Stepovers:</h3>
            <button
              onClick={() => setIsStepoversOpen(!isStepoversOpen)}
              className="sub-section-button"
            >
              {isStepoversOpen  ? "↑" : "↓"}
            </button>
          </div>
          {isStepoversOpen && <VerbalBarChart/>}
          <div className="row-container">
            <h3>Elastico:</h3>
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
        <h2 className="trainingTitle">Pace</h2>
        <button onClick={togglePace} className="section-button"> 
            {isDefendingOpen ? "CLOSE STATS" : "OPEN STATS"}
        </button>
      </div>

      {isPaceOpen && (
        <div className="dropdown-container">
          <h3>Sprint Speed:</h3>
          <button
            onClick={() => setIsSprintOpen(!isSprintOpen)}
            className="sub-section-button"
          >
            {isSprintOpen ? "Close Stats" : "Open Stats"}
          </button>
          {isSprintOpen && <NumericalBarChart/>}
          <h3>Acceleration:</h3>
          <button
            onClick={() => setIsAccelerationOpen(!isAccelerationOpen)}
            className="sub-section-button"
          >
            {isAccelerationOpen  ? "Close Stats" : "Open Stats"}
          </button>
          {isAccelerationOpen && <NumericalBarChart/>}
        </div>
      )}

      <div className="dropdown-box">
        <h2 className="trainingTitle">Passing</h2>
        <button onClick={togglePassing} className="section-button"> 
            {isDefendingOpen ? "CLOSE STATS" : "OPEN STATS"}
        </button>
      </div>

      {isPassingOpen && (
        <div className="dropdown-container">
          <h3>Short Passing:</h3>
          <button
            onClick={() => setIsShortPassOpen(!isShortPassOpen)}
            className="sub-section-button"
          >
            {isShortPassOpen ? "Close Stats" : "Open Stats"}
          </button>
          {isShortPassOpen && <VerbalBarChart/>}
          <h3>Long Passing:</h3>
          <button
            onClick={() => setIsLongPassOpen(!isLongPassOpen)}
            className="sub-section-button"
          >
            {isLongPassOpen  ? "Close Stats" : "Open Stats"}
          </button>
          {isLongPassOpen && <VerbalBarChart/>}
          <h3>Crossing:</h3>
          <button
            onClick={() => setIsCrossingOpen(!isCrossingOpen)}
            className="sub-section-button"
          >
            {isCrossingOpen  ? "Close Stats" : "Open Stats"}
          </button>
          {isCrossingOpen && <VerbalBarChart/>}
        </div>
      )}

      <div className="dropdown-box">
        <h2 className="trainingTitle">Physical</h2>
        <button onClick={togglePhysical} className="section-button"> 
            {isDefendingOpen ? "CLOSE STATS" : "OPEN STATS"}
        </button>
      </div>


      {isPhysicalOpen && (
        <div className="dropdown-container">
          <h3>Strength:</h3>
          <button
            onClick={() => setIsStrengthOpen(!isStrengthOpen)}
            className="sub-section-button"
          >
            {isStrengthOpen ? "Close Stats" : "Open Stats"}
          </button>
          {isStrengthOpen && <VerbalBarChart/>}
          <h3>Stamina:</h3>
          <button
            onClick={() => setIsStaminaOpen(!isStaminaOpen)}
            className="sub-section-button"
          >
            {isStaminaOpen  ? "Close Stats" : "Open Stats"}
          </button>
          {isStaminaOpen && <VerbalBarChart/>}
          <h3>Jumping:</h3>
          <button
            onClick={() => setIsJumpingOpen(!isJumpingOpen)}
            className="sub-section-button"
          >
            {isJumpingOpen  ? "Close Stats" : "Open Stats"}
          </button>
          {isJumpingOpen && <VerbalBarChart/>}
        </div>
      )}

      <div className="dropdown-box">
        <h2 className="trainingTitle">Shooting</h2>
        <button onClick={toggleShooting} className="section-button"> 
            {isDefendingOpen ? "CLOSE STATS" : "OPEN STATS"}
        </button>
      </div>

      {isShootingOpen && (
        <div className="dropdown-container">
          <h3>Shot Speed (radar):</h3>
          <button
            onClick={() => setIsShotSpeedOpen(!isShotSpeedOpen)}
            className="sub-section-button"
          >
            {isShotSpeedOpen ? "Close Stats" : "Open Stats"}
          </button>
          {isShotSpeedOpen && <NumericalBarChart/>}
          <h3>Long Shots:</h3>
          <button
            onClick={() => setIsLongShotsOpen(!isLongShotsOpen)}
            className="sub-section-button"
          >
            {isLongShotsOpen  ? "Close Stats" : "Open Stats"}
          </button>
          {isLongShotsOpen && <VerbalBarChart/>}
          <h3>Free Kick Accuracy:</h3>
          <button
            onClick={() => setIsFreeKickOpen(!isFreeKickOpen)}
            className="sub-section-button"
          >
            {isFreeKickOpen  ? "Close Stats" : "Open Stats"}
          </button>
          {isFreeKickOpen && <VerbalBarChart/>}
        </div>
      )}
    </div>
  );
};

export default StatsView;
