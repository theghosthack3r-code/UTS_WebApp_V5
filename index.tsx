
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// FIX: Moved global type definitions here from hooks/useGsapAnimations.ts to ensure they are available project-wide.
// This resolves errors where the 'dotlottie-wc' custom element was not recognized by TypeScript.
// Centralized type definitions for external libraries and custom elements
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    TextPlugin: any;
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
    utsYTPlayer?: any;
    showSuccessModal?: () => void;
  }
  
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src: string;
        speed?: string;
        mode?: string;
        loop?: boolean;
        autoplay?: boolean;
      }, HTMLElement>;
    }
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);