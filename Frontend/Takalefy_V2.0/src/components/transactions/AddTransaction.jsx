/* eslint-disable react/prop-types */
import { useState } from "react";
const icons = ["💰", "🍔", "🚗", "🏠", "✈️", "📚", "💊", "🎬"];

const AddTransaction = ({ addTransaction }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [icon, setIcon] = useState(icons[0]);
  const [transactionType, setTransactionType] = useState("expense");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !amount || !date) {
      alert("Please fill in all required fields");
      return;
    }

    addTransaction({
      category_id: 1,
      amount: Math.abs(parseFloat(amount)), 
      type: transactionType, 
      created_at: new Date(date).toISOString(),
      occurred_at: new Date(date).toISOString(),
      description: `${transactionType === "expense" ? "Expense" : "Income"} for ${category}`,
      category_name: category,
      icon,
    });

    setCategory("");
    setAmount("");
    setDate("");
    setIcon(icons[0]);
    setTransactionType("expense");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Transaction Type</label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Food, Transportation, Salary..."
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 border rounded"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Icon</label>
          <select
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {icons.map((iconOption, index) => (
              <option key={index} value={iconOption}>
                {iconOption}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
