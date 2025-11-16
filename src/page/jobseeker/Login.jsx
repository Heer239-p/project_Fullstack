import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErr("");
  }

  function submit(e) {
    e.preventDefault();
    const user = login(form.email, form.password);
    if (!user) return setErr("Invalid email or password.");

    if (user.role === "company") nav("/company/dashboard");
    else nav("/dashboard");
  }

  return (
    <div className="min-h-[72vh] flex items-center justify-center">
      <div className="w-full max-w-md card">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {err && <p className="text-red-500">{err}</p>}

        <form onSubmit={submit} className="space-y-3">
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Email"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Password"
          />

          <button className="w-full bg-teal-600 text-white py-2 rounded">
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-3">
          New user? <Link className="text-teal-600" to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}
