import { useCallback, useEffect, useState } from "react";
import { useUserId } from "../../context/UserProvider";

export default function useIncome() {
  const { userId } = useUserId();
  const [error, setError] = useState(null);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [userTransactions, setUserTransactions] = useState([]);

  // ✅ addTransaction تستقبل occurred_at من الخارج
  const addTransaction = async ({
    amount,
    description = "Unnamed Income",
    occurred_at,
  }) => {
    if (!amount || isNaN(Number(amount))) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      const transactionData = {
        user_id: Number(userId),
        category_id: 1, // يفترض أنها فئة دخل
        amount: Number(amount),
        type: "income",
        occurred_at: occurred_at || new Date().toISOString(), // ✅ استخدام التاريخ من الفورم أو تاريخ الآن
        description: description.trim(),
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
      setTransactions((prev) => [...prev, createdTransaction]);
      setIncomeTotal((prev) => prev + Number(amount));
    } catch (err) {
      console.error("Error adding transaction:", err);
      setError("Failed to add transaction");
    }
  };

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch("https://api.takalefy.hs.vc/transactions");

      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }

      const allTransactions = await response.json();
      const userTransactions = allTransactions.filter(
        (transaction) => transaction.user_id === userId
      );

      const incomeTransactions = userTransactions.filter(
        (transaction) => transaction.type === "income"
      );

      const total = incomeTransactions
        .map((transaction) => Number(transaction.amount))
        .reduce((total, amount) => total + amount, 0);

      setIncomeTotal(total);
      setUserTransactions(userTransactions);
      setTransactions(incomeTransactions);
      setError(null);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to load transactions");
    }
  }, [userId]);

  useEffect(() => {
    fetchTransactions();
  }, [userId, fetchTransactions]);

  const expenseTransactions = userTransactions.filter(
    (transaction) => transaction.type === "expense"
  );

  return {
    error,
    transactions,
    addTransaction,
    setError,
    setTransactions,
    incomeTotal,
    fetchTransactions,
    userTransactions,
    expenseTransactions,
  };
}

