import { NavLink, useNavigate } from "react-router-dom";
import {
  FaWallet,
  FaChartBar,
  FaBullseye,
  FaExchangeAlt,
  FaFolder,
  FaQuestionCircle,
  FaCog,
  FaBell,
} from "react-icons/fa";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "Guest",
    email: "",
    avatar: "",
  });

  useEffect(() => {

    const firstName = (sessionStorage.getItem("firstName") || "").trim();
    const lastName = (sessionStorage.getItem("lastName") || "").trim();
    const email = sessionStorage.getItem("email") || "";
    const avatar = sessionStorage.getItem("avatar") || "";

    setUserData({
      username:
        firstName !== "" || lastName !== ""
          ? `${firstName} ${lastName}`.trim()
          : "Guest",
      email,
      avatar,
    });
  }, []);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
    { name: "Wallet", path: "/wallet", icon: <FaWallet /> },
    { name: "Insights", path: "/insights", icon: <FaChartBar /> },
    { name: "Goal Tracking", path: "/goal", icon: <FaBullseye /> },
    { name: "Transactions", path: "/transactions", icon: <FaExchangeAlt /> },
    { name: "File Manager", path: "/file-manager", icon: <FaFolder /> },
    { name: "Notifications", path: "/notifications", icon: <FaBell /> },
    { name: "Help Center", path: "/help-center", icon: <FaQuestionCircle /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> },
  ];

  return (
    <div className="w-64 bg-white shadow-md flex flex-col p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Takalefy</h1>

      <nav className="space-y-4 flex-grow">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-100 transition ${
                isActive ? "bg-blue-50 text-blue-500" : ""
              }`
            }
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <img
            src={
              userData.avatar ||
              "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
            }
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-gray-800 font-semibold">{userData.username}</p>
            <p className="text-gray-500 text-sm">{userData.email}</p>
          </div>
        </div>
        <button
          className="w-full mt-3 text-red-500 text-sm font-medium flex items-center justify-between"
          onClick={() => {
            sessionStorage.clear();
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Sign Out <FaExchangeAlt />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
