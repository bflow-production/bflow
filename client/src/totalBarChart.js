import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Rectangle, ResponsiveContainer} from "recharts";
import "./totalBarChart.css";

const data = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  hours: Math.floor(Math.random() * 20)
}));

const TotalBarChart = () => {
  return (
      <div className="chart-container">
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
            <XAxis 
              dataKey="day" 
              tickFormatter={(value) => `${value}`}
              label={{ value: "Päivät", position: "insideBottom", offset: -20 }} 
            />
            <YAxis 
              label={{ value: "Tunnit", angle: -90, position: "insideLeft" }} 
            />
            <Tooltip 
              formatter={(value) => [`Tunnit: ${value}`]}
            />
            <Bar dataKey="hours" fill="gray" activeBar={<Rectangle fill="green" stroke="black" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
};

export default TotalBarChart;