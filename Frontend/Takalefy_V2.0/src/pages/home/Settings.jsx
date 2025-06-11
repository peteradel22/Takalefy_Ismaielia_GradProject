import * as React from "react";
import { ProfileForm } from "../../components/settings/ProfileForm";
import { SecuritySettings } from "../../components/settings/SecuritySettings";
import { NotificationSettings } from "../../components/settings/NotificationSettings";

export function SettingsLayout() {
  const [activeTab, setActiveTab] = React.useState("Account");

  const renderContent = () => {
    switch (activeTab) {
      case "Account":
        return <ProfileForm />;
      case "Security":
        return <SecuritySettings />;
      case "Notification":
        return <NotificationSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-hidden p-5 bg-neutral-200">
      <div className="flex gap-5 max-md:flex-col">
        
        <main className="flex-1 bg-white rounded-3xl p-5 flex gap-5 max-md:flex-col">
          
          <div className="w-3/12 max-md:w-full bg-white shadow-md rounded-3xl p-5">
            <nav className="flex flex-col space-y-4">
              <button
                className={`p-3 text-left ${
                  activeTab === "Account"
                    ? "bg-blue-100 text-blue-600 font-bold rounded-xl"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("Account")}
              >
                Account
              </button>
              <button
                className={`p-3 text-left ${
                  activeTab === "Security"
                    ? "bg-blue-100 text-blue-600 font-bold rounded-xl"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("Security")}
              >
                Security
              </button>
              <button
                className={`p-3 text-left ${
                  activeTab === "Notification"
                    ? "bg-blue-100 text-blue-600 font-bold rounded-xl"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab("Notification")}
              >
                Notification
              </button>
            </nav>
          </div>

         
          <div className="flex-1">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}

export default SettingsLayout;
