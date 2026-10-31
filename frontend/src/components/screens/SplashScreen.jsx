import React, { useEffect, useState } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';

export default function SplashScreen({ onStart }) {
  const [progress, setProgress] = useState(0);

  // Auto transition timer with progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onStart();
          return 100;
        }
        return prev + 2.5; // ~4 seconds
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onStart]);

  return (
    <div 
      onClick={onStart}
      className="flex-1 flex flex-col justify-between items-center text-center px-6 py-6 h-full min-h-0 bg-[#1E3866] text-white relative select-none cursor-pointer transition-colors overflow-hidden"
    >
      <HeaderBar transparent={true} />

      {/* --- Ambient Background Animations --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Expanding Ripple Rings */}
        <div className="w-[280px] h-[280px] rounded-full border border-blue-400/20 animate-ripple-1 absolute"></div>
        <div className="w-[340px] h-[340px] rounded-full border border-blue-300/15 animate-ripple-2 absolute"></div>
        <div className="w-[400px] h-[400px] rounded-full border border-blue-200/10 animate-ripple-3 absolute"></div>

        {/* Orbiting Rotating Circuit Ring */}
        <div className="w-[310px] h-[310px] rounded-full border border-dashed border-[#F5A623]/25 animate-spin-slow absolute">
          <div className="w-2.5 h-2.5 rounded-full bg-[#F5A623] shadow-lg shadow-[#F5A623] absolute top-2 left-1/2 -translate-x-1/2"></div>
        </div>

        {/* Counter-Rotating Outer Ring */}
        <div className="w-[370px] h-[370px] rounded-full border border-dashed border-cyan-400/20 animate-spin-reverse-slow absolute">
          <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-lg shadow-cyan-400 absolute bottom-3 right-1/4"></div>
        </div>
      </div>

      {/* --- Main Center: Official UTDI Emblem Logo with Floating & Halo Glow --- */}
      <div className="my-auto flex flex-col items-center justify-center z-10 animate-in fade-in zoom-in duration-700">
        
        {/* Soft Radial Back Glow */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 via-indigo-400/20 to-cyan-400/30 rounded-full blur-2xl opacity-70 animate-pulse"></div>
          
          <div className="relative w-56 h-56 flex items-center justify-center animate-float">
            <img
              src="/assets/utdi-logo.png"
              alt="Logo Universitas Teknologi Digital Indonesia"
              className="w-full h-full object-contain filter drop-shadow-[0_12px_30px_rgba(0,0,0,0.5)] transition transform active:scale-95 duration-200"
            />
          </div>
        </div>

      </div>

      {/* --- Bottom: Subtle Animated Indicator & Progress Bar --- */}
      <div className="w-full pb-3 flex flex-col items-center z-10 space-y-2">
        
        {/* Animated Tap Prompt */}
        <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-blue-200/80 tracking-wider uppercase animate-pulse">
          <span>Sentuh Layar Untuk Lanjut</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#F5A623]" />
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
