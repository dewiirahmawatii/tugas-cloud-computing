import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';

export default function OnboardingScreen({ initialStep = 2, onComplete, onNextStep }) {
  const isStep2 = initialStep === 2;
  const [progress, setProgress] = useState(0);

  // Auto transition timer with progress bar
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (isStep2) {
            if (onNextStep) onNextStep();
          } else {
            if (onComplete) onComplete();
          }
          return 100;
        }
        return prev + 2.5; // ~4 seconds
      });
    }, 100);

    return () => clearInterval(interval);
  }, [initialStep, isStep2, onNextStep, onComplete]);

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
      className="flex-1 flex flex-col justify-between items-center text-center px-6 py-6 h-full min-h-0 bg-[#1E3866] text-white relative select-none cursor-pointer transition-colors overflow-hidden"
    >
      <HeaderBar transparent={true} />

      {/* --- Ambient Background Animations --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Glowing Ripple Waves */}
        <div className="w-[260px] h-[260px] rounded-full border border-blue-400/20 animate-ripple-1 absolute"></div>
        <div className="w-[330px] h-[330px] rounded-full border border-[#F5A623]/15 animate-ripple-2 absolute"></div>
        <div className="w-[410px] h-[410px] rounded-full border border-cyan-400/10 animate-ripple-3 absolute"></div>

        {/* Orbiting Rotating Dashed Ring */}
        <div className="w-[310px] h-[310px] rounded-full border border-dashed border-[#F5A623]/25 animate-spin-slow absolute">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F5A623] shadow-lg shadow-[#F5A623] absolute top-1 left-1/2 -translate-x-1/2"></div>
        </div>
      </div>

      {/* --- Center Screen Content with Rich Animations --- */}
      <div className="my-auto flex flex-col items-center justify-center z-10 animate-in fade-in duration-500">
        
        {isStep2 ? (
          /* ======================================================== */
          /* ON BOARDING 2: Pure minimalist text with Neon Gold Glow */
          /* ======================================================== */
          <div className="py-12 flex flex-col items-center relative">
            
            {/* Ambient Radial Flare */}
            <div className="absolute -inset-8 bg-[#F5A623]/15 rounded-full blur-3xl opacity-60 animate-pulse"></div>

            {/* Glowing Golden Text with Breathing Animation */}
            <h1 className="relative text-2xl sm:text-4xl font-black tracking-widest text-[#F5A623] uppercase animate-gold-glow drop-shadow-[0_5px_15px_rgba(245,166,35,0.4)]">
              SATGAS PPKPS
            </h1>

            {/* Subtle Sub-caption badge */}
            <div className="mt-4 inline-flex items-center space-x-1.5 bg-[#162a4d]/80 border border-[#2b4c85] rounded-full px-3.5 py-1 text-[11px] text-blue-200 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-ping"></span>
              <span className="font-semibold">Layanan Keamanan & Pendampingan</span>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* ON BOARDING 3: Satgas PPKS Badge with Shimmer & Floating */
          /* ======================================================== */
          <div className="flex flex-col items-center relative">
            
            {/* Dual Halo Rings around Badge */}
            <div className="relative mb-6">
              
              {/* Outer pulsing glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#F5A623]/30 via-pink-500/20 to-blue-500/30 rounded-full blur-2xl opacity-75 animate-pulse"></div>

              {/* White Circular Badge with Metallic Shimmer Light Sweep */}
              <div className="relative w-44 h-44 rounded-full bg-white p-1.5 shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white/90 animate-float">
                <img
                  src="/assets/satgas-ppks.jpg"
                  alt="Satgas PPKS UTDI"
                  className="w-full h-full object-contain rounded-full"
                />

                {/* Light Sweep Shimmer Line Effect */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine pointer-events-none"></div>
              </div>

            </div>

            {/* Golden Yellow Heading */}
            <h1 className="text-2xl sm:text-3xl font-black tracking-widest text-[#F5A623] uppercase animate-gold-glow drop-shadow-[0_5px_15px_rgba(245,166,35,0.4)] mb-2">
              SATGAS PPKPS
            </h1>

            <p className="text-xs text-blue-200/90 font-medium">
              Universitas Teknologi Digital Indonesia
            </p>

          </div>
        )}

      </div>

      {/* --- Bottom: Subtle Animated Indicator & Progress Bar --- */}
      <div className="w-full pb-3 flex flex-col items-center z-10 space-y-2">
        
        {/* Animated Tap Prompt */}
        <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-blue-200/80 tracking-wider uppercase animate-pulse">
          <span>{isStep2 ? 'Sentuh Layar Untuk Lanjut' : 'Mulai Masuk Aplikasi'}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#F5A623]" />
        </div>

        {/* Smooth Auto-advance Progress Line */}
        <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#F5A623] to-amber-300 rounded-full transition-all duration-100 ease-linear shadow"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

      </div>

    </div>
  );
}
