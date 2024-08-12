import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip
);

const DailySpendingChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.day),
    datasets: [
      {
        label: "Category A",
        data: data.map((item) => item.categoryA),
        fill: true,
        backgroundColor: "rgba(255, 101, 132, 0.2)",
        borderColor: "rgba(255, 101, 132, 1)",
        pointBackgroundColor: "rgba(255, 101, 132, 1)",
        tension: 0.4,
      },
      {
        label: "Category B",
        data: data.map((item) => item.categoryB),
        fill: true,
        backgroundColor: "rgba(72, 61, 139, 0.2)",
        borderColor: "rgba(72, 61, 139, 1)",
        pointBackgroundColor: "rgba(72, 61, 139, 1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default DailySpendingChart;
