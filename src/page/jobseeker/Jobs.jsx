import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import JobCard from "../../components/JobCard.jsx";

export default function Jobs() {
  const { getJobs } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setJobs(getJobs());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((j) => {
      if (filter !== "all" && j.type.toLowerCase() !== filter) return false;
      if (!q) return true;
      return (
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.skills.join(" ").toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
      );
    });
  }, [jobs, query, filter]);

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by role, skill, company or location" className="w-full border rounded p-2" />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border rounded p-2">
          <option value="all">All</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
        </select>
      </div>

      <div className="space-y-3">
        {results.length === 0 ? (
          <div className="card">No jobs found.</div>
        ) : (
          results.map((job) => <JobCard key={job.id} job={job} />)
        )}
      </div>
    </div>
  );
}
