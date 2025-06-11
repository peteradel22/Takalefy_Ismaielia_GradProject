import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        console.log('New Password:', newPassword);
         navigate('/Dashboard'); 
    };

    return (
<div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-120">
        <h2 className="text-xl font-semibold text-center mb-6">Enter Your New Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 bg-gray-200 border-none rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

               
                <div className="w-full mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 bg-gray-200 border-none rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 mt-6 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Save Password
                </button>
            </form>
        </div>
    </div>
    );
}

export default ForgetPassword;
