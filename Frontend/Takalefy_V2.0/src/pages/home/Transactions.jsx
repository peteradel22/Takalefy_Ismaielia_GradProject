import { useState, useEffect, useCallback } from "react";
import TransactionList from "../../components/transactions/TransactionList";
import AddTransaction from "../../components/transactions/AddTransaction";
import EditTransaction from "../../components/transactions/EditTransaction";
import { useUserId } from "../../context/UserProvider";
const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useUserId();
  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.takalefy.hs.vc/transactions");

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      const allTransactions = await response.json();
      const userTransactions = allTransactions.filter(
        (transaction) => transaction.user_id === userId
      );

      setTransactions(userTransactions);
      setError(null);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchTransactions();
  }, [userId, fetchTransactions]);

  const addTransaction = async (newTransaction) => {
    try {
      const transactionData = {
        user_id: Number(userId),
        category_id: newTransaction.category_id || 1,
        amount: parseFloat(newTransaction.amount),
        type: newTransaction.type,
        occurred_at: newTransaction.occurred_at || new Date().toISOString(),
        description:
          newTransaction.description || `Transaction: ${newTransaction.type}`,
      };

      const response = await fetch("https://api.takalefy.hs.vc/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error("Failed to create transaction");
      }

      const createdTransaction = await response.json();

      // Add the new transaction to the local state
      setTransactions((prev) => [...prev, createdTransaction]);
    } catch (err) {
      console.error("Error adding transaction:", err);
      setError("Failed to add transaction");
    }
  };
  const updateTransaction = async (id, updatedTransaction) => {
    try {
      const response = await fetch(
        `https://api.takalefy.hs.vc/transactions/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTransaction),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update transaction");
      }

      await fetchTransactions();

      setEditingTransaction(null);
    } catch (err) {
      console.error("Error updating transaction:", err);
      setError("Failed to update transaction");
    }
  };
  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchTransactions}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {editingTransaction ? "Edit Transaction" : "Add New Transaction"}
        </h2>

        {editingTransaction ? (
          <EditTransaction
            transaction={editingTransaction}
            updateTransaction={updateTransaction}
            onCancel={() => setEditingTransaction(null)}
          />
        ) : (
          <AddTransaction addTransaction={addTransaction} />
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Your Transactions</h2>
          <button
            onClick={fetchTransactions}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 text-sm"
          >
            Refresh
          </button>
        </div>

        <TransactionList
          transactions={transactions}
          onEdit={setEditingTransaction}
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Learn to Budget
        </h2>

        <div className="aspect-w-16 aspect-h-9 mb-6">
          <iframe
            className="w-full h-64 rounded-lg"
            src="https://www.youtube.com/embed/-vVp185Sq24"
            title="Learn to Budget"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
  "https://www.youtube.com/embed/1sTul6iaNbU",
  "https://www.youtube.com/embed/IfpAjsytwy0",
  "https://www.youtube.com/embed/t339IWEIRNs",
  "https://www.youtube.com/embed/T_776Cwvejs",
  "https://www.youtube.com/embed/7eKNHTBDIEc",
  "https://www.youtube.com/embed/-vVp185Sq24",
   "https://www.youtube.com/embed/JD6FK03jNTU",
  "https://www.youtube.com/embed/NEzqHbtGa9U",
  "https://www.youtube.com/embed/7ZfxVv4FC5o",
  "https://www.youtube.com/embed/xfPbT7HPkKA"
          ].map((url, index) => (
            <div key={index} className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-48 rounded-lg"
                src={url}
                title={`Related Video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
