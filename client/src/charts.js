import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Rectangle, ResponsiveContainer } from "recharts";
import trainingService from "./services/trainings";

const SimpleBarChart = ({ userData }) => {
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
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(today.getDate() - 14);

    const arrayTrainings = flattenTrainings(trainings);

    const filteredData = arrayTrainings
      .filter((training) => {
        const trainingDate = new Date(training.timestamp); 
        return trainingDate >= fourteenDaysAgo && trainingDate <= today;
      })
      .reduce((acc, training) => {
        const dateKey = training.timestamp.split(" ")[0]; // Extract YYYY-MM-DD
        const hours = Math.floor(training.duration / 60);  // Full hours
        const minutes = training.duration % 60;  // Remaining minutes

        if (acc[dateKey]) {
          acc[dateKey].hours += hours; // Add the hours for each day
          acc[dateKey].minutes += minutes; // Add the minutes for each day
        } else {
          acc[dateKey] = { hours, minutes }; // Initialize the first time for this date
        }

        return acc;
      }, {});

    return Object.entries(filteredData).map(([day, { hours, minutes }]) => {
      // Convert total minutes to hours and minutes
      const totalHours = hours + Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;

      return {
        day,
        time: `${totalHours}h ${remainingMinutes}m`, // Display time as hours and minutes
        hours: totalHours + remainingMinutes / 60, // Total hours for the chart
        formattedTime: `${totalHours}h ${remainingMinutes}m` // Formatted time string
      };
    });
  };
  
  const data = processData(trainingData);

  return (
    <div className="chart">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
        >
          <XAxis dataKey="day" label={{ value: "Päivät", position: "insideBottom", offset: -10 }} />
          <YAxis label={{ value: "Tunnit", angle: -90, position: "insideLeft" }} />
          <Tooltip formatter={(value, name, props) => [props.payload.formattedTime, "Treenattu aika"]} />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4CAF50" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#2E7D32" stopOpacity={0.8} /> 
            </linearGradient>
          </defs>   
          <Bar 
            dataKey="hours" 
            fill="url(#barGradient)"
            radius={[5, 5, 0, 0]}
            barSize={50}
            label={{ position: 'top', formatter: (value) => `${Math.floor(value)}h ${Math.round((value % 1) * 60)}m` }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;