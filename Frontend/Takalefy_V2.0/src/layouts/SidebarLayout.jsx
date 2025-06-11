import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard-main/Sidebar";
import Chatbot from "../components/Chatbot/Chatbot";
import { FaBars } from "react-icons/fa";

function SidebarLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <div className="hidden md:block w-64">
        <Sidebar />
      </div>

      
      {showSidebar && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
          <div className="bg-white w-64 h-full shadow-lg p-4">
            <button
              className="text-red-500 mb-4"
              onClick={() => setShowSidebar(false)}
            >
             ❌
            </button>
            <Sidebar />
          </div>
        </div>
      )}

      
      <div className="flex-1 flex flex-col relative">
        
        <div className="md:hidden flex items-center justify-between bg-white p-4 shadow">
          <button
            className="text-gray-600 text-xl"
            onClick={() => setShowSidebar(true)}
          >
            <FaBars />
          </button>
          <h1 className="text-lg font-semibold">Takalefy</h1>
        </div>

        
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>

        <Chatbot />
      </div>
    </div>
  );
}

export default SidebarLayout;
