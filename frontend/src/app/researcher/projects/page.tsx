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
}

export default function ResearcherProjectManager() {
  const router = useRouter();
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fieldOfStudy: "",
    status: "ONGOING"
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchMyProjects(token);
  }, [router]);

  const fetchMyProjects = async (token: string) => {
    try {
      const res = await fetch("http://localhost:8080/api/research/my-projects", {
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

  const handlePostProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch("http://localhost:8080/api/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setShowForm(false);
        setFormData({ title: "", description: "", fieldOfStudy: "", status: "ONGOING" });
        fetchMyProjects(token!);
      }
    } catch (error) {
      console.error("Error posting project", error);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen p-8">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] bg-gradient-to-br from-background via-background to-accent/10" />
      
      <header className="mb-8 flex justify-between items-center max-w-5xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold">Research Manager</h1>
          <p className="text-text-secondary mt-1">Manage your active research and publications</p>
        </div>
        <Link href="/researcher" className="btn-secondary">Back to Dashboard</Link>
      </header>

      <main className="max-w-5xl mx-auto">
        <div className="mb-8 flex justify-end">
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">
            {showForm ? "Cancel" : "+ Post New Research"}
          </button>
        </div>

        {showForm && (
          <div className="glass-panel p-8 mb-8 fade-in border-accent/30">
            <h2 className="text-2xl font-bold mb-6 text-accent">Create New Research Project</h2>
            <form onSubmit={handlePostProject} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm text-text-secondary mb-1">Project Title</label>
                  <input required type="text" className="glass-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. AI-driven Personalized Learning" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Field of Study</label>
                  <input required type="text" className="glass-input" value={formData.fieldOfStudy} onChange={e => setFormData({...formData, fieldOfStudy: e.target.value})} placeholder="e.g. Machine Learning, Biology" />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Status</label>
                  <select className="glass-input bg-background/50" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="RECRUITING">Recruiting Collaborators</option>
                    <option value="ONGOING">Ongoing</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Abstract / Description</label>
                <textarea required rows={5} className="glass-input" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe the research goals, methodologies, and findings..."></textarea>
              </div>
              <button type="submit" className="btn-primary w-full mt-4 !bg-accent hover:!bg-accent/80 text-white">Publish Project</button>
            </form>
          </div>
        )}

        <div className="grid gap-6">
          <h2 className="text-xl font-bold">Your Published Research</h2>
          {projects.length === 0 ? (
            <div className="glass-panel p-12 text-center text-text-secondary">
              You haven't posted any research projects yet.
            </div>
          ) : (
            projects.map(project => (
              <div key={project.id} className="glass-panel p-6 border-l-4 border-l-accent">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span className={`px-3 py-1 rounded text-xs font-bold ${
                    project.status === 'RECRUITING' ? 'bg-green-500/20 text-green-300' :
                    project.status === 'COMPLETED' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-accent/20 text-accent-content'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="text-sm text-accent mb-4">{project.fieldOfStudy}</div>
                <p className="text-text-secondary">{project.description}</p>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
