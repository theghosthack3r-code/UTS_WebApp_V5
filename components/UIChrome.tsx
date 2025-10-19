import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollProgressBar from './ScrollProgressBar';
import ConsentBar from './ConsentBar';
import FloatingButtons from './FloatingButtons';
import AllModals from './AllModals';
import TerminalManager from './TerminalManager';

// --- Main UI Chrome Component ---
const UIChrome: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeModal, setActiveModal] = useState<string | null>(null);

    useEffect(() => {
        (window as any).showSuccessModal = () => {
            setActiveModal('successModal');
            setTimeout(() => setActiveModal(null), 4000);
        };
    }, []);

    return (
        <>
            <Header />
            {children}
            <Footer />
            <ScrollProgressBar />
            <ConsentBar />
            <FloatingButtons setActiveModal={setActiveModal} />
            <AllModals activeModal={activeModal} setActiveModal={setActiveModal} />
            <TerminalManager />
        </>
    );
};

export default UIChrome;
