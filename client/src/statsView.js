import React, {useState} from "react";
import SimpleBarChart from "./chart";
import "./statsView.css";

const StatsView = () => {
  const [isDefenceOpen, setIsDefenceOpen] = useState(false);
  const [isShootingOpen, setIsShootingOpen] = useState(false);
  const [isSpeedOpen, setIsSpeedOpen] = useState(false);

  return (
    <div className="stats-view">
      <h1>Statistics</h1>
      <h2 className="trainingTitle">Defence</h2>
      <div className="dropdown-container">
        <button
          onClick={() => setIsDefenceOpen(!isDefenceOpen)}
          className="dropdown-button"
        >
          {isDefenceOpen ? 'Close Stats' : 'Open Stats'}
        </button>

        {isDefenceOpen && (
          <div className="dropdown-content">
            <SimpleBarChart></SimpleBarChart>
          </div>
        )}
      </div>

      <h2 className="trainingTitle">Shooting</h2>
      <div className="dropdown-container">
        <button
          onClick={() => setIsShootingOpen(!isShootingOpen)}
          className="dropdown-button"
        >
          {isShootingOpen ? 'Close Stats' : 'Open Stats'}
        </button>
        {isShootingOpen && (
          <div className="dropdown-content">
            <SimpleBarChart></SimpleBarChart>
          </div>
        )}
      </div>

      <h2 className="trainingTitle">Speed</h2>
      <div className="dropdown-container">
        <button
          onClick={() => setIsSpeedOpen(!isSpeedOpen)}
          className="dropdown-button"
        >
          {isSpeedOpen ? 'Close Stats' : 'Open Stats'}
        </button>
        {isSpeedOpen && (
          <div className="dropdown-content">
            <SimpleBarChart></SimpleBarChart>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsView;
