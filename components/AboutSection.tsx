import React from 'react';

const AboutSection: React.FC = () => (
  <section id="about" className="relative mx-auto max-w-7xl px-6 pb-6">
    <div className="grid lg:grid-cols-2 gap-6 items-stretch">
      <div data-reveal="card" className="glass rounded-2xl p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold font-ox">Who we are</h2>
        <p className="mt-3 text-slate-300">
          UnityTech Solutions is a boutique technology partner. We embed with owners and operations teams to build and manage the digital backbone of the business—reliably, securely, and beautifully.
        </p>
        <ul className="mt-4 space-y-2 text-slate-300">
          <li>• Fractional CTO & ongoing support</li>
          <li>• Modern web & ecommerce builds</li>
          <li>• Security hardening & compliance guidance</li>
          <li>• Marketing systems, analytics & creative</li>
        </ul>
      </div>
      <div data-reveal="card" className="glass rounded-2xl p-6 md:p-10">
        <h3 className="text-xl md:text-2xl font-semibold font-ox">Site Status</h3>
        <p className="mt-3 text-slate-300">Our new site is in active development. Expect a phased rollout with live case studies and a client dashboard.</p>
        <div className="mt-6 grid sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-white/10 p-4">
            <p className="text-sm text-slate-400">Phase 1</p>
            <p className="text-lg font-semibold">Splash + Intake</p>
          </div>
          <div className="rounded-xl border border-white/10 p-4">
            <p className="text-sm text-slate-400">Phase 2</p>
            <p className="text-lg font-semibold">Services + Work</p>
          </div>
          <div className="rounded-xl border border-white/10 p-4">
            <p className="text-sm text-slate-400">Phase 3</p>
            <p className="text-lg font-semibold">Client Portal</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
