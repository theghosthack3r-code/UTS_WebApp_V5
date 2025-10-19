import React, { useEffect } from 'react';

// --- Modals ---
interface ModalProps {
    id: string;
    activeModal: string | null;
    setActiveModal: (id: string | null) => void;
    children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({ id, activeModal, setActiveModal, children }) => (
    <div 
      className={`modal ${activeModal === id ? 'active' : ''}`}
      onClick={() => setActiveModal(null)}
    >
        <div onClick={e => e.stopPropagation()}>{children}</div>
    </div>
);

const AllModals: React.FC<{ activeModal: string | null; setActiveModal: (id: string | null) => void; }> = ({ activeModal, setActiveModal }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setActiveModal(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [setActiveModal]);
    
    return (
        <>
            <Modal id="calModal" activeModal={activeModal} setActiveModal={setActiveModal}>
                <div className="glass neon-card rounded-2xl p-0 w-[95%] max-w-3xl panel">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                        <h4 className="font-ox text-lg">Schedule a Discovery Call</h4>
                        <button onClick={() => setActiveModal(null)} className="px-3 py-1 rounded hover:bg-white/10">✕</button>
                    </div>
                    <div className="p-2">
                        <div className="calendly-inline-widget" data-url="https://calendly.com/REPLACE_WITH_YOUR_LINK/30min" style={{ minWidth: '320px', height: '680px' }}></div>
                    </div>
                </div>
            </Modal>
            
            <Modal id="successModal" activeModal={activeModal} setActiveModal={setActiveModal}>
                <div className="panel glass neon-card rounded-2xl p-8 text-center max-w-md w-[92%]">
                    <div className="mx-auto mb-4 h-16 w-16 rounded-full flex items-center justify-center border border-white/10 shadow-neonglow text-3xl">✅</div>
                    <h4 className="font-ox text-xl">Request received</h4>
                    <p className="text-slate-300 mt-2">Thanks! We’ll reach out shortly.</p>
                </div>
            </Modal>
        </>
    );
};

export default AllModals;
