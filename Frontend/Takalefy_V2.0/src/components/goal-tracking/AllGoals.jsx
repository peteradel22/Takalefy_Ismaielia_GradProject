import  { useState } from "react";
import Goall from "./Goall"; 

function AllGoal() {
    const [goals, setGoals] = useState([]); 

   
    const addGoal = (newGoal) => {
        setGoals([...goals, newGoal]); 
    };

    return (
        <div className="flex flex-col items-center">
            <Goall addGoal={addGoal} /> 

            <div className="mt-8 w-full max-w-3xl p-4">
                <h2 className="text-xl font-semibold mb-4">All Goals</h2>
                {goals.length > 0 ? (
                    goals.map((goal, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                            <h3 className="font-bold">{goal.name}</h3>
                            <p>Due Date: {goal.dueDate}</p>
                            <p>Status: {goal.status}</p>
                        </div>
                    ))
                ) : (
                    <p>No goals added yet.</p> 
                )}
            </div>
        </div>
    );
}

export default AllGoal;
