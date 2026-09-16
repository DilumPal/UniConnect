"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  jobType: string;
  salaryRange: string;
}

export default function CompanyJobManager() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "FULL_TIME",
    salaryRange: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchMyJobs(token);
  }, [router]);

  const fetchMyJobs = async (token: string) => {
    try {
      const res = await fetch("http://localhost:8080/api/jobs/my-postings", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch("http://localhost:8080/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setShowForm(false);
        setFormData({ title: "", description: "", location: "", jobType: "FULL_TIME", salaryRange: "" });
        fetchMyJobs(token!);
      }
    } catch (error) {
      console.error("Error posting job", error);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen p-8">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] bg-gradient-to-br from-background via-background to-secondary/10" />
      
      <header className="mb-8 flex justify-between items-center max-w-5xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">Job Manager</h1>
          <p className="text-text-secondary mt-1">Manage your company's active job listings</p>
        </div>
        <Link href="/company" className="btn-secondary">Back to Dashboard</Link>
      </header>

      <main className="max-w-5xl mx-auto">
        <div className="mb-8 flex justify-end">
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? "Cancel" : "+ Post New Job"}
          </button>
        </div>

        {showForm && (
          <div className="glass-panel p-8 mb-8 fade-in">
            <h2 className="text-2xl font-bold mb-6">Create New Job Listing</h2>
            <form onSubmit={handlePostJob} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Job Title</label>
                  <input required type="text" className="glass-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Software Engineer" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Location</label>
                  <input required type="text" className="glass-input" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. Remote, New York" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Job Type</label>
                  <select className="glass-input bg-background/50" value={formData.jobType} onChange={e => setFormData({...formData, jobType: e.target.value})}>
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="INTERNSHIP">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Salary Range</label>
                  <input type="text" className="glass-input" value={formData.salaryRange} onChange={e => setFormData({...formData, salaryRange: e.target.value})} placeholder="e.g. $80k - $100k" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Job Description</label>
                <textarea required rows={4} className="glass-input" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe the role, responsibilities, and requirements..."></textarea>
              </div>
              <button type="submit" className="btn-primary w-full mt-4">Publish Job</button>
            </form>
          </div>
        )}

        <div className="grid gap-6">
          <h2 className="text-xl font-bold">Your Active Listings</h2>
          {jobs.length === 0 ? (
            <div className="glass-panel p-12 text-center text-text-secondary">
              You haven't posted any jobs yet.
            </div>
          ) : (
            jobs.map(job => (
              <div key={job.id} className="glass-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <div className="flex gap-3 text-sm text-text-secondary mt-2">
                    <span className="bg-white/5 px-3 py-1 rounded border border-white/10">{job.jobType}</span>
                    <span className="bg-white/5 px-3 py-1 rounded border border-white/10">{job.location}</span>
                  </div>
                </div>
                <button className="btn-secondary mt-4 md:mt-0 text-sm py-2">
                  View Applicants
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
