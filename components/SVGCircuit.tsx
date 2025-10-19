import React from 'react';

const SVGCircuit: React.FC = () => (
  <svg className="circuit-bg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <g>
      <path className="circuit-line dash" d="M5 15 H35 V35 H65 V15 H95"/>
      <path className="circuit-line dash slow" d="M10 60 H30 V80 H70 V60 H90"/>
      <path className="circuit-line dash" d="M5 90 H25 V70 H45 V90 H75 V70 H95"/>
      <circle className="circuit-node glow" cx="35" cy="35" r="1.2"/>
      <circle className="circuit-node" cx="65" cy="35" r="1"/>
      <circle className="circuit-node glow" cx="30" cy="80" r="1.1"/>
      <circle className="circuit-node" cx="70" cy="80" r="1"/>
      <circle className="circuit-node glow" cx="45" cy="70" r="1"/>
    </g>
  </svg>
);

export default SVGCircuit;
