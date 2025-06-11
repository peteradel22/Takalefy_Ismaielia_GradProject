import * as React from "react";

export function NotificationSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const toggleNotifications = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.takalefy.hs.vc/user-settings/notifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // أضف التوكن هنا لو مطلوب:
          // "Authorization": `Bearer ${yourToken}`,
        },
        body: JSON.stringify({ notificationsEnabled: newValue }),
      });

      if (!response.ok) {
        throw new Error("Failed to update notification settings");
      }

      // لو عندك حاجة تعالج الرد هنا
    } catch (err) {
      setError(err.message);
      setNotificationsEnabled(!newValue); // ارجع للحالة القديمة لو فشل التحديث
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Notification Settings</h2>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Enable Notifications</h3>
            <p className="text-sm text-gray-500 mt-1">
              Turn notifications on/off for your account
            </p>
            {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
          </div>
          <button
            onClick={toggleNotifications}
            disabled={loading}
            aria-pressed={notificationsEnabled}
            aria-label="Toggle notifications"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notificationsEnabled ? "bg-green-600" : "bg-gray-200"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notificationsEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
