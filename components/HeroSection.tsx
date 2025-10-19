import React from 'react';

const HeroSection: React.FC = () => (
  <section className="mx-auto max-w-7xl px-20 py-6 md:py-10 flex flex-col items-center text-center">
    <img
      id="hero-logo"
      src="https://i.ibb.co/Rp05G99w/Untitled-13-22.png"
      alt="UnityTech Solutions Logo"
      className="mx-auto h-41 w-auto mb-6 opacity-0"
      style={{ willChange: 'transform, opacity' }}
    />
    <h1 data-reveal="hero" className="text-4xl md:text-6xl font-extrabold leading-tight font-ox">
      All‑in‑one <span className="text-brand-300">IT Solutions</span> for private businesses
    </h1>
    <div data-reveal="hero" className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">
      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
      <span>New experience in development</span>
    </div>
    <div data-reveal="hero" className="relative w-full max-w-2xl h-1 mt-6">
      <div className="laser-scan animate-pulsebar" aria-hidden="true"></div>
    </div>
    <div data-reveal="hero" className="mt-10 w-full max-w-3xl">
      <svg viewBox="0 0 200 100" className="w-full" aria-hidden="true">
        <defs>
          <linearGradient id="traceGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#00eaff"/>
            <stop offset="50%" stopColor="#27a0ff"/>
            <stop offset="100%" stopColor="#1976ff"/>
          </linearGradient>
        </defs>
        <path d="M 0,50 C 0,5 50,5 50,50 C 50,95 100,95 100,50 C 100,5 150,5 150,50 C 150,95 200,95 200,50" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="8"/>
        <path d="M 0,50 C 0,5 50,5 50,50 C 50,95 100,95 100,50 C 100,5 150,5 150,50 C 150,95 200,95 200,50" fill="none" stroke="url(#traceGrad)" strokeWidth="3" strokeLinecap="round" strokeDasharray="24 80">
          <animate attributeName="stroke-dashoffset" values="200;0" dur="4s" repeatCount="indefinite"/>
        </path>
      </svg>
    </div>
    <p data-reveal="hero" className="mt-4 max-w-2xl text-slate-300/90">
      From websites to marketing, video, and security—we manage your entire technology stack. A redesigned site is on the way. In the meantime, get a fast, free assessment.
    </p>
    <div data-reveal="hero" className="mt-8 flex flex-col sm:flex-row gap-4">
      <a href="#contact" className="inline-flex items-center justify-center rounded-xl px-5 py-3 bg-brand-500 hover:bg-brand-600 transition shadow-glow btn-neon">
        Request a Consult
      </a>
      <a href="#services" className="inline-flex items-center justify-center rounded-xl px-5 py-3 border border-white/10 hover:bg-white/5 transition btn-neon">
        Explore Capabilities
      </a>
    </div>
    <div data-reveal="hero" className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl">
      <div className="glass-dark neon-card rounded-xl p-4 text-left tilt">
        <p className="text-sm text-slate-300"><span className="font-semibold text-white">Full‑stack delivery</span> — web, cloud, security & creative.</p>
      </div>
      <div className="glass-dark neon-card rounded-xl p-4 text-left tilt">
        <p className="text-sm text-slate-300"><span className="font-semibold text-white">Rapid response</span> — proactive monitoring & support.</p>
      </div>
      <div className="glass-dark neon-card rounded-xl p-4 text-left tilt">
        <p className="text-sm text-slate-300"><span className="font-semibold text-white">Privacy‑first</span> — minimal data collection, clear consent.</p>
      </div>
    </div>
  </section>
);

export default HeroSection;
