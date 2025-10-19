import React, { useState, useEffect } from 'react';

const FloatingButtons: React.FC<{ setActiveModal: (id: string | null) => void; }> = ({ setActiveModal }) => {
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        const pref = localStorage.getItem('uts_video_muted');
        setMuted(pref !== 'no');
    }, []);

    const toggleMute = () => {
        const player = (window as any).utsYTPlayer?.current;
        if (!player) return;
        
        const isMuted = player.isMuted();
        if (isMuted) {
            player.unMute();
            localStorage.setItem('uts_video_muted', 'no');
            setMuted(false);
        } else {
            player.mute();
            localStorage.setItem('uts_video_muted', 'yes');
            setMuted(true);
        }
    };
    
    return (
        <>
            <button onClick={() => setActiveModal('calModal')} className="float-call rounded-full px-5 py-3 bg-brand-500 hover:bg-brand-600 shadow-neonglow btn-neon font-ox">Book a Call</button>
            <button onClick={toggleMute} className="yt-toggle rounded-full px-4 py-2 border border-white/10 bg-white/5 hover:bg-white/10 shadow-neonglow font-ox">
                {muted ? '🔇 Mute' : '🔊 Sound On'}
            </button>
        </>
    );
};

export default FloatingButtons;
