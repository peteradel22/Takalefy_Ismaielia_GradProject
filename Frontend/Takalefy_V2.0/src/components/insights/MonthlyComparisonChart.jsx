// src/components/insights/MonthlyComparisonChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from 'date-fns';

const MonthlyComparisonChart = ({ transactions }) => {
  if (!Array.isArray(transactions)) {
    return <div className="text-red-500">No transaction data available for comparison chart.</div>;
  }

  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => i);

  const monthlyData = months.map(monthIndex => {
    const monthTxs = transactions.filter(
      t => new Date(t.date).getFullYear() === currentYear && new Date(t.date).getMonth() === monthIndex
    );

    const income = monthTxs
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = monthTxs
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return {
      name: format(new Date(currentYear, monthIndex, 1), 'MMM'),
      Income: income,
      Expense: expense,
    };
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4">Monthly Comparison (Income vs Expense)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value, name) => [`$${value.toFixed(2)}`, name]} />
          <Bar dataKey="Income" fill="#4ade80" radius={[6, 6, 0, 0]} />
          <Bar dataKey="Expense" fill="#f87171" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyComparisonChart;
