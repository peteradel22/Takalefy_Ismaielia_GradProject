import React from 'react';
import { CheckCircle, AlertCircle, Target } from 'lucide-react';

const GoalCards = ({ setFilter, total = 0, done = 0, due = 0 }) => {
  return (
    <div className="grid grid-cols-3 gap-6 px-4">
      <div 
        className="cursor-pointer bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between items-center hover:bg-gray-100 transition-all"
        onClick={() => setFilter('all')}
      >
        <Target className="text-blue-500" size={40} />
        <h3 className="text-gray-600 text-lg mt-2">All Goals</h3>
        <p className="text-3xl font-bold">{total}</p> 
      </div>
      
      <div 
        className="cursor-pointer bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between items-center hover:bg-gray-100 transition-all"
        onClick={() => setFilter('done')}
      >
        <CheckCircle className="text-green-500" size={40} />
        <h3 className="text-gray-600 text-lg mt-2">Finished Goals</h3>
        <p className="text-3xl font-bold">{done}</p> 
      </div>
      
      <div 
        className="cursor-pointer bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between items-center hover:bg-gray-100 transition-all"
        onClick={() => setFilter('due')}
      >
        <AlertCircle className="text-red-500" size={40} />
        <h3 className="text-gray-600 text-lg mt-2">Due Goals</h3>
        <p className="text-3xl font-bold">{due}</p> 
      </div>
    </div>
  );
};

export default GoalCards;