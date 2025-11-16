import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const { login, register } = useAuth();
  const nav = useNavigate();

  const [mode, setMode] = useState("login"); // login | signup
  const [err, setErr] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErr("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    try {
      if (mode === "login") {
        const user = login(form.email, form.password);
        if (!user) return setErr("Invalid email or password");

        if (user.role === "company") nav("/company/dashboard");
        else nav("/dashboard");
      } else {
        register(form);
        if (form.role === "company") nav("/company/dashboard");
        else nav("/dashboard");
      }
    } catch (err) {
      setErr(err.message);
    }
  }

  return (
    <div className="min-h-[80vh] flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white p-6 shadow rounded-lg">
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 ${mode === "login" ? "border-b-2 border-teal-600" : "text-gray-500"}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 ${mode === "signup" ? "border-b-2 border-teal-600" : "text-gray-500"}`}
            onClick={() => setMode("signup")}
          >
            Signup
          </button>
        </div>

        {err && <p className="text-red-500 mb-2">{err}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === "signup" && (
            <>
              <input
                name="name"
                placeholder="Full Name"
                className="w-full border p-2 rounded"
                onChange={handleChange}
              />

              <select
                name="role"
                className="w-full border p-2 rounded"
                onChange={handleChange}
              >
                <option value="jobseeker">Job Seeker</option>
                <option value="company">Company</option>
              </select>
            </>
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            onChange={handleChange}
          />

          <button className="w-full bg-teal-600 text-white py-2 rounded">
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
