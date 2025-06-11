import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/on-boarding/navbar";
import useIncome from "../../components/hook/useIncom";

const IncomeUI = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [incomeName, setIncomeName] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomeDate, setIncomeDate] = useState("");
  const { error, transactions, addTransaction, setError } = useIncome();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const handleNext = () => {
    if (transactions.length === 0) {
      setError("Please add at least one income entry before proceeding");
      return;
    }
    setError("");
    navigate("/goals");
  };

  const handleAdd = () => {
    if (!incomeAmount || isNaN(Number(incomeAmount)) || Number(incomeAmount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    addTransaction({
      amount: Number(incomeAmount),
      description: incomeName.trim() || "Unnamed Income",
      occurred_at: incomeDate ? `${incomeDate}T00:00:00.000Z` : new Date().toISOString(),
    });

    setIncomeName("");
    setIncomeAmount("");
    setIncomeDate("");
    setError("");
  };

  return (
    <div
      className={`flex w-full max-w-full box-border justify-start items-stretch ${
        isMobile ? "flex-col" : "flex-row"
      } h-screen`}
    >
      <div
        className={`bg-sky-500 text-white box-border flex items-center justify-center ${
          isMobile ? "basis-full py-7 px-5" : "basis-2/5 py-10 px-10"
        }`}
      >
        <div className="p-0 max-w-[410px]">
          <div className="text-[34px] font-semibold mb-5 leading-[1.3]">
            Okay, enter your monthly paychecks and other regular income
          </div>
          <div className="text-base text-gray-300 leading-[1.4]">
            All-in-one solution to for your business in the state. <br />
            Form new company from scratch or onboard your existing Company
          </div>
        </div>
      </div>

      <div
        className={`bg-gray-200 flex flex-col box-border ${
          isMobile ? "basis-full py-6 px-5" : "basis-3/5 py-8 px-10"
        }`}
      >
        <Navbar selectedLabel="Income" />
        <div className="flex justify-between items-center mb-5">
          <div className="text-[42px] font-bold text-gray-800">Income</div>
          <button
            onClick={handleAdd}
            className="bg-sky-500 text-white py-2 px-5 border-none rounded-md cursor-pointer text-sm mt-0"
          >
            Add
          </button>
        </div>

        <div className="h-[1px] bg-white mb-5"></div>

        <div className="mb-8">
          <div className="flex gap-[18px] flex-wrap">
            <div className="mb-0 flex flex-col flex-1 min-w-[200px]">
              <label className="text-sm mb-[7px] text-gray-600">
                Income Name
              </label>
              <input
                type="text"
                value={incomeName}
                onChange={(e) => setIncomeName(e.target.value)}
                className="py-2 px-2.5 border-none rounded-lg text-sm text-black bg-white w-full box-border"
                placeholder="Type an Answer"
              />
            </div>
            <div className="mb-0 flex flex-col flex-1 min-w-[200px]">
              <label className="text-sm mb-[7px] text-gray-600">Amount</label>
              <div className="flex items-center border border-gray-300 rounded-md w-full box-border">
                <input
                  type="text"
                  value={incomeAmount}
                  onChange={(e) => setIncomeAmount(e.target.value)}
                  className="py-2 px-2.5 border-none rounded-lg text-sm text-black bg-white flex-grow w-full box-border"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="mb-0 flex flex-col flex-1 min-w-[200px]">
              <label className="text-sm mb-[7px] text-gray-600">Date</label>
              <input
                type="date"
                value={incomeDate}
                onChange={(e) => setIncomeDate(e.target.value)}
                className="py-2 px-2.5 border border-gray-300 rounded-lg text-sm text-black bg-white w-full box-border cursor-pointer"
              />
            </div>
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>

        {transactions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">
              Income List
            </h3>
            <ul className="space-y-2">
              {transactions.map((income, index) => (
                <li
                  key={index}
                  className="bg-white p-3 rounded shadow text-sm text-gray-700 flex justify-between"
                >
                  <span>{income.description}</span>
                  <span>{income.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end mt-8">
          <Link to="/goals" className="text-decoration-none">
            <button className="bg-transparent text-sky-500 py-2 px-5 border border-sky-500 rounded-md cursor-pointer text-sm mr-2.5">
              Skip
            </button>
          </Link>
          <button
            onClick={handleNext}
            className="bg-sky-500 text-white py-2 px-5 border-none rounded-md cursor-pointer text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomeUI;
