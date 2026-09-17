"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ResearchProject {
  id: number;
  title: string;
  description: string;
  fieldOfStudy: string;
  status: string;
  createdAt: string;
  researcher: {
    fullName: string;
  };
}

export default function ResearchDiscoveryBoard() {
  const router = useRouter();
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchProjects(token);
  }, [router]);

  const fetchProjects = async (token: string) => {
    try {
      const res = await fetch("http://localhost:8080/api/research", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    const role = localStorage.getItem("role");
    if (role === "STUDENT") router.push("/student");
    else if (role === "COMPANY") router.push("/company");
    else router.push("/");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading research...</div>;

  return (
    <div className="min-h-screen p-8">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] bg-gradient-to-br from-background via-background to-accent/10" />
      
      <header className="mb-8 flex justify-between items-center max-w-5xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">Research Discovery</h1>
          <p className="text-text-secondary mt-1">Explore ongoing academic research and collaborations</p>
        </div>
        <button onClick={goBack} className="btn-secondary">Back to Dashboard</button>
      </header>

      <main className="max-w-5xl mx-auto grid gap-6">
        {projects.length === 0 ? (
          <div className="glass-panel p-12 text-center text-text-secondary">
            No research projects are currently available. Check back later!
          </div>
        ) : (
          projects.map(project => (
            <div key={project.id} className="glass-panel p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-transform hover:scale-[1.01] border-l-4 border-l-accent">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold text-white">{project.title}</h2>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    project.status === 'RECRUITING' ? 'bg-green-500/20 text-green-300' :
                    project.status === 'COMPLETED' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-accent/20 text-accent-content'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <div className="text-accent font-medium mb-3">
                  Lead Researcher: <span className="text-white">{project.researcher?.fullName}</span>
                </div>
                
                <div className="flex flex-wrap gap-3 text-sm text-text-secondary mb-4">
                  <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">📚 {project.fieldOfStudy}</span>
                  <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">📅 {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                
                <p className="text-text-secondary text-sm leading-relaxed max-w-3xl">
                  {project.description}
                </p>
              </div>
              
              <button className="btn-primary !bg-accent hover:!bg-accent/80 text-white whitespace-nowrap px-6">
                Collaborate
              </button>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
