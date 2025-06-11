import React from 'react';

const TransactionItem = ({ transaction, updateTransaction, deleteTransaction, onEdit }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{transaction.icon}</span>
          <div>
            <span className="text-lg font-medium">{transaction.category}</span>
            <div className={`text-lg font-bold ${transaction.type === 'income' ? 'text-black' : 'text-red-500'}`}>
              {transaction.type === 'expense' ? '-' : ''}${Math.abs(transaction.amount).toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(transaction)}
            className="bg-blue-500 text-white p-2 rounded w-20 hover:bg-blue-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTransaction(transaction.id)}
            className="bg-red-500 text-white p-2 rounded w-20 hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;