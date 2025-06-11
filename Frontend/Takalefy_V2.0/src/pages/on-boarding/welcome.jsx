import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";
import img3 from "../../assets/3.png";
import img4 from "../../assets/4.png";
import img5 from "../../assets/5.png";
import img6 from "../../assets/6.png";
import Navbar from "../../components/on-boarding/navbar";
import Modal from "../../components/on-boarding/Modal";
import { fetchData } from "../../api";
import { useUserId } from "../../context/UserProvider";

const WelcomeUI = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [firstName, setFirstName] = useState(
    sessionStorage.getItem("firstName") || ""
  );
  const [lastName, setLastName] = useState(
    sessionStorage.getItem("lastName") || ""
  );
  const { setUserId, userId } = useUserId();
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await fetchData("/auth/profile");
        console.log("🔍 profileData raw:", profileData);
        if (profileData.userId) {
          setUserId(profileData.userId);
          localStorage.setItem("userId", profileData.userId);
          setError("");
        } else {
          setError("Failed to get user profile data.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching user profile. Please log in again.");
      }
    };
    fetchProfile();
  }, [setUserId]);
  const isMobile = windowWidth < 768;

  const choices = [
    { id: 0, title: "payoff_debt", label: "Debt", image: img1 },
    { id: 1, title: "retirement", label: "Food", image: img2 },
    { id: 2, title: "stop_paycheck", label: "Transportation", image: img3 },
    { id: 3, title: "kids_collage", label: "Education", image: img4 },
    { id: 4, title: "save_home", label: "Home", image: img5 },
    { id: 5, title: "travel", label: "Travel", image: img6 },
  ];

  const handleNext = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("Please fill in all fields before proceeding");
      return;
    }
    if (!userId) {
      setError("User ID missing. Please log in again.");
      return;
    }
    setError("");

    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("lastName", lastName);

    try {
      for (let choice of choices) {
        await fetchData(`/categories/${userId}`, {
          method: "POST",
          body: {
            name: choice.label,
            type: choice.title,
            icon_key: choice.title,
          },
        });
      }
      navigate("/income");
    } catch (error) {
      setError("حدث خطأ أثناء إرسال البيانات");
      console.error(error);
    }
  };

  const handleOptionClick = (choice) => {
    setModalContent(choice);
    setModalOpen(true);
  };

  return (
    <div
      className={`flex w-full max-w-full box-border justify-start items-stretch ${
        isMobile ? "flex-col" : "flex-row"
      } h-screen`}
    >
      <div
        className={`bg-sky-500 text-white box-border flex items-center justify-center ${
          isMobile ? "basis-full py-7 px-5" : "basis-2/5 py-10 px-10"
        }`}
      >
        <div className="p-0 max-w-[410px]">
          <div className="text-[34px] font-semibold mb-5 leading-[1.3]">
            Let&#39;s setup your operating agreement.
          </div>
          <div className="text-base text-gray-300 leading-[1.4]">
            All-in-one solution for your business in the state.
            <br />
            Form new company from scratch or onboard your existing company
          </div>
        </div>
      </div>

      <div
        className={`bg-gray-200 flex flex-col box-border ${
          isMobile ? "basis-full py-6 px-5" : "basis-3/5 py-8 px-10"
        }`}
      >
        <Navbar selectedLabel="Welcome" />
        <div className="flex justify-between items-center">
          <div className="text-[42px] font-bold text-gray-800">Welcome</div>
        </div>
        <div className="h-[1px] bg-white" />
        <div className="mb-8">
          <div className="flex gap-[18px]">
            <div className="flex flex-col flex-1">
              <label className="text-sm mb-[7px] text-gray-600">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="py-2 px-2.5 border-none rounded-lg text-sm bg-white w-full"
                placeholder="Type your first name"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-sm mb-[7px] text-gray-600">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="py-2 px-2.5 border-none rounded-lg text-sm bg-white w-full"
                placeholder="Type your last name"
              />
            </div>
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>

        <div className="flex flex-wrap gap-4">
          {choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => handleOptionClick(choice)}
              className="p-4 rounded-xl shadow-md flex flex-col items-center justify-center w-[160px] border bg-white"
            >
              <img
                src={choice.image}
                alt={choice.label}
                className="w-15 h-15 mb-2"
              />
              <span className="text-sm font-medium">{choice.label}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <Link to="/income">
            <button className="mr-2.5 border border-sky-500 text-sky-500 py-2 px-5 rounded-md">
              Skip
            </button>
          </Link>
          <button
            onClick={handleNext}
            className="bg-sky-500 text-white py-2 px-5 rounded-md"
          >
            Next
          </button>
        </div>
      </div>

      {modalOpen && (
        <Modal
          content={modalContent}
          onClose={() => setModalOpen(false)}
          userId={userId}
        />
      )}
    </div>
  );
};

export default WelcomeUI;
