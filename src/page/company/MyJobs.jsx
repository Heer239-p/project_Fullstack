import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function MyJobs() {
  const { getCompanyJobs } = useAuth();
  const jobs = getCompanyJobs();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">My Posted Jobs</h2>

      {jobs.length === 0 && (
        <p className="text-gray-600">No jobs posted yet.</p>
      )}

      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="card bg-white shadow p-4 rounded-xl">
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <p className="text-gray-600">{job.location}</p>
            <p className="mt-2 text-sm">{job.description.slice(0, 80)}...</p>

            <Link
              to={`/company/applicants/${job.id}`}
              className="btn mt-3 inline-block"
            >
              View Applicants
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
