import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Rectangle, ResponsiveContainer} from "recharts";
import "./verbalBarChart.css";

const skillLevels = [
  "Aloitin vasta",
  "Osaan jo hieman",
  "Osaan",
  "Osaan jo hyvin",
  "Mestari",
];

const data = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  skillLevel: Math.floor(Math.random() * skillLevels.length),
}));

const calculateMedian = (data) => {
  const sorted = [...data].map((d) => d.skillLevel).sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
};

const calculateAverage = (data) => {
  const sum = data.reduce((acc, d) => acc + d.skillLevel, 0);
  return Math.round(sum / data.length);
};

const medianSkill = skillLevels[calculateMedian(data)];
const averageSkill = skillLevels[calculateAverage(data)];

const VerbalBarChart = () => {
  return (
      <div className="chart-display">
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
              tickCount={31}
              label={{ value: "Päivät", position: "insideBottom", offset: -20 }}
            />
            <YAxis
              type="number"
              domain={[0, skillLevels.length - 1]}
              tickFormatter={(index) => skillLevels[index]}
            />
            <Tooltip formatter={(value) => [skillLevels[value], "Taitotaso"]} />
            <Bar
              dataKey="skillLevel"
              fill="gray"
              activeBar={<Rectangle fill="green" stroke="black" />}
            />
          </BarChart>
        </ResponsiveContainer>
      <div className="stats-box">
        <h3>Kuukauden keskiarvo:</h3>
        <h4>{medianSkill}</h4>
        <h3>Kaikkien keskiarvo:</h3>
        <h4>{averageSkill}</h4>
      </div>
    </div>
  );
};

export default VerbalBarChart;