import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Rectangle, ResponsiveContainer} from "recharts";

const data = [
  { day: 1, hours: Math.floor(Math.random() * 20) },
  { day: 2, hours: Math.floor(Math.random() * 20) },
  { day: 3, hours: Math.floor(Math.random() * 20) },
  { day: 4, hours: Math.floor(Math.random() * 20) },
  { day: 5, hours: Math.floor(Math.random() * 20) },
  { day: 6, hours: Math.floor(Math.random() * 20) },
  { day: 7, hours: Math.floor(Math.random() * 20) },
  { day: 8, hours: Math.floor(Math.random() * 20) },
  { day: 9, hours: Math.floor(Math.random() * 20) },
  { day: 10, hours: Math.floor(Math.random() * 20) },
  { day: 11, hours: Math.floor(Math.random() * 20) },
  { day: 12, hours: Math.floor(Math.random() * 20) },
  { day: 13, hours: Math.floor(Math.random() * 20) },
  { day: 14, hours: Math.floor(Math.random() * 20) },
  { day: 15, hours: Math.floor(Math.random() * 20) },
  { day: 16, hours: Math.floor(Math.random() * 20) },
  { day: 17, hours: Math.floor(Math.random() * 20) },
  { day: 18, hours: Math.floor(Math.random() * 20) },
  { day: 19, hours: Math.floor(Math.random() * 20) },
  { day: 20, hours: Math.floor(Math.random() * 20) },
  { day: 21, hours: Math.floor(Math.random() * 20) },
  { day: 22, hours: Math.floor(Math.random() * 20) },
  { day: 23, hours: Math.floor(Math.random() * 20) },
  { day: 24, hours: Math.floor(Math.random() * 20) },
  { day: 25, hours: Math.floor(Math.random() * 20) },
  { day: 26, hours: Math.floor(Math.random() * 20) },
  { day: 27, hours: Math.floor(Math.random() * 20) },
  { day: 28, hours: Math.floor(Math.random() * 20) },
  { day: 29, hours: Math.floor(Math.random() * 20) },
  { day: 30, hours: Math.floor(Math.random() * 20) },
  { day: 31, hours: Math.floor(Math.random() * 20) },
];

const SimpleBarChart = () => {
  return (
      <div className="chart.js">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 30,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" label={{ value: "Päivät", position: "insideBottom", offset: -10 }} />
            <YAxis label={{ value: "Tunnit", angle: -90, position: "insideLeft" }} />
            <Tooltip />
            <Bar dataKey="hours" fill="gray" activeBar={<Rectangle fill="green" stroke="black" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
};

export default SimpleBarChart;