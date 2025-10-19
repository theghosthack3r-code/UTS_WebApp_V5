import React, { useState, useEffect } from 'react';

const ConsentBar: React.FC = () => {
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
        const consent = localStorage.getItem('uts_consent');
        if (!consent) setVisible(true);
    }, []);
    
    const handleConsent = (consent: 'yes' | 'no') => {
        localStorage.setItem('uts_consent', consent);
        setVisible(false);
        if (consent === 'yes') {
            // Logic to load GA or other tracking scripts can go here
            console.log("Analytics enabled.");
        }
    };

    if (!visible) return null;

    return (
        <div id="consentBar" className="consent">
            <div className="mx-auto max-w-7xl px-4 py-3">
                <div className="glass neon-card rounded-xl p-3 flex flex-col sm:flex-row sm:items-center gap-3">
                    <p className="text-sm text-slate-300">We use minimal analytics to improve the site. OK to enable?</p>
                    <div className="flex gap-2">
                        <button onClick={() => handleConsent('yes')} className="px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600">Allow</button>
                        <button onClick={() => handleConsent('no')} className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5">No, thanks</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsentBar;
