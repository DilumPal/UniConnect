"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResearcherDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      router.push("/login");
    } else if (role !== "RESEARCHER") {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen p-8">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] bg-gradient-to-br from-background via-background to-accent/10" />
      
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Researcher Dashboard</h1>
        <button 
          onClick={() => { localStorage.clear(); router.push("/"); }}
          className="btn-secondary"
        >
          Logout
        </button>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Research Portfolio Management</h2>
          <p className="text-text-secondary mb-6">Publish new projects, recruit collaborators, and manage ongoing research.</p>
          <button 
            onClick={() => router.push("/researcher/projects")}
            className="btn-primary w-full md:w-auto !bg-accent hover:!bg-accent/80 text-white"
          >
            Go to Research Manager
          </button>
        </div>
        
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold mb-4">Academic Profile</h2>
          <p className="text-text-secondary mb-4">Update your academic credentials.</p>
          <button className="btn-primary w-full">Edit Profile</button>
        </div>
      </main>
    </div>
  );
}
