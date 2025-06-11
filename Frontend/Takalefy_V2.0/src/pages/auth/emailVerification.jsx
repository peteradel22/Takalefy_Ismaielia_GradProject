import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function EmailVerificationForm() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); 

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);

        
        navigate('/email-otp-verification');
    };

    return (
        <div className="font-sans bg-gray-100 flex flex-col justify-center items-center min-h-screen p-4">
          
            <div className="w-full max-w-md text-center mb-5">
                <h1 className="text-xl font-semibold mb-2">Enter Your Registered E-mail</h1>
                <p className="text-gray-600">Enter your email and we will send a code.</p>
            </div>

            
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                
                <div className="w-full max-w-md mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Type an Answer"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full p-2 bg-white border-none rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                
                <div className="w-full max-w-md">
                    <button
                        id="send-code-btn"
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Send Code
                    </button>
                </div>
            </form>

            
            <div className="mt-4 text-center">
                <p className="text-gray-600">
                    Verify with{' '}
                    <a href="/phone-verification" className="text-blue-500 hover:underline">
                        Phone Number
                    </a>{' '}
                    Instead
                </p>
            </div>
        </div>
    );
}

export default EmailVerificationForm;


