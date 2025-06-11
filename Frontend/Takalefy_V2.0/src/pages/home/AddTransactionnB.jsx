import { useState } from "react";
import useIncome from "../../components/hook/useIncom";

const AddTransactionModal = ({ onClose, onTransactionAdded }) => {
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeName, setIncomeName] = useState("");  // حقل جديد للاسم
  const { addTransaction } = useIncome();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!incomeAmount || isNaN(parseFloat(incomeAmount))) {
      alert("Please enter a valid amount.");
      return;
    }

    if (!incomeName.trim()) {
      alert("Please enter a name or description for the income.");
      return;
    }

    await addTransaction({
      amount: parseFloat(incomeAmount),
      description: incomeName.trim(),
    });

    setIncomeAmount("");
    setIncomeName("");  // تصفير اسم الدخل بعد الاضافة

    if (onTransactionAdded) {
      onTransactionAdded(parseFloat(incomeAmount));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Add New Income</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Income name or description"
            className="w-full p-3 border rounded-lg"
            value={incomeName}
            onChange={(e) => setIncomeName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            className="w-full p-3 border rounded-lg"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            + Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
