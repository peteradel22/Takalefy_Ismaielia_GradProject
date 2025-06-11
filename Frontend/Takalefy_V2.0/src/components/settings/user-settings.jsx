import React, { useState, useEffect } from "react";

function UserSettings({ userId, token }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب الإعدادات عند التحميل
  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch(`https://api.takalefy.hs.vc/user-settings/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("فشل في جلب الإعدادات");
        const data = await res.json();
        setSettings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, [userId, token]);

  // دالة تحديث الإعدادات
  async function updateSettings(newSettings) {
    try {
      const res = await fetch(`https://api.takalefy.hs.vc/user-settings/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSettings),
      });
      if (!res.ok) throw new Error("فشل في تحديث الإعدادات");
      const updated = await res.json();
      setSettings(updated);
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>جارٍ التحميل...</p>;
  if (error) return <p>حدث خطأ: {error}</p>;
  if (!settings) return null;

  return (
    <div className="space-y-6 p-6 bg-white rounded-2xl shadow border border-gray-100 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">إعدادات المستخدم</h2>

      {/* إشعارات */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">تفعيل الإشعارات</h3>
          <p className="text-sm text-gray-500 mt-1">تفعيل أو إيقاف الإشعارات لحسابك</p>
        </div>
        <button
          onClick={() => {
            const newVal = !settings.notificationsEnabled;
            setSettings(prev => ({ ...prev, notificationsEnabled: newVal }));
            updateSettings({ notificationsEnabled: newVal });
          }}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.notificationsEnabled ? "bg-green-600" : "bg-gray-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.notificationsEnabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* المصادقة الثنائية 2FA */}
      <div className="flex items-center justify-between mt-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">المصادقة الثنائية (2FA)</h3>
          <p className="text-sm text-gray-500 mt-1">طبقة أمان إضافية لحسابك</p>
        </div>
        <button
          onClick={() => {
            const newVal = !settings.is2FAEnabled;
            setSettings(prev => ({ ...prev, is2FAEnabled: newVal }));
            updateSettings({ is2FAEnabled: newVal });
          }}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.is2FAEnabled ? "bg-green-600" : "bg-gray-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.is2FAEnabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* ممكن تضيف هنا خيارات إضافية للـ 2FA لو تحب */}

    </div>
  );
}

export default UserSettings;
