import React, { useEffect, useState } from "react";
import imageCompression from "browser-image-compression"; 

export default function ProfileSettings({ user, token }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    user_id: user?.id || 0,
    profile_image: "",
    notifications_enabled: true,
    two_factor_auth: false,
  });

  useEffect(() => {
    if (user && user.id) {
      fetch(`https://api.takalefy.hs.vc/user-settings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((settings) => {
          const userSetting = settings.find((s) => s.user_id === user.id);
          if (userSetting) {
            setFormData(userSetting);
            setPreviewImage(userSetting.profile_image);
          }
        })
        .catch((err) => console.error("Error loading settings:", err));
    }
  }, [user]);

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.8,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setPreviewImage(base64Image);
        setFormData((prev) => ({ ...prev, profile_image: base64Image }));
      };
      reader.readAsDataURL(compressedFile);
    } catch (err) {
      console.error("Image compression error:", err);
      alert("An error occurred while processing the image");
    }
  };

  const handleToggle = (field) => {
    setFormData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    try {
      if (!formData.user_id) throw new Error("User ID missing");

      const method = formData.id ? "PATCH" : "POST";
      const endpoint = formData.id
        ? `https://api.takalefy.hs.vc/user-settings/${formData.id}`
        : `https://api.takalefy.hs.vc/user-settings`;

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save settings");

      const result = await response.json();
      console.log("Saved:", result);
      alert("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("An error occurred while saving");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex flex-col items-center">
          <img
            src={previewImage || "/default-profile.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-2"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />
        </div>

        {/* Notification Toggle */}
        <div className="flex items-center justify-between py-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
            <p className="text-sm text-gray-500">Enable or disable account notifications</p>
          </div>
          <button
            onClick={() => handleToggle("notifications_enabled")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.notifications_enabled ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.notifications_enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* 2FA Toggle */}
        <div className="flex items-center justify-between py-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Two-Factor Authentication (2FA)</h3>
            <p className="text-sm text-gray-500">Add an extra layer of protection to your account</p>
          </div>
          <button
            onClick={() => handleToggle("two_factor_auth")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.two_factor_auth ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.two_factor_auth ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
