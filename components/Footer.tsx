import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);
    return (
        <footer className="relative z-10 border-t border-white/10/50">
            <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
                <p>© {year} UnityTech Solutions. All rights reserved.</p>
                <div className="flex items-center gap-4">
                    <a href="#top" className="hover:text-slate-200">Back to top ↑</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
