/* eslint-disable react/prop-types */
import { Trash2, CheckCircle, Circle } from "lucide-react";

const GoalList = ({ goals = [], onDelete, onUpdateStatus }) => {
  return (
    <div className="bg-white rounded-2xl">
      {goals.length > 0 ? (
        <ul className="space-y-2">
          {goals.map((goal) => (
            <li
              key={goal.id}
              className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    onUpdateStatus(goal.id, !goal.is_done, goal.user_id, goal.text)
                  }
                  className="flex-shrink-0"
                >
                  {goal.status === "done" ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <Circle className="text-gray-400" size={20} />
                  )}
                </button>
                <span
                  className={`text-gray-700 ${
                    goal.status === "done" ? "line-through" : ""
                  }`}
                >
                  {goal.text}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 text-sm rounded-lg ${
                    goal.status === "done"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {goal.status === "done" ? "Done" : "Due"}
                </span>
                <button
                  onClick={() => onDelete(goal.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default GoalList;
