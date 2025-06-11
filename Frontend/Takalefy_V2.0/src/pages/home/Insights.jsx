// src/pages/Insights.tsx
import WeeklyTransactionChart  from '../../components/insights/WeeklyTransactionChart';
import MonthlyIncomeChart      from '../../components/insights/MonthlyIncomeChart';
import MonthlyComparisonChart  from '../../components/insights/MonthlyComparisonChart';
import useTransactions         from '../../components/hook/useTransactions';

const Insights = () => {
  const { transactions, loading, error } = useTransactions();

  // توحيد الصيغة للحقول المطلوبة في الرسوم
  const transformed = (transactions || []).map(tx => ({
    id:          tx.id || tx.transaction_id,
    category:    tx.category || tx.type,
    amount:      parseFloat(tx.amount),
    type:        tx.type, // 'income' أو 'expense'
    icon:        '💰',
    date:        tx.date || tx.occurred_at || tx.created_at,
    description: tx.description,
  }));

  if (loading) return <div>Loading insights...</div>;
  if (error)   return <div>Error: {error.message}</div>;
  if (!transformed.length) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-2xl font-semibold">No Transaction Data</h2>
          <p>Add some transactions to see insights.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      {/* أسبوعي: دخل ومصروف */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Weekly Transactions</h2>
        <WeeklyTransactionChart transactions={transformed} />
      </div>

      {/* شهري: منحنى الدخل */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Monthly Income – {new Date().getFullYear()}
        </h2>
        <MonthlyIncomeChart transactions={transformed} />
      </div>

      {/* مقارنة شهرياً: دخل مقابل مصروف */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Monthly Income vs Expenses
        </h2>
        <MonthlyComparisonChart transactions={transformed} />
      </div>
    </div>
  );
};

export default Insights;
