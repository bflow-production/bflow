import React, {use, useState} from "react";
import SimpleBarChart from "./chart";
import "./statsView.css";
import DefenceBarChart from "./tacklingBarChart";
import NumericalBChart from "./numericalBarChart";

const StatsView = () => {
  const [isTacklingOpen, setIsTacklingOpen] = useState(false);
  const [isMarkingOpen, setIsMarkinggOpen] = useState(false);
  const [isInterceptionsOpen, setIsInterceptionsOpen] = useState(false);

  const [isZidaneOpen, setIsZidaneOpen] = useState(false);
  const [isStepoversOpen, setIsStepoversOpen] = useState(false);
  const [isElasticoOpen, setIsElasticoOpen] = useState(false);

  const [isSprintOpen, setIsSprintOpen] = useState(false);
  const [isAccelerationOpen, setIsAccelerationOpen] = useState(false);




  const [isShotSpeedOpen, setIsShotSpeedOpen] = useState(false);
  const [isLongShotsOpen, setIsLongShotsOpen] = useState(false);
  const [isSpeedOpen, setIsSpeedOpen] = useState(false);


  const [isDefendingOpen, setIsDefendingOpen] = useState(false);
  const [isDribblingOpen, setIsDribblingOpen] = useState(false);
  const [isPaceOpen, setIsPaceOpen] = useState(false);

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

  return (
    <div className="stats-view">
      <h1>Statistics</h1>
      <SimpleBarChart/>

      <h2 className="trainingTitle">Defending</h2>
      <button onClick={toggleDefending} className="section-button"> 
          {isDefendingOpen ? "Close Defending Stats" : "Open Defending Stats"}
      </button>

      {isDefendingOpen && (
        <div className="dropdown-container">
          <h3>Tackling:</h3>
          <button
            onClick={() => setIsTacklingOpen(!isTacklingOpen)}
            className="sub-section-button"
          >
            {isTacklingOpen ? "Close Stats" : "Open Stats"}
          </button>
          {isTacklingOpen && <DefenceBarChart/>}
          <h3>Marking:</h3>
          <button
            onClick={() => setIsMarkinggOpen(!isMarkingOpen)}
            className="sub-section-button"
          >
            {isMarkingOpen  ? "Close Stats" : "Open Stats"}
          </button>
          {isMarkingOpen && <DefenceBarChart/>}
          <h3>Interceptions:</h3>
          <button
            onClick={() => setIsInterceptionsOpen(!isInterceptionsOpen)}
            className="sub-section-button"
          >
            {isInterceptionsOpen ? "Close Stats" : "Open Stats"}
          </button>
          {isInterceptionsOpen && <DefenceBarChart/>}
        </div>
      )}

      <h2 className="trainingTitle">Dribbling</h2>
      <button onClick={toggleDribbling} className="section-button"> 
          {isDribblingOpen ? "Close Defending Stats" : "Open Defending Stats"}
      </button>

      {isDribblingOpen && (
        <div className="dropdown-container">
          <h3>Zidane Fake Pass:</h3>
          <button
            onClick={() => setIsZidaneOpen(!isZidaneOpen)}
            className="sub-section-button"
          >
            {isZidaneOpen ? "Close Stats" : "Open Stats"}
          </button>
          {isZidaneOpen && <DefenceBarChart/>}
          <h3>Stepovers:</h3>
          <button
            onClick={() => setIsStepoversOpen(!isStepoversOpen)}
            className="sub-section-button"
          >
            {isStepoversOpen  ? "Close Stats" : "Open Stats"}
          </button>
          {isStepoversOpen && <DefenceBarChart/>}
          <h3>Elastico:</h3>
          <button
            onClick={() => setIsElasticoOpen(!isElasticoOpen)}
            className="sub-section-button"
          >
            {isElasticoOpen ? "Close Stats" : "Open Stats"}
          </button>
          {isElasticoOpen && <DefenceBarChart/>}
        </div>
      )}

      <h2 className="trainingTitle">Pace</h2>
      <button onClick={togglePace} className="section-button"> 
          {isPaceOpen ? "Close Defending Stats" : "Open Defending Stats"}
      </button>

      {isPaceOpen && (
        <div className="dropdown-container">
          <h3>Sprint Speed:</h3>
          <button
            onClick={() => setIsSprintOpen(!isSprintOpen)}
            className="sub-section-button"
          >
            {isSprintOpen ? "Close Stats" : "Open Stats"}
          </button>
          {isSprintOpen && <NumericalBChart/>}
          <h3>Acceleration:</h3>
          <button
            onClick={() => setIsAccelerationOpen(!isAccelerationOpen)}
            className="sub-section-button"
          >
            {isAccelerationOpen  ? "Close Stats" : "Open Stats"}
          </button>
          {isAccelerationOpen && <NumericalBChart/>}
        </div>
      )}

      







      <h2 className="trainingTitle">Shooting</h2>
      <h3>Shot Speed (radar)</h3>
      <div className="dropdown-container">
        <button
          onClick={() => setIsShotSpeedOpen(!isShotSpeedOpen)}
          className="dropdown-button"
        >
          {isShotSpeedOpen ? 'Close Stats' : 'Open Stats'}
        </button>
        {isShotSpeedOpen && (
          <div className="dropdown-content">
            <NumericalBChart/>
          </div>
        )}
      </div>

      <h3>Long Shots</h3>
      <div className="dropdown-container">
        <button
          onClick={() => setIsLongShotsOpen(!isLongShotsOpen)}
          className="dropdown-button"
        >
          {isLongShotsOpen ? 'Close Stats' : 'Open Stats'}
        </button>
        {isLongShotsOpen && (
          <div className="dropdown-content">
            <SimpleBarChart/>
          </div>
        )}
      </div>

      <h2 className="trainingTitle">TEST</h2>
    </div>
  );
};

export default StatsView;
