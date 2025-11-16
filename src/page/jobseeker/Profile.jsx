import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    skills: user?.profile?.skills?.join(", ") || "",
    location: user?.profile?.location || "",
  });
  const [saved, setSaved] = useState(false);

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function save() {
    const updates = { name: form.name, skills: form.skills.split(",").map(s => s.trim()), location: form.location };
    updateProfile(updates);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

      <input name="name" value={form.name} onChange={change} className="w-full border rounded p-2 mb-3" placeholder="Full name" />
      <input name="skills" value={form.skills} onChange={change} className="w-full border rounded p-2 mb-3" placeholder="Skills (comma separated)" />
      <input name="location" value={form.location} onChange={change} className="w-full border rounded p-2 mb-3" placeholder="Preferred location" />

      <div className="flex items-center gap-3">
        <button onClick={save} className="bg-teal-600 text-white px-4 py-2 rounded">Save Changes</button>
        {saved && <div className="text-sm text-green-600">Saved</div>}
      </div>
    </div>
  );
}
