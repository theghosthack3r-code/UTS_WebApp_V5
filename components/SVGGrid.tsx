import React from 'react';

const SVGGrid: React.FC = () => (
  <svg className="grid-bg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="gridGlow" x1="0" x2="1">
        <stop offset="0%" stopColor="#00eaff" stopOpacity="0.0"/>
        <stop offset="50%" stopColor="#27a0ff" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#1976ff" stopOpacity="0.0"/>
      </linearGradient>
    </defs>
    <g stroke="url(#gridGlow)" strokeWidth="0.2">
      {Array.from({ length: 21 }).map((_, i) => (
          <React.Fragment key={i}>
            <line x1={i * 5} y1={0} x2={i * 5} y2={100} />
            <line x1={0} y1={i * 5} x2={100} y2={i * 5} />
          </React.Fragment>
      ))}
    </g>
  </svg>
);

export default SVGGrid;
