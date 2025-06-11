import { useState } from "react";

const icons = ["🏠", "🍔", "🚗", "💡", "🛍️", "📚", "❤️", "🎉", "💼"];

const EditTransaction = ({ transaction, updateTransaction, onCancel }) => {
  const [editedTransaction, setEditedTransaction] = useState({
    type: transaction.type || "",
    amount: Math.abs(parseFloat(transaction.amount) || 0),
    description: transaction.description || "",
    occurred_at: transaction.occurred_at
      ? transaction.occurred_at.split("T")[0]
      : "",
    icon: transaction.icon || icons[0],
    transactionType: parseFloat(transaction.amount) >= 0 ? "income" : "expense",
  });
  const handleSave = async () => {
    // Prepare data matching your API structure
    const updatedData = {
      category_id: +transaction.category_id || 1,
      amount:
        editedTransaction.transactionType === "expense"
          ? -Math.abs(parseFloat(editedTransaction.amount))
          : Math.abs(parseFloat(editedTransaction.amount)),
      type: editedTransaction.type,
      occurred_at: new Date(editedTransaction.occurred_at).toISOString(),
      description: editedTransaction.description,
    };

    // Use the correct ID field from your API response
    const transactionId = transaction.transaction_id || transaction.id;
    updateTransaction(Number(transactionId), updatedData);
    console.log(transactionId, "transactionId");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-gray-700">Transaction Type</label>
          <select
            value={editedTransaction.transactionType}
            onChange={(e) =>
              setEditedTransaction({
                ...editedTransaction,
                transactionType: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Category/Type</label>
          <input
            type="text"
            value={editedTransaction.type}
            onChange={(e) =>
              setEditedTransaction({
                ...editedTransaction,
                type: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            value={editedTransaction.amount}
            onChange={(e) =>
              setEditedTransaction({
                ...editedTransaction,
                amount: parseFloat(e.target.value),
              })
            }
            className="w-full p-2 border rounded"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            value={editedTransaction.description}
            onChange={(e) =>
              setEditedTransaction({
                ...editedTransaction,
                description: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            value={editedTransaction.occurred_at}
            onChange={(e) =>
              setEditedTransaction({
                ...editedTransaction,
                occurred_at: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Icon</label>
          <select
            value={editedTransaction.icon}
            onChange={(e) =>
              setEditedTransaction({
                ...editedTransaction,
                icon: e.target.value,
              })
            }
            className="w-full p-2 border rounded"
          >
            {icons.map((icon, i) => (
              <option key={i} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600 transition-colors"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white p-2 rounded w-full hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTransaction;
