import React, { useContext } from "react";
import { DashboardContext } from "../dashboard-main/DashboardContext";

const Income = () => {
  const { incomeData } = useContext(DashboardContext);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Income</h2>
      <ul>
        {incomeData.length > 0 ? (
          incomeData.map((income, index) => (
            <li key={index} className="flex justify-between p-2 border-b">
              <span>{income.month}</span>
              <span>{income.amount} $</span>
            </li>
          ))
        ) : (
          <p>No income data available.</p>
        )}
      </ul>
    </div>
  );
};

export default Income;
