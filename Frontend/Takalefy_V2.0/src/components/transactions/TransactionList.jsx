import React, { useState } from "react";
import { format } from "date-fns";
import { FaUtensils, FaShoppingCart, FaMoneyBillWave, FaDollarSign } from "react-icons/fa";

const TransactionList = ({ transactions, onEdit }) => {
  const [expanded, setExpanded] = useState(null);

  const getCategoryIcon = (category, type) => {
    if (type === "income") return <FaDollarSign className="text-green-600" />;
    switch ((category || "").toLowerCase()) {
      case "food":
        return <FaUtensils className="text-red-600" />;
      case "shopping":
        return <FaShoppingCart className="text-red-600" />;
      default:
        return <FaMoneyBillWave className="text-red-600" />;
    }
  };

  const formatAmount = (amount, type) => {
    const sign = type === "income" ? "+" : "-";
    const colorClass = type === "income" ? "text-green-600" : "text-red-600";
    return {
      formatted: `${sign}$${Math.abs(amount).toLocaleString()}`,
      colorClass,
    };
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown date";
    const date = new Date(dateStr);
    return format(date, "dd MMM yyyy");
  };

  const totalAmount = (transactions || []).reduce((sum, tx) => {
    return tx.type === "income"
      ? sum + Number(tx.amount)
      : sum - Number(tx.amount);
  }, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Your Transactions
      </h2>

      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>Total Balance:</span>
        <span
          className={`font-semibold ${
            totalAmount >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          ${Math.abs(totalAmount).toLocaleString()}
        </span>
      </div>

      <ul className="space-y-4">
        {(transactions || []).map((tx, index) => {
          const { formatted, colorClass } = formatAmount(tx.amount, tx.type);
          const isExpanded = expanded === index;

          const displayName = tx.description?.trim() || tx.category || "Uncategorized";

          return (
            <li
              key={tx.id || index}
              className="bg-gray-50 p-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getCategoryIcon(tx.category, tx.type)}</span>
                  <div>
                    <div className="font-medium text-gray-800">{displayName}</div>
                    <div className="text-sm text-gray-500">
                      {formatDate(tx.occurred_at || tx.date || tx.created_at)}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-lg font-semibold ${colorClass}`}>
                    {formatted}
                  </div>
                  <button
                    onClick={() => setExpanded(isExpanded ? null : index)}
                    className="text-xs text-blue-500 hover:underline mt-1"
                  >
                    {isExpanded ? "Hide details" : "Show details"}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 text-sm text-gray-600">
                  <p>
                    <strong>Description:</strong> {tx.description || "No description"}
                  </p>
                  <p>
                    <strong>ID:</strong> {tx.id}
                  </p>
                  <button
                    onClick={() => onEdit && onEdit(tx)}
                    className="mt-2 text-blue-600 hover:underline"
                  >
                    Edit Transaction
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TransactionList;
