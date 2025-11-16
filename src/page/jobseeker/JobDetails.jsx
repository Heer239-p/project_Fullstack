import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function JobDetails() {
  const { id } = useParams();
  const {
    getJobById,
    applyJob,
    saveJob,
    user
  } = useAuth();
  
  const job = getJobById(id);
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!job) return <div className="p-6 text-center">Job not found!</div>;

  const handleApply = () => {
    try {
      applyJob(job.id);
      setApplied(true);
      alert("Applied successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSave = () => {
    try {
      saveJob(job.id);
      setSaved(true);
      alert("Job saved successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto card p-6 bg-white shadow rounded-xl space-y-4">
      <h2 className="text-2xl font-bold">{job.title}</h2>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-gray-500">Location: {job.location}</p>
      <p className="text-gray-500">Salary: {job.salary}</p>
      <p className="text-gray-500">Skills: {job.skills?.join(", ") || "N/A"}</p>
      <div className="mt-4">{job.description}</div>

      {user?.role === "jobseeker" && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleApply}
            disabled={applied}
            className={`btn px-4 py-2 rounded ${applied ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 text-white"}`}
          >
            {applied ? "Applied" : "Apply"}
          </button>

          <button
            onClick={handleSave}
            disabled={saved}
            className={`btn px-4 py-2 rounded ${saved ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white"}`}
          >
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      )}
    </div>
  );
}
