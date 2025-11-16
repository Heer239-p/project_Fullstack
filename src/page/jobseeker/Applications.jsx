import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Applications() {
  const { getUserApplications, getJobs } = useAuth();
  const [apps, setApps] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setApps(getUserApplications());
    setJobs(getJobs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function jobTitle(jobId) {
    return jobs.find((j) => j.id === jobId)?.title ?? "Unknown job";
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Applications</h2>

      {apps.length === 0 ? (
        <div className="card">You have not applied to any jobs yet.</div>
      ) : (
        <div className="space-y-3">
          {apps.map((a) => (
            <div key={a.id} className="card flex justify-between items-center">
              <div>
                <div className="font-semibold">{jobTitle(a.jobId)}</div>
                <div className="text-sm text-gray-600">Status: <strong>{a.status}</strong></div>
                <div className="text-xs text-gray-500">Applied on: {new Date(a.appliedAt).toLocaleString()}</div>
              </div>
              <div className="text-sm text-gray-500">{a.coverLetter ? "Cover letter attached" : ""}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
