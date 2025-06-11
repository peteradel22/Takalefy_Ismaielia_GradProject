import  { useContext } from "react";
import { DashboardContext } from "./DashboardContext";

const TransactionList = () => {
  const { transactions } = useContext(DashboardContext);

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Transaction</h3>
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-4 border-b last:border-none"
          >
            <div>
              <p className="text-gray-700 font-medium">{transaction.name}</p>
              <p className="text-gray-500 text-sm">{transaction.category}</p>
            </div>
            <p
              className={`font-semibold ${
                transaction.amount > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {transaction.amount > 0 ? `+$${transaction.amount}` : `-$${Math.abs(transaction.amount)}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
