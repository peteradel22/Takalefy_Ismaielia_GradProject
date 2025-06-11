import { createContext, useState } from "react";

export const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expandsData, setExpandsData] = useState([]);

  const totalBalance = transactions.reduce((acc, txn) => acc + Number(txn.amount), 0);

  const addTransaction = (transaction) => {
    setTransactions((prev) => {
      // تأكد ما تضيفش تكرار لو موجود
      if (prev.find((t) => t.id === transaction.id)) return prev;
      return [...prev, transaction];
    });
  };

  const addIncome = (month, amount) => {
    setIncomeData((prev) => {
      const existing = prev.find((item) => item.month === month);
      if (existing) {
        return prev.map((item) =>
          item.month === month ? { ...item, amount: item.amount + amount } : item
        );
      }
      return [...prev, { month, amount }];
    });
  };

  const addExpand = (month, amount) => {
    setExpandsData((prev) => {
      const existing = prev.find((item) => item.month === month);
      if (existing) {
        return prev.map((item) =>
          item.month === month ? { ...item, amount: item.amount + amount } : item
        );
      }
      return [...prev, { month, amount }];
    });
  };

  return (
    <DashboardContext.Provider
      value={{
        transactions,
        addTransaction,
        totalBalance,
        incomeData,
        expandsData,
        addIncome,
        addExpand,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
