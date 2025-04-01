import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Rectangle, ResponsiveContainer } from "recharts";
import trainingService from "./services/trainings";
import "./numericalBarChart.css";

const NumericalBarChart = ({ userData, exercise }) => {
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
        return (
          trainingDate >= thirtyDaysAgo &&
          trainingDate <= today &&
          training.exercise === exercise // Filter by exercise name
        );
      })
      .map((training) => ({
        day: training.timestamp.split(" ")[0], // Extract YYYY-MM-DD
        result: training.result,
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
                label={{ value: "Päivät", position: "insideBottom", offset: -20 }} 
            />
            <YAxis 
                label={{ value: "Nopeus km/h", angle: -90, position: "insideLeft", offset: -10, dy: 75}} 
                domain={[0, 140]}
            />
          <Tooltip formatter={(value) => [`km/h: ${value}`]}/>
          <defs>
            <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4CAF50" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#2E7D32" stopOpacity={0.8} /> 
            </linearGradient>
          </defs>      
          <Bar 
              dataKey="result" 
              fill="url(#barColor)"
              radius={[5, 5, 0, 0]}
              barSize={50}
              label={{ position: "top", formatter: (value) => `${value} km/h` }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
};

export default NumericalBarChart;