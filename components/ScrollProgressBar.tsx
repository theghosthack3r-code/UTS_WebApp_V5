import React, { useEffect, useRef } from 'react';

const ScrollProgressBar: React.FC = () => {
    const barRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const update = () => {
            if (!barRef.current) return;
            const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const pct = Math.min(1, window.scrollY / max);
            barRef.current.style.width = (pct * 100).toFixed(2) + '%';
        };
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        update();
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    return <div ref={barRef} id="scrollProg" />;
};

export default ScrollProgressBar;
