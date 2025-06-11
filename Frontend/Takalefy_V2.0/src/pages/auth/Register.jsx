import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Carousel_Main from "../../layouts/SliderLayout";
import { fetchData } from '../../api';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = await fetchData('/auth/register', {
        method: 'POST',
        body: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          name: formData.username,
          currency: 'EGP'
        },
      });
      console.log('Register success:', data);

      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        sessionStorage.setItem('firstName', formData.username);
        sessionStorage.setItem('lastName', "");
        navigate('/welcome');
      } else {
        alert("Registration succeeded but token missing");
      }
    } catch (error) {
      console.error('Register failed:', error);
      alert(error.message || error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex flex-col justify-center items-center bg-gray-100 p-10 w-full md:w-1/2">
        <h1 className="mb-6 text-2xl font-semibold">Register</h1>
        <form onSubmit={formSubmit} className="w-full max-w-md">
          <div className="mb-6">
            <label htmlFor="username" className="block mb-2">Username</label>
            <input type="text" id="username" className={inputStyle}
              value={formData.username} onChange={handleChange} />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2">Email</label>
            <input type="email" id="email" className={inputStyle}
              value={formData.email} onChange={handleChange} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input type="password" id="password" className={inputStyle}
              value={formData.password} onChange={handleChange} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="mb-8">
            <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
            <input type="password" id="confirmPassword" className={inputStyle}
              value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" className={buttonStyle}>Register</button>
        </form>
        <p className="mt-4">
          Already have an account?
          <Link to="/" className="text-blue-500 hover:text-blue-700 ml-1">Login!</Link>
        </p>
      </div>
      <div className="w-full md:w-1/2 h-64 md:h-screen">
        <Carousel_Main />
      </div>
    </div>
  );
}

const inputStyle = "w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
const buttonStyle = "w-full p-3 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-300";
export default Register;
