import React, { useState } from 'react';
import { FormDataType } from './ContactSection';

interface StepperProps {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  onFinish: () => void;
}

const Stepper: React.FC<StepperProps> = ({ formData, setFormData, onFinish }) => {
  const [step, setStep] = useState(1);
  
  const handleChipClick = (field: keyof FormDataType, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = (next: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setStep(next);
  };
  
  const finish = (e: React.MouseEvent) => {
    e.preventDefault();
    onFinish();
  }

  const stepIndicators = [1, 2, 3].map(i => (
    <span key={i} className={`rounded-full px-2 py-0.5 ${step >= i ? 'bg-white/10' : 'bg-white/5'}`}>{i}</span>
  ));

  return (
    <div id="stepper" className="glass rounded-xl p-4">
      <div className="flex items-center gap-2 text-xs text-slate-300">{stepIndicators}</div>
      
      {step === 1 && (
        <div className="mt-3">
          <p className="text-sm">What are you looking for?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {['Website', 'Ecommerce', 'Security', 'Marketing', 'Video', 'Apps/Automation'].map(val => (
              <button type="button" key={val} className={`chip ${formData.project_type === val ? 'active' : ''}`} onClick={() => handleChipClick('project_type', val)}>{val}</button>
            ))}
          </div>
          <div className="mt-3 flex justify-end"><button type="button" onClick={nextStep(2)} className="px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600">Next</button></div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-3">
          <p className="text-sm">Rough budget?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {['< $2k', '$2k–$5k', '$5k–$10k', '$10k+'].map(val => (
              <button type="button" key={val} className={`chip ${formData.budget === val ? 'active' : ''}`} onClick={() => handleChipClick('budget', val)}>{val}</button>
            ))}
          </div>
          <div className="mt-3 flex justify-between"><button type="button" onClick={nextStep(1)} className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5">Back</button><button type="button" onClick={nextStep(3)} className="px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600">Next</button></div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-3">
          <p className="text-sm">Timeline?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {['ASAP', '2–4 weeks', '1–3 months'].map(val => (
              <button type="button" key={val} className={`chip ${formData.timeline === val ? 'active' : ''}`} onClick={() => handleChipClick('timeline', val)}>{val}</button>
            ))}
          </div>
          <div className="mt-3 flex justify-between"><button type="button" onClick={nextStep(2)} className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5">Back</button><button type="button" onClick={finish} className="px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600">Continue</button></div>
        </div>
      )}
    </div>
  );
};

export default Stepper;
