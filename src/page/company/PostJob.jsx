import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function PostJob() {
  const { createJob } = useAuth();

  const [form, setForm] = useState({
    title: "",
    location: "",
    salary: "",
    description: "",
    skills: "",
  });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    try {
      // Convert skills input to array
      const jobData = { ...form, skills: form.skills.split(",").map(s => s.trim()) };
      createJob(jobData);
      alert("Job posted successfully!");
      setForm({ title: "", location: "", salary: "", description: "", skills: "" });
    } catch (err) {
      alert(err.message); // Show plan error or other errors
    }
  };

  return (
    <div className="max-w-xl mx-auto card bg-white p-6 shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Post New Job</h2>

      <form className="space-y-4" onSubmit={submit}>
        <input name="title" value={form.title} onChange={change} className="input" placeholder="Job Title" />
        <input name="location" value={form.location} onChange={change} className="input" placeholder="Location" />
        <input name="salary" value={form.salary} onChange={change} className="input" placeholder="Salary" />
        <input name="skills" value={form.skills} onChange={change} className="input" placeholder="Skills (comma separated)" />
        <textarea name="description" value={form.description} onChange={change} className="input h-24" placeholder="Job Description" />
        <button className="btn w-full">Post Job</button>
      </form>
    </div>
  );
}
