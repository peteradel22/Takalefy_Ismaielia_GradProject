import React, { useContext } from 'react';
import { DashboardContext } from '../dashboard-main/DashboardContext';

const TransactionSection = () => {
  const { transactions } = useContext(DashboardContext);

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-bold mb-4">Transaction</h2>
      <div className="space-y-2">
        {transactions.map((transaction, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>{transaction.name}</div>
            <div className={transaction.amount > 0 ? "text-green-500" : "text-red-500"}>
              {transaction.amount > 0 ? `+${transaction.amount}` : `${transaction.amount}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionSection;
