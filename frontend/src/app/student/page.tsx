"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.push("/login");
    } else if (role !== "STUDENT") {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen p-8">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] bg-gradient-to-br from-background via-background to-primary/10" />
      
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <button 
          onClick={() => { localStorage.clear(); router.push("/"); }}
          className="btn-secondary"
        >
          Logout
        </button>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Job & Internship Discovery</h2>
          <p className="text-text-secondary mb-6">Browse hundreds of active jobs posted by verified companies.</p>
          <button 
            onClick={() => router.push("/student/jobs")}
            className="btn-primary w-full md:w-auto mr-4"
          >
            Go to Job Board
          </button>
          <button 
            onClick={() => router.push("/research")}
            className="btn-secondary w-full md:w-auto mt-4 md:mt-0"
          >
            Browse Academic Research
          </button>
        </div>

        <div className="glass-panel p-6 border-l-4 border-l-accent relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">✨</div>
          <h2 className="text-xl font-bold mb-4 text-accent">AI Career Matchmaker</h2>
          <p className="text-text-secondary mb-4 text-sm">Let our Gemini AI analyze your profile and recommend the perfect opportunities.</p>
          <button 
            onClick={async (e) => {
              const btn = e.currentTarget;
              btn.innerText = "Analyzing...";
              btn.disabled = true;
              try {
                const res = await fetch("http://localhost:8080/api/ai/recommend-jobs", {
                  headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
                });
                const data = await res.json();
                alert(data.recommendation);
              } catch(e) {
                alert("AI failed to load recommendations. Make sure your API key is set.");
              } finally {
                btn.innerText = "Get Recommendations";
                btn.disabled = false;
              }
            }}
            className="btn-primary !bg-accent hover:!bg-accent/80 text-white w-full"
          >
            Get Recommendations
          </button>
        </div>
        
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold mb-4">My Profile</h2>
          <p className="text-text-secondary mb-4">Keep your profile updated to stand out to employers.</p>
          <button className="btn-primary w-full">Edit Profile</button>
        </div>
      </main>
    </div>
  );
}
