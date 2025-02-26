import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

const data = [
  {
    name: "Harjoitus 1",
    skillLevel: 2400,
    amt: 6000,
  },
  {
    name: "Harjoitus 2",
    skillLevel: 2400,
    amt: 3000,
  },
  {
    name: "Harjoitus 3",
    skillLevel: 2400,
    amt: 2400,
  },
  {
    name: "Harjoitus 4",
    skillLevel: 2400,
    amt: 1000,
  },

];

const SimpleLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="skillLevel" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>

  );
};

export default SimpleLineChart;