import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function CompanyDashboard() {
  const { user, getCompanyJobs, getApplicantsByCompany } = useAuth();

  const jobs = getCompanyJobs();
  const applicants = getApplicantsByCompany();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="card bg-white shadow p-4 rounded-xl">
          <p className="text-gray-600">Total Posted Jobs</p>
          <h2 className="text-3xl font-bold">{jobs.length}</h2>
        </div>

        <div className="card bg-white shadow p-4 rounded-xl">
          <p className="text-gray-600">Total Applicants</p>
          <h2 className="text-3xl font-bold">{applicants.length}</h2>
        </div>

        <div className="card bg-white shadow p-4 rounded-xl">
          <p className="text-gray-600">Active Plan</p>
          <h2 className="text-xl font-semibold">
            {user?.plan || "Free Plan"}
          </h2>
        </div>
      </div>
    </div>
  );
}
