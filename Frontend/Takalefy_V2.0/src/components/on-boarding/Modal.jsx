/* eslint-disable react/prop-types */
import { useState } from "react";
import { fetchData } from "../../api";

const Modal = ({ content, onClose, userId }) => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  if (!content) return null;

  const handleSave = async () => {
    const transaction = {
      user_id: Number(userId),
      category_id: Number(content.id || 1),
      amount: parseFloat(amount),
      type: "expense",
      occurred_at: date ? new Date(date).toISOString() : new Date().toISOString(),
      description: `Spending on ${content.label}`,
    };

    try {
      fetchData("/transactions", { method: "POST", body: transaction });
      setAmount("");
      setDate("");
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">{content.label}</h1>

        {/* Amount Input */}
        <input
          type="number"
          step="0.01"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
        />

        {/* Date Input */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
        />

        <div className="flex justify-end space-x-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

