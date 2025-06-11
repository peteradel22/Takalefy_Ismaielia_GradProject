import React, { useContext } from "react";
import { DashboardContext } from "../dashboard-main/DashboardContext";
import { Bar } from "react-chartjs-2";

const BalanceAnalysis = () => {
  const { incomeData, expandsData } = useContext(DashboardContext);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const incomeAmounts = months.map(month => {
    const entry = incomeData.find(data => data.month === month);
    return entry ? entry.amount : 0;
  });

  const expandAmounts = months.map(month => {
    const entry = expandsData.find(data => data.month === month);
    return entry ? entry.amount : 0;
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: incomeAmounts,
        backgroundColor: "#00CFFF",
      },
      {
        label: "Outcome",
        data: expandAmounts,
        backgroundColor: "#002B7F",
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Income vs Outcome',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Balance Analysis</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BalanceAnalysis;
