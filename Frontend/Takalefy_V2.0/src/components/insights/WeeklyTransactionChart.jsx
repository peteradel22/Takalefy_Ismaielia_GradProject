import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, isWithinInterval } from "date-fns";

const WeeklyTransactionChart = ({ transactions }) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const start = startOfWeek(currentWeek, { weekStartsOn: 6 });
  const end = endOfWeek(currentWeek, { weekStartsOn: 6 });

 
  const filtered = (transactions || []).filter((t) => {
    const date = new Date(t.date);
    return isWithinInterval(date, { start, end });
  });

  const dailyData = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    const formatted = format(day, "EEE");

    const income = filtered
      .filter((t) => t.type === 'income' && format(new Date(t.date), "EEE") === formatted)
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);

    const expense = filtered
      .filter((t) => t.type === 'expense' && format(new Date(t.date), "EEE") === formatted)
      .reduce((acc, t) => acc + Math.abs(t.amount), 0);

    return {
      name: formatted,
      Income: income,
      Expense: expense,
    };
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => setCurrentWeek((prev) => subWeeks(prev, 1))}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <FaChevronLeft />
        </button>
        <h3 className="text-xl font-semibold">
          {format(start, "MMM d")} - {format(end, "MMM d, yyyy")}
        </h3>
        <button 
          onClick={() => setCurrentWeek((prev) => addWeeks(prev, 1))}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <FaChevronRight />
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dailyData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
          />
          <Bar dataKey="Income" fill="#4ade80" radius={[6, 6, 0, 0]} />
          <Bar dataKey="Expense" fill="#f87171" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyTransactionChart;
