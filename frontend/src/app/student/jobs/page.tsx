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
  createdAt: string;
  company: {
    fullName: string;
  };
}

export default function StudentJobBoard() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyingTo, setApplyingTo] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetchJobs(token);
  }, [router]);

  const fetchJobs = async (token: string) => {
    try {
      const res = await fetch("http://localhost:8080/api/jobs", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
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

  const applyForJob = async (jobId: number) => {
    const token = localStorage.getItem("token");
    setApplyingTo(jobId);
    setMessage("");
    
    try {
      const res = await fetch(`http://localhost:8080/api/jobs/${jobId}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ coverLetterUrl: "Student Profile Default CV" })
      });

      if (res.ok) {
        setMessage("Application submitted successfully!");
      } else {
        setMessage("Failed to apply. You might have already applied.");
      }
    } catch (error) {
      setMessage("An error occurred.");
    } finally {
      setApplyingTo(null);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading jobs...</div>;

  return (
    <div className="min-h-screen p-8">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] bg-gradient-to-br from-background via-background to-primary/10" />
      
      <header className="mb-8 flex justify-between items-center max-w-5xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">Job Discovery Board</h1>
          <p className="text-text-secondary mt-1">Find your next big opportunity</p>
        </div>
        <Link href="/student" className="btn-secondary">Back to Dashboard</Link>
      </header>

      {message && (
        <div className="max-w-5xl mx-auto mb-6 bg-accent/20 border border-accent text-accent-content px-4 py-3 rounded-lg text-center">
          {message}
        </div>
      )}

      <main className="max-w-5xl mx-auto grid gap-6">
        {jobs.length === 0 ? (
          <div className="glass-panel p-12 text-center text-text-secondary">
            No jobs are currently available. Check back later!
          </div>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="glass-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-transform hover:scale-[1.01]">
              <div>
                <h2 className="text-xl font-bold text-white">{job.title}</h2>
                <div className="text-primary font-medium mb-2">{job.company?.fullName}</div>
                <div className="flex flex-wrap gap-3 text-sm text-text-secondary mb-3">
                  <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">{job.jobType}</span>
                  <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">📍 {job.location}</span>
                  {job.salaryRange && <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">💰 {job.salaryRange}</span>}
                </div>
                <p className="text-text-secondary text-sm max-w-2xl">{job.description}</p>
              </div>
              
              <button 
                onClick={() => applyForJob(job.id)}
                disabled={applyingTo === job.id}
                className="btn-primary whitespace-nowrap"
              >
                {applyingTo === job.id ? "Applying..." : "Apply Now"}
              </button>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
