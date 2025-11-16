// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

/* Auth pages */
import Login from "../page/jobseeker/Login.jsx";
import Signup from "../page/jobseeker/Signup.jsx";

/* Jobseeker pages */
import Dashboard from "../page/jobseeker/JobseekerDashboard..jsx";
import Profile from "../page/jobseeker/Profile.jsx";
import Jobs from "../page/jobseeker/Jobs.jsx";
import JobDetails from "../page/jobseeker/JobDetails.jsx";
import Applications from "../page/jobseeker/Applications.jsx";
import SavedJobs from "../page/jobseeker/SavedJobs.jsx";

/* Company pages */
import CompanyDashboard from "../page/company/CompanyDashboard.jsx";
import CompanyProfile from "../page/company/Profile.jsx";
import PostJob from "../page/company/PostJob.jsx";
import MyJobs from "../page/company/MyJobs.jsx";
import JobApplicants from "../page/company/JobApplicants.jsx";
import Subscription from "../page/company/Subscription.jsx";

function Protected({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role)
    return user.role === "company"
      ? <Navigate to="/company/dashboard" replace />
      : <Navigate to="/dashboard" replace />;
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Jobseeker */}
      <Route path="/dashboard" element={<Protected role="jobseeker"><Dashboard /></Protected>} />
      <Route path="/profile" element={<Protected role="jobseeker"><Profile /></Protected>} />
      <Route path="/jobs" element={<Protected role="jobseeker"><Jobs /></Protected>} />
      <Route path="/jobs/:id" element={<Protected role="jobseeker"><JobDetails /></Protected>} />
      <Route path="/applications" element={<Protected role="jobseeker"><Applications /></Protected>} />
      <Route path="/saved" element={<Protected role="jobseeker"><SavedJobs /></Protected>} />

      {/* Company */}
      <Route path="/company/dashboard" element={<Protected role="company"><CompanyDashboard /></Protected>} />
      <Route path="/company/profile" element={<Protected role="company"><CompanyProfile /></Protected>} />
      <Route path="/company/post-job" element={<Protected role="company"><PostJob /></Protected>} />
      <Route path="/company/my-jobs" element={<Protected role="company"><MyJobs /></Protected>} />
      <Route path="/company/applicants/:jobId" element={<Protected role="company"><JobApplicants /></Protected>} />
      <Route path="/company/subscription" element={<Protected role="company"><Subscription /></Protected>} />

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
