
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

const StatsView = () => {

  const data = [
    { day: 1, hours: Math.floor(Math.random() * 20) },
    { day: 2, hours: Math.floor(Math.random() * 20) },
    { day: 3, hours: Math.floor(Math.random() * 20) },
    { day: 4, hours: Math.floor(Math.random() * 20) },
    { day: 5, hours: Math.floor(Math.random() * 20) },
    { day: 6, hours: Math.floor(Math.random() * 20) },
  ];

  return (
    <div className="stats-view">
      <h2>Stats</h2>
      <p>Workouts: 5</p>
      <p>Total Time: 30 hours</p>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="hours" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsView;
