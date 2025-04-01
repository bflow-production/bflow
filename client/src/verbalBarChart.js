import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";
import "./verbalBarChart.css";
import trainingService from "./services/trainings";

const ratingToVerbal = {
  "1": "Aloitin vasta",
  "2": "Osaan jo hieman",
  "3": "Osaan",
  "4": "Osaan jo hyvin",
  "5": "Mestari"
};

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
      exercises.map((exercise) => ({
        ...exercise, // Spread existing properties
        category, // Add category name
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
        return (
          trainingDate >= thirtyDaysAgo &&
          trainingDate <= today &&
          training.exercise === exercise // Filter by exercise name
        );
      })
      .map((training) => ({
        day: training.timestamp.split(" ")[0], // Extract YYYY-MM-DD
        skillLevel: training.rating,
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
            domain={[1, 5]}
            tickFormatter={(index) => ratingToVerbal[index]}
          />
          <Tooltip formatter={(value) => [ratingToVerbal[value], "Taitotaso"]} />
          <defs>
            <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8f46e5" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <Bar
            dataKey="skillLevel"
            fill="url(#barColor)"
            radius={[5, 5, 0, 0]}
            barSize={50}
            label={{ position: "top", formatter: (value) => ratingToVerbal[value] }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VerbalBarChart;