import React, { useState, useContext } from "react";
import { DashboardContext } from "../dashboard-main/DashboardContext";

const EditSection = () => {
  const { addIncome, addExpand } = useContext(DashboardContext);
  const [type, setType] = useState("income");
  const [month, setMonth] = useState("Jan");
  const [amount, setAmount] = useState("");

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "income") {
      addIncome(month, parseFloat(amount));
    } else {
      addExpand(month, parseFloat(amount));
    }
    setAmount(""); 
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit Income & Expenses</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="income">Income</option>
            <option value="expand">Expense</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Month</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            placeholder="Enter amount"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditSection;
