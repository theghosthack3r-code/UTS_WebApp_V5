import React, { useEffect, useRef, useState } from 'react';
import BootScreen from './BootScreen';

interface PreloaderProps {
  onLoaded: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoaded }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState('intro');

  // States for intro animation
  const [welcomeLine, setWelcomeLine] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [animationStep, setAnimationStep] = useState(0); // Sequence driver
  const [showCard, setShowCard] = useState(false);
  const [cardContentPhase, setCardContentPhase] = useState<'loading' | 'granted'>('loading');


  useEffect(() => {
    if (!preloaderRef.current || !window.gsap) return;
    document.body.style.overflow = 'hidden';
    
    // This effect handles the entire intro animation sequence
    if (phase === 'intro') {
      const typeText = (text: string, setter: React.Dispatch<React.SetStateAction<string>>, onComplete: () => void) => {
        let i = 0;
        setter('');
        const interval = setInterval(() => {
          if (i <= text.length) {
            setter(text.substring(0, i));
            i++;
          } else {
            clearInterval(interval);
            onComplete();
          }
        }, 45);
        return () => clearInterval(interval);
      };

      let timeoutId: number;
      let cleanupTyping: (() => void) | undefined;
      
      switch (animationStep) {
        case 0: // Start: wait then type welcome line
          timeoutId = window.setTimeout(() => {
            cleanupTyping = typeText('Welcome to UnityTech Solutions', setWelcomeLine, () => setAnimationStep(1));
          }, 375);
          break;
        case 1: // Welcome done, type line 1
          timeoutId = window.setTimeout(() => {
            cleanupTyping = typeText('SYSTEMS ONLINE', setLine1, () => setAnimationStep(2));
          }, 450);
          break;
        case 2: // Line 1 done: show checkmark, wait
          timeoutId = window.setTimeout(() => setAnimationStep(3), 450);
          break;
        case 3: // Type line 2
          timeoutId = window.setTimeout(() => {
            cleanupTyping = typeText('CONNECTING TO SERVER', setLine2, () => setAnimationStep(4));
          }, 225);
          break;
        case 4: // Line 2 done: show dots, wait for "connection"
          timeoutId = window.setTimeout(() => setAnimationStep(5), 1650);
          break;
        case 5: // Fade out text & lottie
          window.gsap.to([preloaderRef.current?.querySelector('.intro-text-container'), preloaderRef.current?.querySelector('.lottie-container')], {
            opacity: 0,
            duration: 0.375,
            onComplete: () => {
              setShowCard(true);
              setAnimationStep(6);
            },
          });
          break;
        case 6: // Card is visible, show loading animation
          timeoutId = window.setTimeout(() => {
            setCardContentPhase('granted');
            setAnimationStep(7);
          }, 2625); // Loader runs for ~2.6s
          break;
        case 7: // Access Granted is visible, wait a bit
          timeoutId = window.setTimeout(() => {
            setAnimationStep(8);
          }, 1500); // Show granted message for 1.5s
          break;
        case 8: // Fade out card and switch to booting phase
          window.gsap.to(preloaderRef.current?.querySelector('.access-card'), {
            opacity: 0,
            duration: 0.375,
            onComplete: () => setPhase('booting'),
          });
          break;
        default:
          break;
      }
      return () => {
        clearTimeout(timeoutId);
        if (cleanupTyping) cleanupTyping();
      };
    }
  }, [phase, animationStep]);

  useEffect(() => {
    // This effect handles the final fade-out
    if (phase === 'complete') {
      const tl = window.gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = '';
          if (preloaderRef.current) {
            preloaderRef.current.style.display = 'none';
          }
          onLoaded();
        },
      });
      tl.to(preloaderRef.current, {
        opacity: 0,
        backgroundColor: 'transparent',
        duration: 0.5,
        ease: 'power1.inOut',
      });
    }
  }, [phase, onLoaded]);

  const renderIntro = () => (
      <>
        {!showCard && (
          <>
            <div className="w-full max-w-4xl lottie-container">
              <dotlottie-wc
                src="https://lottie.host/d573fe18-fac5-411b-8722-bda1a4939c52/EHK3Zt00Qm.json"
                speed="0.5" mode="forward" loop autoPlay
              ></dotlottie-wc>
            </div>
            
            <div className="mt-4 text-center intro-text-container">
              <div className="font-mono tracking-wider h-24 text-slate-300">
                <p className="text-base mb-2">
                  {welcomeLine}
                  {animationStep === 0 && <span className="animate-pulse">_</span>}
                </p>
                <p>
                  {line1}
                  <span className={`checkmark ${animationStep >= 2 ? 'visible' : ''}`}>&nbsp;✔</span>
                  {animationStep === 1 && <span className="animate-pulse">_</span>}
                </p>
                <p className="mt-1">
                  {line2}
                  {animationStep === 4 && (
                    <span className="connecting-dots"><span>.</span><span>.</span><span>.</span></span>
                  )}
                  {animationStep === 3 && <span className="animate-pulse">_</span>}
                </p>
              </div>
            </div>
          </>
        )}
        
        {showCard && (
          <div className={`access-card glass neon-card neon-border visible`}>
             {cardContentPhase === 'loading' ? (
               <div className="relative text-center">
                  <h3 className="text-lg font-ox text-cyan-300">Connecting to Remote System</h3>
                  <p className="mt-4 text-sm text-slate-300">Loading secure environment...</p>
                  <div className="mt-4 w-full h-2 rounded-full bg-slate-700/50 overflow-hidden border border-cyan-500/20">
                      <div className="h-full high-tech-loader"></div>
                  </div>
              </div>
            ) : (
              <div className="relative text-center" style={{ transform: 'scale(1.1)' }}>
                 <h3 className="text-2xl font-ox text-cyan-300">ACCESS GRANTED</h3>
                 <p className="mt-4 text-sm text-slate-300">SSL Encrypted Channel Established</p>
                 <p className="mt-1 text-sm font-semibold secure-text-anim">Secure Connection</p>
             </div>
            )}
          </div>
        )}
      </>
    );

  return (
    <div 
      ref={preloaderRef} 
      className={`fixed inset-0 bg-slate-950 z-[100] flex flex-col transition-colors duration-500 ${phase === 'booting' ? 'items-start justify-start' : 'items-center justify-center'}`}
      style={{ backgroundColor: phase === 'booting' ? '#000' : ''}}
    >
      {phase === 'intro' && renderIntro()}
      {phase === 'booting' && (
        <BootScreen onComplete={() => setPhase('complete')} />
      )}
    </div>
  );
};

export default Preloader;
