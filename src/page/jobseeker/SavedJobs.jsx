import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import JobCard from "../../components/JobCard.jsx";

export default function SavedJobs() {
  const { getSavedJobs } = useAuth();
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    setSaved(getSavedJobs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Saved Jobs</h2>
      {saved.length === 0 ? (
        <div className="card">No saved jobs yet.</div>
      ) : (
        <div className="space-y-3">
          {saved.map((j) => <JobCard job={j} key={j.id} />)}
        </div>
      )}
    </div>
  );
}
