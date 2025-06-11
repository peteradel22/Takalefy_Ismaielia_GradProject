import React, { useContext } from "react";
import { DashboardContext } from "../dashboard-main/DashboardContext";

const Expands = () => {
  const { expandsData } = useContext(DashboardContext);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Expenses</h2>
      <ul>
        {expandsData.length > 0 ? (
          expandsData.map((expand, index) => (
            <li key={index} className="flex justify-between p-2 border-b">
              <span>{expand.month}</span>
              <span>{expand.amount} $</span>
            </li>
          ))
        ) : (
          <p>No expenses data available.</p>
        )}
      </ul>
    </div>
  );
};

export default Expands;
