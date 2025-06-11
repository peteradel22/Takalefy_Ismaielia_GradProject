import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../../components/on-boarding/navbar";
import { useUserId } from "../../context/UserProvider";
import { MdDelete } from "react-icons/md";
import { fetchData } from "../../api";

const GoalsUI = () => {
  const navigate = useNavigate();
  const { userId } = useUserId();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [accountName, setAccountName] = useState("");
  const [accountAmount, setAccountAmount] = useState("");
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const handleNext = () => {
    sessionStorage.setItem("accountName", accountName);
    sessionStorage.setItem("accountAmount", accountAmount);
    setError("");
    navigate("/dashboard");
  };

  const handleAdd = async () => {
    if (!accountName.trim() || !accountAmount.trim()) {
      setError("Please fill in all fields before adding");
      return;
    }

    const goals = {
      user_id: Number(userId),
      goal_text: `${accountName} - ${accountAmount}`,
    };

    try {
      const newGoal = await fetchData("/user-goals", {
        method: "POST",
        body: goals,
      });
      setItems((prev) => [...prev, newGoal]);
      setAccountName("");
      setAccountAmount("");
      setError("");
    } catch (err) {
      console.error("Failed to add goal", err);
      setError("Failed to add goal");
    }
  };

  const handleDelete = async (goalId) => {
    try {
      const res = await fetch(
        `https://api.takalefy.hs.vc/user-goals/${goalId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete goal");
      }

      setItems((prev) => prev.filter((item) => item.id !== goalId));
    } catch (err) {
      console.error("Failed to delete goal", err);
      setError("Failed to delete goal");
    }
  };

  const parseGoalText = (goalText) => {
    const parts = goalText.split(" - ");
    if (parts.length >= 2) {
      const name = parts.slice(0, -1).join(" - ");
      const amount = parts[parts.length - 1];
      return { name, amount };
    }
    return { name: goalText, amount: "0.00" };
  };

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch("https://api.takalefy.hs.vc/user-goals");

        if (!res.ok) {
          throw new Error("Failed to fetch goals");
        }

        const data = await res.json();
        // Filter goals based on current user_id
        const userGoals = data.filter((goal) => goal.user_id === userId);
        setItems(userGoals);
      } catch (err) {
        console.error("Failed to fetch goals", err);
        setError("Failed to load goals");
      }
    };

    if (userId) {
      fetchGoals();
    }
  }, [userId]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

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
            Let&apos;s setup your operating agreement.
          </div>
          <div className="text-base text-gray-300 leading-[1.4]">
            All-in-one solution for your business in the state. <br />
            Form new company from scratch or onboard your existing Company
          </div>
        </div>
      </div>

      <div
        className={`bg-gray-200 flex flex-col box-border ${
          isMobile ? "basis-full py-6 px-5" : "basis-3/5 py-8 px-10"
        }`}
      >
        <div
          className={`flex justify-center mb-7 gap-15 ${
            isMobile ? "flex-wrap" : "flex-nowrap"
          }`}
        >
          <Navbar selectedLabel="Goals" />
        </div>
        <div className="flex justify-between items-center mb-5">
          <div className="text-[42px] font-bold text-gray-800">Goals</div>
          <button
            onClick={handleAdd}
            className="bg-sky-500 text-white py-2 px-5 border-none rounded-md cursor-pointer text-sm mt-0"
          >
            Add
          </button>
        </div>
        <div className="h-[1px] bg-white mb-5"></div>
        <div className="mb-8">
          <div className="flex gap-[18px]">
            <div className="mb-0 flex flex-col flex-1 min-w-0">
              <label className="text-sm mb-[7px] text-gray-600">
                Goal Name
              </label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="py-2 px-2.5 border-none rounded-lg text-sm text-black bg-white w-full box-border"
                placeholder="Type an Answer"
              />
            </div>
            <div className="mb-0 flex flex-col flex-1 min-w-0">
              <label className="text-sm mb-[7px] text-gray-600">Amount</label>
              <div className="flex items-center border border-gray-300 rounded-md w-full box-border">
                <input
                  type="text"
                  value={accountAmount}
                  onChange={(e) => setAccountAmount(e.target.value)}
                  className="py-2 px-2.5 border-none rounded-lg text-sm text-black bg-white flex-grow w-full box-border"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
        <div className="mb-[35px]">
          <div className="text-2xl font-bold mb-[18px] text-gray-800">List</div>
          {items.map((item) => {
            const { name, amount } = parseGoalText(item.goal_text);
            return (
              <div
                key={item.id}
                className="bg-white py-3.5 px-5 rounded-md mb-2.5 flex justify-between items-center border border-gray-300"
              >
                <div className="text-xl text-gray-800 font-bold">{name}</div>
                <div className="flex items-center gap-1">
                  <div className="text-xl font-bold text-gray-800">
                    ${amount}
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-transparent border-none cursor-pointer p-1.5 ml-4"
                  >
                    <MdDelete size={25} className="text-red-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end mt-4">
          <Link to="/dashboard" className="text-decoration-none">
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

export default GoalsUI;
