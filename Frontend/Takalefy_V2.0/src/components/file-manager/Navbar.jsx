/* eslint-disable react/prop-types */

const Navbar = ({ selectedYear, onSelectYear, filter, onSelectFilter }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => currentYear - i).map((y) => ({
    year: y,
    color: "bg-teal-100",
    icon: "📁",
  }));

  const filters = [
    { label: "Monthly", value: "monthly" },
    { label: "Weekly", value: "weekly" },
    { label: "Daily", value: "daily" },
    { label: "Full Year", value: "full" },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">
      <div className="flex flex-wrap gap-2">
        {years.map((item) => (
          <button
            key={item.year}
            onClick={() => onSelectYear(item.year)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
              selectedYear === item.year ? "bg-white shadow-md" : item.color
            }`}
          >
            <span>{item.icon}</span>
            <span className="font-medium">{item.year}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onSelectFilter(f.value)}
            className={`px-4 py-2 rounded-full border transition text-sm ${
              filter === f.value
                ? "bg-blue-600 text-white"
                : "bg-white border-gray-300 text-gray-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
