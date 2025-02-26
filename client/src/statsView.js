import React from "react";
import SimpleBarChart from "./chart";
import SimpleLineChart from "./LineChart";

const StatsView = () => {
  return (
    <div className="stats-view">
      <h2>Stats</h2>
      <p>Workouts: 5</p>
      <p>Total Time: 20 hours</p>
      <SimpleBarChart></SimpleBarChart>
      <p>Test</p>
      <SimpleLineChart></SimpleLineChart>
      <p>Test</p>
    </div>
  );
};

export default StatsView;
