import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />
      
      <main className="z-10 flex flex-col items-center text-center max-w-4xl w-full slide-up">
        
        {/* Hero Section */}
        <div className="glass-panel p-12 mb-12 w-full">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-sm">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">UniConnect</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
            The ultimate ecosystem connecting students, researchers, and companies. 
            Discover opportunities, collaborate on cutting-edge research, and launch your career.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/login" className="btn-primary w-full sm:w-auto min-w-[200px] text-center text-lg">
              Sign In
            </Link>
            <Link href="/register" className="btn-secondary w-full sm:w-auto min-w-[200px] text-center text-lg">
              Create Account
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full fade-in" style={{ animationDelay: '0.2s' }}>
          
          {/* Card 1 */}
          <div className="glass-panel p-8 text-left group">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Jobs & Internships</h3>
            <p className="text-text-secondary leading-relaxed">
              Find the perfect role tailored to your skills. Companies can discover top university talent directly.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-8 text-left group">
            <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Research Network</h3>
            <p className="text-text-secondary leading-relaxed">
              Join cutting-edge research projects, collaborate with professors, and publish your findings.
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-8 text-left group">
            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Verified Profiles</h3>
            <p className="text-text-secondary leading-relaxed">
              Build a comprehensive academic and professional portfolio with university-verified credentials.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
