import React from 'react';

const services = [
  { title: "Web & Ecommerce", description: "Next‑gen sites, SEO, performance, accessibility, Shopify/Headless.", tags: "• JAMstack • SSR • CI/CD" },
  { title: "Security & Infra", description: "Hardening, backups, monitoring, Zero‑Trust, SSO/MFA rollouts.", tags: "• Cloud • Compliance • DR" },
  { title: "Marketing Ops", description: "Funnels, automation, analytics, CRM/CDP integrations.", tags: "• GA4 • Tagging • CDP" },
  { title: "Creative & Video", description: "Brand systems, motion graphics, product videos & edits.", tags: "• Post • Color • SFX" },
  { title: "Apps & Automation", description: "Internal tools, integrations, AI assistants, workflow automation.", tags: "• GPT • Firebase • n8n" },
  { title: "Support & Advisory", description: "Fractional CTO, vendor management, tech due diligence.", tags: "• SLA • Roadmaps • Audits" },
];

const ServicesSection: React.FC = () => (
  <section id="services" className="mx-auto max-w-7xl px-6 py-12">
    <div data-reveal="up">
      <h2 className="text-center text-2xl md:text-3xl font-extrabold font-ox">Capabilities</h2>
      <p className="mt-3 text-center text-slate-300 max-w-2xl mx-auto">End‑to‑end solutions tailored to your industry and stage.</p>
    </div>
    <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5" data-reveal-container>
      {services.map((service, index) => (
        <article key={index} data-reveal="service" className="group glass-dark neon-card rounded-2xl p-6 hover:shadow-glow transition neon-border tilt">
          <h3 className="text-lg font-semibold">{service.title}</h3>
          <p className="mt-2 text-sm text-slate-300">{service.description}</p>
          <div className="mt-3 text-xs text-slate-400">{service.tags}</div>
        </article>
      ))}
    </div>
  </section>
);

export default ServicesSection;
