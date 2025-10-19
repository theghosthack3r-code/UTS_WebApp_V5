import React, { useRef } from 'react';
import ContactSection from './ContactSection';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';

// --- Main Content Component ---
const MainContent: React.FC = () => {
  const mainRef = useRef(null);
  
  return (
    <div ref={mainRef}>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
};

export default MainContent;
