import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Rectangle, ResponsiveContainer} from "recharts";

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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="day" 
              label={{ value: "Päivät", position: "insideBottom", offset: -10 }} 
            />
            <YAxis 
              label={{ value: "Tunnit", angle: -90, position: "insideLeft" }} 
            />
            <Tooltip/>
            <Bar dataKey="hours" fill="gray" activeBar={<Rectangle fill="green" stroke="black" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
};

export default TotalBarChart;