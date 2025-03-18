import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Rectangle, ResponsiveContainer} from "recharts";
import "./verbalBarChart.css";
import trainingService from "./services/trainings";

const skillLevels = [
  "Aloitin vasta",
  "Osaan jo hieman",
  "Osaan",
  "Osaan jo hyvin",
  "Mestari",
];

const VerbalBarChart = ({ userData, exercise }) => {
  const [trainingData, setTrainingData] = useState([]);

  useEffect(() => {
    trainingService
      .getTraining(userData.userId)
      .then((response) => {
        setTrainingData(response);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, [userData.userId]);

  const flattenTrainings = (trainings) => {
    return Object.entries(trainings).flatMap(([category, exercises]) =>
        exercises.map(exercise => ({
            ...exercise,   // Spread existing properties
            category       // Add category name
        }))
    );
  };

  const processData = (trainings) => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const arrayTrainings = flattenTrainings(trainings);
    const filteredData = arrayTrainings
      .filter((training) => {
        const trainingDate = new Date(training.timestamp); 
        console.log(training.exercise, exercise);
        console.log('VerbalBarChart');
        return (
          trainingDate >= thirtyDaysAgo &&
          trainingDate <= today &&
          training.exercise_name === exercise // Filter by exercise name
        );
      })
      .map((training) => ({
        day: training.timestamp.split(" ")[0], // Extract YYYY-MM-DD
        rating: training.rating,
        category: training.category
      }));

      return filteredData;
  };
  
  const data = processData(trainingData);

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
    </div>
  );
};

export default VerbalBarChart;