/* eslint-disable react/prop-types */

import { Trash2, CheckCircle } from "lucide-react";

const DueGoals = ({ goals = [], onDelete, onUpdateStatus }) => {
  return (
    <div className="bg-white rounded-2xl">
      <h2 className="text-xl font-bold mb-4">Due Goals</h2>
      {goals.length > 0 ? (
        <ul className="space-y-2">
          {goals.map((goal) => (
            <li
              key={goal.id}
              className="flex justify-between items-center p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    onUpdateStatus(goal.id, !goal.is_done, goal.user_id, goal.text)
                  }
                  className="text-gray-400 hover:text-green-500"
                >
                  <CheckCircle size={20} />
                </button>
                <span className="text-gray-700">{goal.text}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-red-600 font-semibold">Due ❌</span>
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

export default DueGoals;
