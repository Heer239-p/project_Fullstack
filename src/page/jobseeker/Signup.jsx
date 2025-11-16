import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Signup() {
  const { register } = useAuth();   // <-- MUST be register, NOT read
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker", // default role
  });

  const [err, setErr] = useState("");

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErr("");
  }

  function submit(e) {
    e.preventDefault();

    try {
      register(form);     // <-- CALL register(), not read()
      if (form.role === "company") {
        nav("/company/dashboard");
      } else {
        nav("/dashboard");
      }
    } catch (error) {
      setErr(error.message);
    }
  }

  return (
    <div className="min-h-[72vh] flex items-center justify-center">
      <div className="w-full max-w-md card">
        <h2 className="text-2xl font-semibold mb-4">Create Account</h2>
        {err && <p className="text-red-500">{err}</p>}

        <form onSubmit={submit} className="space-y-3">

          <input
            name="name"
            value={form.name}
            onChange={change}
            className="w-full border p-2 rounded"
            placeholder="Full Name"
          />

          <input
            name="email"
            value={form.email}
            onChange={change}
            className="w-full border p-2 rounded"
            placeholder="Email"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={change}
            className="w-full border p-2 rounded"
            placeholder="Password"
          />

          {/* role selection for both company + jobseeker */}
          <select
            name="role"
            value={form.role}
            onChange={change}
            className="w-full border p-2 rounded"
          >
            <option value="jobseeker">Job Seeker</option>
            <option value="company">Company</option>
          </select>

          <button className="w-full bg-teal-600 text-white py-2 rounded">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
