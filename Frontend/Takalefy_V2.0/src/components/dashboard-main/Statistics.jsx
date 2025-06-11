import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import useIncome from "../hook/useIncom"; 

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Statistics = () => {
  const { userTransactions } = useIncome();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  
  const processTransactionData = () => {
    if (!userTransactions || userTransactions.length === 0) {
      return {};
    }

    const monthlyData = {};

    userTransactions.forEach((transaction) => {
      const amount = parseFloat(transaction.amount);
      if (isNaN(amount)) return; 

      const date = new Date(transaction.occurred_at);
      if (isNaN(date)) return;

     
      const monthYear = date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });

      
      const dayOfMonth = date.getDate();
      const weekNumber = Math.ceil(dayOfMonth / 7) - 1; 

      if (!monthlyData[monthYear]) {
       
        monthlyData[monthYear] = {
          income: [0, 0, 0, 0, 0],
          expense: [0, 0, 0, 0, 0],
        };
      }

      if (weekNumber >= 0 && weekNumber < 5) {
        monthlyData[monthYear][transaction.type][weekNumber] += amount;
      }
    });

    return monthlyData;
  };

  const monthlyData = processTransactionData();
  const months = Object.keys(monthlyData);

  
  useEffect(() => {
    if (months.length > 0) {
      setCurrentMonthIndex(months.length - 1); 
    }
  }, [months.length]);


  const currentMonth = months.length > 0 ? months[currentMonthIndex] : "No Data";
  const weekData = months.length > 0 ? monthlyData[currentMonth] : { income: [], expense: [] };

  const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

  const data = {
    labels: weekLabels,
    datasets: [
      {
        label: "Income",
        data: weekData.income,
        backgroundColor: "#28A745", // أخضر
        borderRadius: 5,
        barThickness: 20,
      },
      {
        label: "Expense",
        data: weekData.expense,
        backgroundColor: "#FF5733", // أحمر
        borderRadius: 5,
        barThickness: 20,
      },
    ],
  };

  const maxY = Math.max(...weekData.income, ...weekData.expense, 1000);
  const stepSize = Math.ceil(maxY / 5);

  const options = {
    responsive: true,
    indexAxis: "x",
    plugins: {
      legend: { display: true },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const value = context.parsed.y || 0;
            return `${label}: $${value.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: { stacked: false, grid: { display: false } },
      y: {
        stacked: false,
        beginAtZero: true,
        ticks: {
          stepSize,
          callback: function (value) {
            return "$" + value.toLocaleString();
          },
        },
      },
    },
  };

  const handlePrev = () => {
    if (currentMonthIndex > 0) {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentMonthIndex < months.length - 1) {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  if (months.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Statistics</h3>
            <p className="text-gray-500">No transaction data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Statistics</h3>
          <p className="text-sm text-gray-500">Weekly Data for {currentMonth}</p>
          <p className="text-xs text-gray-400">
            Total: ${(weekData.income.reduce((sum, w) => sum + w, 0) - weekData.expense.reduce((sum, w) => sum + w, 0)).toFixed(2)}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
            disabled={currentMonthIndex === 0}
          >
            &lt;
          </button>
          <span className="text-sm text-gray-600">
            {currentMonthIndex + 1} / {months.length}
          </span>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
            disabled={currentMonthIndex === months.length - 1}
          >
            &gt;
          </button>
        </div>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Statistics;
