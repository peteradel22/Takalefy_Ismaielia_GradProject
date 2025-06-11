import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate();

  const goToHelpCenter = () => {
    navigate('/contact');
  };

  return (
    <div className="flex flex-col justify-center p-6 mt-6 bg-white rounded-2xl shadow-lg">
      
      <h3 className="text-xl font-bold text-gray-800">Contact Us</h3>

      
      <p className="mt-2 text-sm text-gray-600">
        Reach us out if you need any assistance or having trouble with anything.
      </p>

     
      <button
        className="mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition duration-300 ease-in-out"
        onClick={goToHelpCenter}
      >
        Go to Help Center
      </button>
    </div>
  );
};

export default ContactUs;
