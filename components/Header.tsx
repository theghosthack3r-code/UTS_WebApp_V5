import React, { useState, useEffect, useRef } from 'react';
import TerminalManager from './TerminalManager';
import IPDisplay from './IPDisplay';
import { useClickOutside } from '../hooks/useClickOutside';
import UnityTechIcon from './UnityTechIcon';

// --- Clock Component ---
const Clock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    return (
        <div className="hidden sm:flex flex-col items-center font-mono text-xs">
            <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span>{time.toLocaleDateString([], { month: '2-digit', day: '2-digit', year: 'numeric' })}</span>
        </div>
    );
};


// --- Start Menu Components ---
const StartButton: React.FC<{ onClick: () => void; isActive: boolean; }> = ({ onClick, isActive }) => (
    <button onClick={onClick} className={`start-button flex items-center gap-3 ${isActive ? 'active' : ''}`}>
        <UnityTechIcon className="h-6 w-auto" />
        <span className="font-ox font-bold text-lg">Start</span>
    </button>
);

const StartMenu: React.FC<{ isOpen: boolean; closeMenu: () => void; }> = ({ isOpen, closeMenu }) => {
    const menuRef = useRef<HTMLDivElement>(null);
    useClickOutside(menuRef, closeMenu, isOpen);
    
    const navLinks = [
      { href: "#about", label: "About" },
      { href: "#services", label: "Capabilities" },
      { href: "#contact", label: "Contact" }
    ];

    const handleLinkClick = () => {
        setTimeout(closeMenu, 150); // Delay to allow scroll to start
    };

    return (
        <div ref={menuRef} className={`start-menu glass neon-card rounded-xl overflow-hidden ${isOpen ? 'open' : ''}`}>
            <div className="flex flex-col">
                {navLinks.map(link => (
                    <a key={link.href} href={link.href} onClick={handleLinkClick} className="start-menu-item text-slate-200">
                        {link.label}
                    </a>
                ))}
                <div className="border-t border-white/10 my-1"></div>
                 <a href="mailto:admin@unitytech.solutions" className="start-menu-item text-slate-200">
                    admin@unitytech.solutions
                </a>
            </div>
        </div>
    );
};

// --- Header ---
const Header: React.FC = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    
    return (
        <header className="taskbar glass-dark neon-border">
            <div className="relative">
                <StartButton onClick={() => setMenuOpen(!isMenuOpen)} isActive={isMenuOpen} />
                <StartMenu isOpen={isMenuOpen} closeMenu={() => setMenuOpen(false)} />
            </div>
            
            <div className="flex items-center gap-4">
                <IPDisplay />
                <div className="hidden sm:block h-8 w-px bg-white/10"></div>
                <Clock />
            </div>
        </header>
    );
};

export default Header;
