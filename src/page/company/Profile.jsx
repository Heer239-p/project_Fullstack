import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Profile() {
  const { user, updateCompanyProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    companyName: user?.profile?.companyName || "",
    location: user?.profile?.location || "",
    about: user?.profile?.about || "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    updateCompanyProfile(form);
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-xl mx-auto card p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Company Profile</h2>

      <form className="space-y-4" onSubmit={submit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="input"
          placeholder="Your Name"
        />

        <input
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          className="input"
          placeholder="Company Name"
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          className="input"
          placeholder="Location"
        />

        <textarea
          name="about"
          value={form.about}
          onChange={handleChange}
          className="input h-24"
          placeholder="About company"
        />

        <button className="btn w-full">Save Profile</button>
      </form>
    </div>
  );
}
