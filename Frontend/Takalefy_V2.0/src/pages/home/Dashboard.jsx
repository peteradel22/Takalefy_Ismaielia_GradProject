import React from "react";
import Statistics from "../../components/dashboard-main/Statistics";
import FileManagerList from "./FileManager";
import ContactUs from "../../components/dashboard-main/ContactUs";
import BalanceHeader from "../../components/wallet/BalanceHeader";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useIncome from "../../components/hook/useIncom";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {

  const { userTransactions, userName } = useIncome(); 
  const processTransactionData = () => {
    if (!userTransactions || userTransactions.length === 0) {
      return {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: [],
        }]
      };
    }

    const labels = userTransactions.map(tx => {
      const type = tx.type || "unknown";
      const desc = tx.description || tx.category || "No description";
      return `${type}: ${desc}`;
    });

    const data = userTransactions.map(tx => parseFloat(tx.amount) || 0);

    const colorPalette = [
      "#4caf50", "#f44336", "#2196f3", "#ff9800", "#9c27b0",
    ];
    const backgroundColor = userTransactions.map((_, index) =>
      colorPalette[index % colorPalette.length]
    );

    return {
      labels,
      datasets: [{
        data,
        backgroundColor,
        hoverBackgroundColor: backgroundColor,
      }]
    };
  };

  const pieData = processTransactionData();

  function PieChart() {
    if (pieData.labels.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>No transaction data available</p>
        </div>
      );
    }
    return (
      <Pie 
        data={pieData} 
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  return `${label}: $${value.toFixed(2)}`;
                }
              }
            }
          }
        }}
      />
    );
  }

  return (
    <div className="px-4 py-6 space-y-6 relative sm:px-6 md:px-8 lg:px-12">
      <BalanceHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        <div className="space-y-6 xl:col-span-2">
          <Statistics />
         
          <FileManagerList transactions={userTransactions || []} userName={userName || "User"} />
        </div>

        <div className="space-y-6">
          <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Transactions by Type
              </h3>
              <PieChart />
            </div>
          </div>
          <ContactUs />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
