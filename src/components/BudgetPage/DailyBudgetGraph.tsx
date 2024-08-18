import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DailyBudgetGraph = ({ dailyBudget }) => {
  const data = {
    labels: dailyBudget.map((item) => item.day), 
    datasets: [
      {
        label: "Daily Budget",
        data: dailyBudget.map((item) => item.amount),
        fill: true,
        backgroundColor: "rgba(208, 83, 139, 0.2)",
        borderColor: "rgba(208, 83, 139, 1)",
        pointBackgroundColor: "rgba(208, 83, 139, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(208, 83, 139, 1)",
        tension: 0.4, 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false, 
        },
        ticks: {
          color: "#333",
        },
      },
      y: {
        grid: {
          color: "#eee", 
        },
        ticks: {
          color: "#333",
          beginAtZero: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false, 
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#d0538b",
        borderWidth: 1,
      },
    },
  };

  return (
    <div className="daily-budget-graph">
      <Line data={data} options={options} />
    </div>
  );
};

export default DailyBudgetGraph;
