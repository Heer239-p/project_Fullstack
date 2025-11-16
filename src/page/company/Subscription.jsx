import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Subscription() {
  const { user, activatePlan } = useAuth();

  if (!user || user.role !== "company") return <p>Only companies can view this page</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Subscription Plans</h2>

      <div className="space-y-4">
        <div className="card bg-white p-4 shadow rounded-xl border">
          <h3 className="text-lg font-semibold">Free Plan</h3>
          <p className="text-gray-600 text-sm">• Post 1 job only</p>
          {user.plan === "FREE" ? (
            <p className="text-green-600 mt-2">Active</p>
          ) : (
            <button className="btn mt-3" onClick={() => activatePlan("FREE")}>
              Switch to Free
            </button>
          )}
        </div>

        <div className="card bg-white p-4 shadow rounded-xl border">
          <h3 className="text-lg font-semibold">Premium – ₹499</h3>
          <p className="text-gray-600 text-sm">• Post unlimited jobs</p>
          <p className="text-gray-600 text-sm">• Unlock applicants</p>
          {user.plan === "PREMIUM" ? (
            <p className="text-green-600 mt-2">Premium Active</p>
          ) : (
            <button className="btn mt-3" onClick={() => activatePlan("PREMIUM")}>
              Buy Now ₹499
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
