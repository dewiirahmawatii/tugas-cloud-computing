import React from 'react';
import HeaderBar from '../common/HeaderBar';

export default function OnboardingScreen({ initialStep = 2, onComplete, onNextStep }) {
  const isStep2 = initialStep === 2;

  const handleClick = () => {
    if (isStep2) {
      if (onNextStep) onNextStep();
    } else {
      if (onComplete) onComplete();
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="flex-1 flex flex-col justify-between items-center text-center px-6 py-6 bg-[#1E3866] text-white relative select-none cursor-pointer transition-colors"
    >
      <HeaderBar transparent={true} />

      {/* Center Screen Content */}
      <div className="my-auto flex flex-col items-center justify-center animate-in fade-in duration-300">
        
        {isStep2 ? (
          /* ON BOARDING 2: Pure minimalist text in golden yellow */
          <div className="py-12">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-[#F5A623] uppercase drop-shadow-md">
              SATGAS PPKPS
            </h1>
          </div>
        ) : (
          /* ON BOARDING 3: Satgas PPKS Circular Logo + Golden Yellow Text */
          <div className="flex flex-col items-center">
            
            {/* Circular Satgas PPKS Logo */}
            <div className="w-44 h-44 rounded-full bg-white p-1.5 shadow-2xl flex items-center justify-center overflow-hidden mb-6 border-4 border-white/90">
              <img
                src="/assets/satgas-ppks.jpg"
                alt="Satgas PPKS UTDI"
                className="w-full h-full object-contain rounded-full"
              />
            </div>

            {/* Golden Text */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-[#F5A623] uppercase drop-shadow-md">
              SATGAS PPKPS
            </h1>
          </div>
        )}

      </div>

      {/* Bottom iOS Home indicator bar */}
      <div className="w-full pb-2 flex flex-col items-center">
        <div className="w-32 h-1 bg-white/30 rounded-full"></div>
      </div>
    </div>
  );
}
