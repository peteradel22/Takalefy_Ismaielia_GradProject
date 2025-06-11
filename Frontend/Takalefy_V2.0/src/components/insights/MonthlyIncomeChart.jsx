// src/components/insights/MonthlyIncomeChart.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from 'date-fns';

const MonthlyIncomeChart = ({ transactions }) => {
  if (!Array.isArray(transactions)) {
    return <div className="text-red-500">No transaction data available for income chart.</div>;
  }

  const currentYear = new Date().getFullYear();
  const months = Array.from({ length: 12 }, (_, i) => i);

  const monthlyData = months.map((monthIndex) => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .filter(t => new Date(t.date).getFullYear() === currentYear)
      .filter(t => new Date(t.date).getMonth() === monthIndex)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      name: format(new Date(currentYear, monthIndex, 1), 'MMM'),
      Income: totalIncome,
    };
  });

  const maxIncome = Math.max(...monthlyData.map(d => d.Income), 0);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4">Monthly Income – {currentYear}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, maxIncome]} />
          <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Income']} />
          <Bar dataKey="Income" fill="#4ade80" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyIncomeChart;