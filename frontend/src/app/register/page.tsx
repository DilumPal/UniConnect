"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "STUDENT"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Registration failed");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      
      switch (data.role) {
        case "ADMIN": router.push("/admin"); break;
        case "STUDENT": router.push("/student"); break;
        case "COMPANY": router.push("/company"); break;
        case "RESEARCHER": router.push("/researcher"); break;
        default: router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12">
      {/* Background Decor */}
      <div className="absolute bottom-[20%] right-[20%] w-72 h-72 bg-secondary/20 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="glass-panel w-full max-w-md p-8 fade-in relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-text-secondary">Join the UniConnect ecosystem</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="fullName">
              Full Name / Company Name
            </label>
            <input
              id="fullName"
              type="text"
              required
              className="glass-input"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              className="glass-input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="role">
              I am a...
            </label>
            <select
              id="role"
              className="glass-input appearance-none bg-background/50"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="STUDENT">Student</option>
              <option value="COMPANY">Company / Employer</option>
              <option value="RESEARCHER">Researcher / Faculty</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="glass-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex justify-center items-center mt-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-text-secondary">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:text-primary-hover font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
