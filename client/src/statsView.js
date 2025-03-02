import React, {useState} from "react";
import SimpleBarChart from "./chart";
import "./statsView.css";
import DefenceBarChart from "./tacklingBarChart";

const StatsView = () => {
  const [isTacklingOpen, setIsTacklingOpen] = useState(false);
  const [isMarkingOpen, setIsMarkinggOpen] = useState(false);
  const [isInterceptionsOpen, setIsInterceptionsOpen] = useState(false);
  const [isShootingOpen, setIsShootingOpen] = useState(false);
  const [isSpeedOpen, setIsSpeedOpen] = useState(false);

  return (
    <div className="stats-view">
      <h1>Statistics</h1>
      <SimpleBarChart></SimpleBarChart>
      <h2 className="trainingTitle">Defence</h2>

      <h3>Tackling:</h3>
      <div className="dropdown-container">
        <button
          onClick={() => setIsTacklingOpen(!isTacklingOpen)}
          className="dropdown-button"
        >
          {isTacklingOpen ? 'Close Stats' : 'Open Stats'}
        </button>

        {isTacklingOpen && (
          <div className="dropdown-content">
            <DefenceBarChart></DefenceBarChart>
          </div>
        )}
      </div>

      <h3>Marking:</h3>
      <div className="dropdown-container">
        <button
          onClick={() => setIsMarkinggOpen(!isMarkingOpen)}
          className="dropdown-button"
        >
          {isMarkingOpen ? 'Close Stats' : 'Open Stats'}
        </button>

        {isMarkingOpen && (
          <div className="dropdown-content">
            <DefenceBarChart></DefenceBarChart>
          </div>
        )}
      </div>

      <h3>Interceptions:</h3>
      <div className="dropdown-container">
        <button
          onClick={() => setIsInterceptionsOpen(!isInterceptionsOpen)}
          className="dropdown-button"
        >
          {isInterceptionsOpen ? 'Close Stats' : 'Open Stats'}
        </button>

        {isInterceptionsOpen && (
          <div className="dropdown-content">
            <DefenceBarChart></DefenceBarChart>
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
