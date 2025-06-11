import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function PhoneOTPVerification() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const otpContainerRef = useRef(null);
    const [buttonWidth, setButtonWidth] = useState(0);
    const navigate = useNavigate(); 

    useEffect(() => {
        inputRefs.current = Array(6).fill(null).map(() => React.createRef());
        if (inputRefs.current[0].current) {
            inputRefs.current[0].current.focus();
        }
    }, []);

    useEffect(() => {
        if (otpContainerRef.current) {
            const width = otpContainerRef.current.offsetWidth;
            setButtonWidth(width);
        }
    }, []);

    const handleInputChange = (index, event) => {
        const value = event.target.value;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].current.focus();
        }
    };

    const handleSubmit = () => {
        const fullOTP = otp.join('');
        console.log('OTP:', fullOTP);
        navigate('/forgot-password');
    };

    return (
        <div className="font-sans bg-gray-100 flex flex-col justify-center items-center min-h-screen p-4">
            
            <div className="text-center mb-4">
                <h1 className="text-xl font-semibold">Enter The Code We Sent to Your Phone</h1>
            </div>

            
            <div className="text-center mb-6">
                <p className="text-gray-600">
                    Check your Phone for an OTP code sent to{' '}
                    <span className="font-bold">01xxxxxxxxxx</span>
                </p>
            </div>

            
            <div className="flex gap-3 mb-6" ref={otpContainerRef}>
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={digit}
                        onChange={(e) => handleInputChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        ref={inputRefs.current[index]}
                    />
                ))}
            </div>

            
            <div className="w-full max-w-xs">
                <button
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={handleSubmit}
                    style={{ width: `${buttonWidth}px` }}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default PhoneOTPVerification;
