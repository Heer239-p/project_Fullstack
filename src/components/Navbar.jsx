// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  function handleLogout() {
    logout();
    nav("/login");
  }

  // Determine links based on role
  const jobseekerLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/jobs", label: "Jobs" },
    { to: "/applications", label: "Applications" },
    { to: "/saved", label: "Saved" },
    { to: "/profile", label: "Profile" },
  ];

  const companyLinks = [
    { to: "/company/dashboard", label: "Dashboard" },
    { to: "/company/post-job", label: "Post Job" },
    { to: "/company/my-jobs", label: "My Jobs" },
    { to: "/company/subscription", label: "Subscription" },
    { to: "/company/profile", label: "Profile" },
  ];

  const links = user
    ? user.role === "company"
      ? companyLinks
      : jobseekerLinks
    : [];

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between py-3 px-2">
        <Link
          to={user ? (user.role === "company" ? "/company/dashboard" : "/dashboard") : "/login"}
          className="text-2xl font-bold text-teal-600"
        >
          HireHub
        </Link>

        <nav className="flex items-center gap-4">
          {user ? (
            <>
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm hover:text-teal-600 px-2 py-1 rounded"
                >
                  {link.label}
                </Link>
              ))}
              <span className="text-sm px-3 py-1 rounded bg-gray-50 border">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm">Login</Link>
              <Link
                to="/signup"
                className="text-sm bg-teal-600 text-white px-3 py-1 rounded"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
