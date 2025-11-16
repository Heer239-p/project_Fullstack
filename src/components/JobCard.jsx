import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <article className="card flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <div className="text-sm text-gray-600">{job.company || "Unknown"} • {job.location || "N/A"}</div>
        <div className="mt-2 text-sm text-gray-500">
          Skills: {job.skills?.length ? job.skills.join(", ") : "N/A"}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="text-sm text-gray-700">{job.salary || "N/A"}</div>
        <Link to={`/jobs/${job.id}`} className="text-sm text-teal-600">View</Link>
      </div>
    </article>
  );
}
