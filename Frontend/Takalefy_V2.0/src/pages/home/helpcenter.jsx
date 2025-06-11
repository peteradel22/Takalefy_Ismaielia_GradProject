import { useState } from "react";
import { useNavigate } from "react-router-dom";

const helpcenter = () => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    issue: "",
    description: "",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData(initialFormData);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Contact Us</h2>
      <p className="text-gray-500 text-base mb-6">
        Reach out if you need any assistance or are experiencing issues.
      </p>

      
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-[#4a90e2] focus:outline-none"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-[#4a90e2] focus:outline-none"
              />
            </div>
          </div>

          
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-[#4a90e2] focus:outline-none"
            />
          </div>

          
          <div>
            <label htmlFor="issue" className="block text-gray-700 text-sm font-medium">
              Issue with the App
            </label>
            <input
              type="text"
              id="issue"
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              placeholder="Describe the issue"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-[#4a90e2] focus:outline-none"
            />
          </div>

          
          <div>
            <label htmlFor="description" className="block text-gray-700 text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide details about the issue"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-[#4a90e2] focus:outline-none h-32"
            />
          </div>

          
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#4a90e2] text-white py-2 px-5 rounded-lg shadow-md hover:bg-[#007ac1] transition duration-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default helpcenter;