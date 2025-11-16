// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { saveToStorage, getFromStorage } from "../utils/storage.jsx";
import { SAMPLE_JOBS } from "../data/sampleJobs.js";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

const KEYS = {
  USER: "job_user",
  USERS: "job_users",
  JOBS: "job_jobs",
  APPLICATIONS: "job_applications",
  SAVED: "job_saved",
};

function seedJobs() {
  const jobs = getFromStorage(KEYS.JOBS);
  if (!jobs) saveToStorage(KEYS.JOBS, SAMPLE_JOBS);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getFromStorage(KEYS.USER));
  const [jobs, setJobs] = useState(() => getFromStorage(KEYS.JOBS) || SAMPLE_JOBS);
  const [applications, setApplications] = useState(() => getFromStorage(KEYS.APPLICATIONS) || []);
  const [saved, setSaved] = useState(() => getFromStorage(KEYS.SAVED) || []);

  useEffect(() => {
    seedJobs();
    saveToStorage(KEYS.JOBS, jobs);
  }, []);

  useEffect(() => saveToStorage(KEYS.USER, user), [user]);
  useEffect(() => saveToStorage(KEYS.APPLICATIONS, applications), [applications]);
  useEffect(() => saveToStorage(KEYS.SAVED, saved), [saved]);

  // -------- AUTH --------
  function register({ name, email, password, role }) {
    const users = getFromStorage(KEYS.USERS) || [];
    if (users.find(u => u.email === email)) throw new Error("Email already registered");

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role,
      profile: { name, skills: [], location: "", resume: "", companyName: "", about: "" },
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveToStorage(KEYS.USERS, users);
    setUser({ id: newUser.id, name, email, role });
    return newUser;
  }

  function login(email, password) {
    const users = getFromStorage(KEYS.USERS) || [];
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return false;

    setUser({ id: found.id, name: found.name, email: found.email, role: found.role });
    return found;
  }

  function logout() {
    setUser(null);
  }

  // -------- PROFILE --------
  function updateJobseekerProfile(updates) {
    if (!user || user.role !== "jobseeker") return;
    const users = getFromStorage(KEYS.USERS) || [];
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return;

    users[idx].profile = { ...users[idx].profile, ...updates };
    if (updates.name) users[idx].name = updates.name;
    saveToStorage(KEYS.USERS, users);
    setUser({ ...user, name: users[idx].name });
  }

  function updateCompanyProfile(updates) {
    if (!user || user.role !== "company") return;
    const users = getFromStorage(KEYS.USERS) || [];
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return;

    users[idx].profile = { ...users[idx].profile, ...updates };
    if (updates.name) users[idx].name = updates.name;
    saveToStorage(KEYS.USERS, users);
    setUser({ ...user, name: users[idx].name });
  }

  // -------- JOBS --------
  function getJobs() {
    const j = getFromStorage(KEYS.JOBS) || SAMPLE_JOBS;
    setJobs(j);
    return j;
  }

  function getJobById(id) {
    const j = getFromStorage(KEYS.JOBS) || SAMPLE_JOBS;
    return j.find(x => x.id === id);
  }

function createJob(job) {
  if (!user || user.role !== "company") throw new Error("Company login required");

  // Get all jobs posted by this company
  const allJobs = getFromStorage(KEYS.JOBS) || [];
  const myJobs = allJobs.filter(j => j.companyId === user.id);

  // Check plan restrictions
  const plan = user.plan || "FREE";
  if (plan === "FREE" && myJobs.length >= 1) {
    throw new Error("Free Plan allows only 1 job. Upgrade to Premium to post more.");
  }

  // Create new job
  const newJob = {
    id: Date.now().toString(),
    companyId: user.id,
    company: user.name,
    title: job.title,
    description: job.description,
    location: job.location,
    salary: job.salary,
    skills: job.skills || [],
    createdAt: new Date().toISOString(),
  };

  allJobs.push(newJob);
  setJobs(allJobs);
  saveToStorage(KEYS.JOBS, allJobs);

  return newJob;
}


  function getCompanyJobs() {
    if (!user || user.role !== "company") return [];
    const allJobs = getFromStorage(KEYS.JOBS) || [];
    return allJobs.filter(j => j.companyId === user.id);
  }

  // -------- APPLICATIONS & SAVED JOBS (Jobseeker) --------
  function applyJob(jobId, coverLetter = "") {
    if (!user || user.role !== "jobseeker") throw new Error("Jobseeker login required");
    const apps = getFromStorage(KEYS.APPLICATIONS) || [];
    if (apps.find(a => a.userId === user.id && a.jobId === jobId)) throw new Error("Already applied");

    const app = {
      id: Date.now().toString(),
      userId: user.id,
      jobId,
      status: "Applied",
      coverLetter,
      appliedAt: new Date().toISOString(),
    };
    const updated = [app, ...apps];
    setApplications(updated);
    return app;
  }

  function getUserApplications() {
    if (!user || user.role !== "jobseeker") return [];
    const apps = getFromStorage(KEYS.APPLICATIONS) || [];
    return apps.filter(a => a.userId === user.id);
  }

  function saveJob(jobId) {
    if (!user || user.role !== "jobseeker") throw new Error("Jobseeker login required");
    const existing = getFromStorage(KEYS.SAVED) || [];
    if (existing.find(s => s.userId === user.id && s.jobId === jobId)) return;

    const item = { id: Date.now().toString(), userId: user.id, jobId, savedAt: new Date().toISOString() };
    setSaved([item, ...existing]);
  }

  function getSavedJobs() {
    if (!user || user.role !== "jobseeker") return [];
    const s = getFromStorage(KEYS.SAVED) || [];
    const j = getFromStorage(KEYS.JOBS) || SAMPLE_JOBS;
    const my = s.filter(x => x.userId === user.id);
    return my.map(m => j.find(jj => jj.id === m.jobId)).filter(Boolean);
  }

  // -------- COMPANY APPLICANTS --------
  function getApplicantsByCompany() {
    if (!user || user.role !== "company") return [];
    const apps = getFromStorage(KEYS.APPLICATIONS) || [];
    const jobs = getCompanyJobs();
    const jobIds = jobs.map(j => j.id);
    return apps.filter(a => jobIds.includes(a.jobId));
  }
function getApplicantsForJob(jobId) {
  if (!user || user.role !== "company") return [];

  const allApps = getFromStorage(KEYS.APPLICATIONS) || [];
  // Only applicants for this job
  return allApps
    .filter(a => a.jobId === jobId)
    .map(a => ({
      ...a,
      userName: a.userName, // stored when applied
      email: a.userEmail,   // stored when applied
      coverLetter: a.coverLetter,
    }));
}
function activatePlan(plan) {
  if (!user || user.role !== "company") return;

  const users = getFromStorage(KEYS.USERS) || [];
  const idx = users.findIndex(u => u.id === user.id);
  if (idx === -1) return;

  users[idx].plan = plan; // "FREE" or "PREMIUM"
  saveToStorage(KEYS.USERS, users);

  setUser({ ...user, plan }); // update context
  alert(`Plan activated: ${plan}`);
}


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateJobseekerProfile,
        updateCompanyProfile,
        getJobs,
        getJobById,
        createJob,
        getCompanyJobs,
        applyJob,
        getUserApplications,
        saveJob,
        getSavedJobs,
        getApplicantsByCompany,
         getApplicantsForJob,
         activatePlan,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
