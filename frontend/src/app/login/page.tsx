"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      // Store token securely (localStorage for now, but HttpOnly cookie is better for prod)
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      
      // Redirect based on role
      switch (data.role) {
        case "ADMIN": router.push("/admin"); break;
        case "STUDENT": router.push("/student"); break;
        case "COMPANY": router.push("/company"); break;
        case "RESEARCHER": router.push("/researcher"); break;
        default: router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="glass-panel w-full max-w-md p-8 fade-in relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-text-secondary">Sign in to your UniConnect account</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              className="glass-input"
              placeholder="you@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex justify-center items-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-text-secondary">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:text-primary-hover font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
