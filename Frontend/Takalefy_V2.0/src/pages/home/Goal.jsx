import React, { useState, useEffect } from "react";
import GoalCards from "../../components/goal-tracking/GoalCards";
import GoalList from "../../components/goal-tracking/GoalList";
import DueGoals from "../../components/goal-tracking/DueGoals";
import FinishedGoals from "../../components/goal-tracking/FinishedGoals";
import AddGoalButton from "../../components/goal-tracking/AddGoalButton";
import { useUserId } from "../../context/UserProvider";

const MainGoal = () => {
  const { userId } = useUserId();
  const [selectedTab, setSelectedTab] = useState("all");
  const [allGoals, setAllGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const parseGoalText = (goalText) => {
    const parts = goalText.split(" - ");
    if (parts.length >= 2) {
      const name = parts.slice(0, -1).join(" - ");
      const amount = parts[parts.length - 1];
      return { name, amount };
    }
    return { name: goalText, amount: "0.00" };
  };

  const transformGoal = React.useCallback((apiGoal) => {
    const { name, amount } = parseGoalText(apiGoal.goal_text);
    return {
      id: apiGoal.goal_id,
      text: `${name} - $${amount}`,
      status: apiGoal.is_done ? "done" : "due",
      created_at: apiGoal.created_at,
      updated_at: apiGoal.updated_at
    };
  }, []);

 

  useEffect(() => {
     const fetchGoals = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const res = await fetch("https://api.takalefy.hs.vc/user-goals");

      if (!res.ok) {
        throw new Error("Failed to fetch goals");
      }

      const data = await res.json();
      
      const userGoals = data
        .filter((goal) => Number(goal.user_id) === Number(userId))
        .map(transformGoal);
      
      setAllGoals(userGoals);
      setError("");
    } catch (err) {
      console.error("Failed to fetch goals", err);
      setError("Failed to load goals");
    } finally {
      setLoading(false);
    }
  };
    fetchGoals();
  }, [userId, transformGoal]);

  const addGoal = async (newGoal) => {
    if (!newGoal) return; // Handle null case for cancel

    try {
      const goalData = {
        user_id: Number(userId),
        goal_text: `${newGoal.text} - ${newGoal.amount || "0.00"}`,
        is_done: newGoal.status === "done"
      };

      const response = await fetch("https://api.takalefy.hs.vc/user-goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goalData),
      });

      if (!response.ok) {
        throw new Error("Failed to add goal");
      }

      const addedGoal = await response.json();
      const transformedGoal = transformGoal(addedGoal);
      setAllGoals((prev) => [...prev, transformedGoal]);
      setShowForm(false);
      setError("");
    } catch (err) {
      console.error("Failed to add goal", err);
      setError("Failed to add goal");
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      const res = await fetch(`https://api.takalefy.hs.vc/user-goals/${goalId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete goal");
      }

      setAllGoals((prev) => prev.filter((goal) => goal.id !== goalId));
      setError("");
    } catch (err) {
      console.error("Failed to delete goal", err);
      setError("Failed to delete goal");
    }
  };


const updateGoalStatus = async (goalId, isDone, userId, goalText) => {
  try {
    const res = await fetch(`https://api.takalefy.hs.vc/user-goals/${goalId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        goal_id: goalId,
        user_id: userId,
        goal_text: goalText,
        is_done: isDone,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to update goal");
    }

    setAllGoals((prev) =>
      prev.map((goal) =>
        goal.id === goalId
          ? { ...goal, status: isDone ? "done" : "due", is_done: isDone }
          : goal
      )
    );
    setError("");
  } catch (err) {
    console.error("Failed to update goal", err);
    setError("Failed to update goal");
  }
};

  const handleCancel = () => {
    setShowForm(false);
    setError("");
  };

  const filteredGoals =
    selectedTab === "done"
      ? allGoals.filter((goal) => goal.status === "done")
      : selectedTab === "due"
      ? allGoals.filter((goal) => goal.status === "due")
      : allGoals;

  const goalCounts = {
    total: allGoals.length,
    done: allGoals.filter(g => g.status === "done").length,
    due: allGoals.filter(g => g.status === "due").length
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading goals...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <GoalCards 
        setFilter={setSelectedTab} 
        total={goalCounts.total}
        done={goalCounts.done}
        due={goalCounts.due}
      />

      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => setSelectedTab("all")}
          className={`py-2 px-4 rounded-lg transition-colors ${
            selectedTab === "all" 
              ? "bg-blue-500 text-white" 
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          All Goals ({goalCounts.total})
        </button>
        <button
          onClick={() => setSelectedTab("done")}
          className={`py-2 px-4 rounded-lg transition-colors ${
            selectedTab === "done" 
              ? "bg-blue-500 text-white" 
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Completed Goals ({goalCounts.done})
        </button>
        <button
          onClick={() => setSelectedTab("due")}
          className={`py-2 px-4 rounded-lg transition-colors ${
            selectedTab === "due" 
              ? "bg-blue-500 text-white" 
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          Due Goals ({goalCounts.due})
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Goals</h2>
          {!showForm && (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              onClick={() => setShowForm(true)}
            >
              Add Goal
            </button>
          )}
        </div>

        {showForm ? (
          <AddGoalButton 
            addGoal={addGoal} 
            onCancel={handleCancel}
          />
        ) : selectedTab === "done" ? (
          <FinishedGoals 
            goals={filteredGoals} 
            onDelete={deleteGoal}
            onUpdateStatus={updateGoalStatus}
          />
        ) : selectedTab === "due" ? (
          <DueGoals 
            goals={filteredGoals} 
            onDelete={deleteGoal}
            onUpdateStatus={updateGoalStatus}
          />
        ) : (
          <GoalList 
            goals={filteredGoals} 
            onDelete={deleteGoal}
            onUpdateStatus={updateGoalStatus}
          />
        )}

        {!showForm && filteredGoals.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No {selectedTab === "all" ? "" : selectedTab} goals found.</p>
            <button
              className="mt-2 text-blue-500 hover:text-blue-600"
              onClick={() => setShowForm(true)}
            >
              Add your first goal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainGoal;














// {
//     "goal_id": "18",
//     "user_id": "85",
//     "goal_text": "string",
//     "created_at": "2025-05-23T16:54:30.510Z",
//     "updated_at": "2025-05-23T17:59:05.185Z",
//     "is_done": false
// }