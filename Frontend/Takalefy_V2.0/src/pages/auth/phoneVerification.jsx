import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PhoneVerificationForm() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+20');
    const navigate = useNavigate(); 

    const handlePhoneChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleCountryCodeChange = (e) => {
        setCountryCode(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;
        console.log('Phone:', fullPhoneNumber);
        
        
        navigate(`/phone-otp-verification`);
    };

    return (
        <div className="font-sans bg-gray-100 flex flex-col justify-center items-center min-h-screen p-4">
            
            <div className="w-full max-w-md text-center mb-5">
                <h1 className="text-xl font-semibold mb-2">Enter Your Phone Number</h1>
                <p className="text-gray-600">Enter your phone number and we will send a code.</p>
            </div>

            
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                    </label>
                    <div className="flex gap-2">
                       
                        <div className="flex-none">
                            <select
                                id="country-codes"
                                value={countryCode}
                                onChange={handleCountryCodeChange}
                                className="w-full p-2 bg-white border-none rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="+20">+20 Egypt</option>
                                <option value="+1">+1 USA</option>
                                <option value="+44">+44 UK</option>
                            </select>
                        </div>
                        
                        <input
                            type="tel"
                            id="phone"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                            required
                            className="w-full p-2 bg-white border-none rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                
                <div>
                    <button
                        type="submit"
                        id="send-code-btn"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Send Code
                    </button>
                </div>
            </form>

            
            <div className="mt-4 text-center">
                <p className="text-gray-600">
                    Verify with{' '}
                    <a href="/email-Verification" className="text-blue-500 hover:underline">
                        Email
                    </a>{' '}
                    Instead
                </p>
            </div>
        </div>
    );
}

export default PhoneVerificationForm;
