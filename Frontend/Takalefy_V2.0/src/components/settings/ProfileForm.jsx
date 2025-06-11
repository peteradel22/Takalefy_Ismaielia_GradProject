import React, { useState, useEffect } from "react";
import { fetchData } from "../../api";

export function ProfileForm() {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await fetchData("/auth/profile");
        setUser({
          id: data.id || "",
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          avatar: data.avatar || "",
        });
        // تحديث sessionStorage عشان Sidebar يستفيد
        sessionStorage.setItem("firstName", data.firstName || "");
        sessionStorage.setItem("lastName", data.lastName || "");
        sessionStorage.setItem("email", data.email || "");
        sessionStorage.setItem("avatar", data.avatar || "");
      } catch (error) {
        alert("Failed to load profile: " + error);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchData(`/users/${user.id}`, {
        method: "PATCH",
        body: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: user.avatar,
        },
      });
      alert("Profile updated successfully");

      // تحديث sessionStorage بعد التعديل
      sessionStorage.setItem("firstName", user.firstName);
      sessionStorage.setItem("lastName", user.lastName);
      sessionStorage.setItem("email", user.email);
      sessionStorage.setItem("avatar", user.avatar);
    } catch (error) {
      alert("Failed to update profile: " + error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
      </label>
      <label>
        Avatar URL:
        <input
          type="text"
          name="avatar"
          value={user.avatar}
          onChange={handleChange}
          placeholder="https://example.com/avatar.jpg"
          className="w-full p-2 border rounded"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
}
