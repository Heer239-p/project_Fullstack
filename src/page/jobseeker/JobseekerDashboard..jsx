import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import JobCard from "../../components/JobCard.jsx";

export default function JobseekerDashboard() {
  const { user, getJobs, getUserApplications } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    setJobs(getJobs());
    setApps(getUserApplications());
  }, []);

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-semibold">Hello, {user?.name}</h1>
        <p className="text-gray-600 mt-1">
          Welcome back — here are jobs you might like.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Recommended Jobs</h2>
          <div className="space-y-3">
            {jobs.slice(0, 6).map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        </div>

        <aside className="card">
          <h3 className="font-semibold mb-2">Your Stats</h3>
          <div className="text-sm text-gray-600">
            Applications:{" "}
            <strong className="text-black">{apps.length}</strong>
          </div>
          <div className="text-sm text-gray-600 mt-2">
            Profile completion: <strong>60%</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}
