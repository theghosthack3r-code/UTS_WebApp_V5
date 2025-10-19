import React, { useEffect, useRef, useState } from 'react';
import { bootLines } from './bootLines';

const BootScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [lines, setLines] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bootLines.forEach((line, index) => {
            setTimeout(() => {
                setLines(prev => [...prev, line]);
                if (containerRef.current) {
                    containerRef.current.scrollTop = containerRef.current.scrollHeight;
                }
            }, index * 45);
        });

        setTimeout(onComplete, bootLines.length * 45 + 750);
    }, [onComplete]);

    return (
        <div ref={containerRef} className="w-full h-full p-4 font-mono text-xs text-brand-400/80 overflow-hidden">
            {lines.map((line, i) => <p key={i}>{line}</p>)}
        </div>
    );
};

export default BootScreen;
