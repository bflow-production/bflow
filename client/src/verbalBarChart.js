import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Rectangle, ResponsiveContainer} from "recharts";

const skillLevels = [
  "Aloitin vasta", 
  "Osaan jo hieman", 
  "Osaan", 
  "Osaan jo hyvin", 
  "Mestari"
];

const data = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  skillLevel: Math.floor(Math.random() * skillLevels.length)
}));

const VerbalBarChart = () => {
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
              tickCount={31} 
              label={{ value: "Päivät", position: "insideBottom", offset: -10 }} 
            />
            <YAxis 
              type="number"
              domain={[0, skillLevels.length - 1]}
              tickFormatter={(index) => skillLevels[index]}
              //label={{ value: "Taitotaso", angle: -90, position: "insideLeft" }} 
            />
            <Tooltip 
              formatter={(value) => [skillLevels[value], "Taitotaso"]} 
            />
            <Bar dataKey="skillLevel" fill="gray" activeBar={<Rectangle fill="green" stroke="black" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
};

export default VerbalBarChart;