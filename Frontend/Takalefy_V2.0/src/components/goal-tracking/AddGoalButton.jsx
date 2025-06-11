/* eslint-disable react/prop-types */

import { useState } from "react";

const AddGoalButton = ({ addGoal, onCancel }) => {
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [status, setStatus] = useState('due');
  const [loading, setLoading] = useState(false);

  const handleAddGoal = async () => {
    if (!goalName.trim()) {
      alert('Please enter a goal name');
      return;
    }

    setLoading(true);
    
    const newGoal = {
      text: goalName.trim(),
      amount: goalAmount.trim() || "0.00",
      status: status,
    };

    try {
      await addGoal(newGoal);
      // Reset form
      setGoalName('');
      setGoalAmount('');
      setStatus('due');
    } catch (error) {
      console.error('Error adding goal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setGoalName('');
    setGoalAmount('');
    setStatus('due');
    onCancel();
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border">
      <h2 className="text-xl font-bold mb-4">Add New Goal</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Goal Name *
          </label>
          <input
            className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="e.g., Save for vacation"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Amount (optional)
          </label>
          <input
            className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="e.g., 2000"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Status
          </label>
          <div className="flex space-x-3">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                status === 'done' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setStatus('done')}
              disabled={loading}
            >
              Done
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                status === 'due' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setStatus('due')}
              disabled={loading}
            >
              Due
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors disabled:opacity-50"
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          onClick={handleAddGoal}
          disabled={loading || !goalName.trim()}
        >
          {loading ? 'Adding...' : 'Add Goal'}
        </button>
      </div>
    </div>
  );
};

export default AddGoalButton;