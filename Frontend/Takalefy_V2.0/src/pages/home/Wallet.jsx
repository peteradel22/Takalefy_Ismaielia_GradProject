import { useNavigate } from "react-router-dom";
import BalanceHeader from "../../components/wallet/BalanceHeader";
import BalanceAnalysis from "../../components/wallet/BalanceAnalysis";
import TransactionList from "../../components/transactions/TransactionList";
import { useState } from "react";

const Wallet = () => {
  const navigate = useNavigate();
  const [transactions] = useState([
    { id: 1, category: "Income Salary", amount: 30000, type: "income", icon: "💼" },
    {
      id: 2,
      category: "Housing & Food",
      amount: -2225,
      type: "expense",
      icon: "🏠",
      subcategories: [
        { name: "Mortgage/Rent", amount: 250 },
        { name: "Water", amount: 50 },
        { name: "Natural Gas", amount: 150 },
        { name: "Electricity", amount: 550 },
      ],
    },
    { id: 3, category: "Transportation", amount: -1200, type: "expense", icon: "🚗" },
    { id: 4, category: "Health & Insurance", amount: -5000, type: "expense", icon: "❤️" },
  ]);

  const [isPremiumUser] = useState(false);

  return (
    <div className="p-6 space-y-6 relative">
      {!isPremiumUser && (
        <div className="absolute inset-0 z-40 bg-white/60 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center space-y-4 bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
            <div className="text-4xl font-bold flex items-center gap-2 text-gray-800">
              <span>Premium</span>
              <span>🔒</span>
            </div>
            <p className="text-lg text-gray-600">
              This page is available for premium users only.
            </p>

          </div>
        </div>
      )}

      <BalanceHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <BalanceAnalysis />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <TransactionList transactions={transactions} />
        </div>
        <div className="space-y-6"></div>
      </div>
    </div>
  );
};

export default Wallet;

