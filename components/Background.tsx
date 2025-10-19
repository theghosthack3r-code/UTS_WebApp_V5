import React, { useEffect, useRef } from 'react';
import useStarfield from '../hooks/useStarfield';
import SVGGrid from './SVGGrid';
import SVGCircuit from './SVGCircuit';

const Background: React.FC = () => {
  const starfieldRef = useRef<HTMLCanvasElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<any>(null);

  // Init WebGL Starfield via custom hook
  useStarfield(starfieldRef);

  // Init Scrim Effect
  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;

    const updateScrim = () => {
      const t = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.8)));
      const opacity = 0.0 + t * 0.35;
      const blur = (t * 6).toFixed(1) + 'px';
      scrim.style.setProperty('--scrim-opacity', String(opacity));
      scrim.style.setProperty('--scrim-blur', blur);
    };

    window.addEventListener('scroll', updateScrim, { passive: true });
    window.addEventListener('resize', updateScrim);
    updateScrim();

    return () => {
      window.removeEventListener('scroll', updateScrim);
      window.removeEventListener('resize', updateScrim);
    };
  }, []);

  // Init YouTube Background
  useEffect(() => {
    const VID = 'G2WfEItBhY8';
    
    const onPlayerReady = (event: any) => {
      const pref = localStorage.getItem('uts_video_muted');
      if (pref === 'no') {
        event.target.unMute();
      } else {
        event.target.mute();
      }
      event.target.playVideo();
    };

    const onPlayerStateChange = (event: any) => {
      if (event.data === window.YT.PlayerState.ENDED) {
        event.target.seekTo(0);
      }
    };
    
    const createPlayer = () => {
       if (document.getElementById('yt-player') && !ytPlayerRef.current) {
         ytPlayerRef.current = new window.YT.Player('yt-player', {
            videoId: VID,
            playerVars: { autoplay: 1, controls: 0, mute: 1, loop: 1, playlist: VID, modestbranding: 1, rel: 0, showinfo: 0, fs: 0, cc_load_policy: 0, iv_load_policy: 3, playsinline: 1 },
            events: { onReady: onPlayerReady, onStateChange: onPlayerStateChange }
        });
       }
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
    }

    // Expose player instance for mute toggle
    (window as any).utsYTPlayer = ytPlayerRef;

    return () => {
        if(ytPlayerRef.current && ytPlayerRef.current.destroy) {
            ytPlayerRef.current.destroy();
        }
        (window as any).utsYTPlayer = null;
    }

  }, []);

  return (
    <>
      <div id="yt-bg"><div id="yt-player"></div></div>
      <div ref={scrimRef} id="scrim"></div>
      <div className="mesh-bg" aria-hidden="true"></div>
      <canvas ref={starfieldRef} id="starfield"></canvas>
      <SVGGrid />
      <SVGCircuit />
    </>
  );
};

export default Background;
