import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

export default function JobApplicants() {
  const { jobId } = useParams();
  const { getApplicantsForJob } = useAuth();

  const applicants = getApplicantsForJob(jobId);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Applicants</h2>

      {applicants.length === 0 && (
        <p className="text-gray-600">No applicants yet.</p>
      )}

      <div className="space-y-4">
        {applicants.map((a) => (
          <div key={a.id} className="card bg-white shadow p-4 rounded-xl">
            <h3 className="font-semibold text-lg">{a.userName}</h3>
            <p className="text-gray-600">{a.email}</p>
            <p className="mt-2 text-sm">{a.coverLetter}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
