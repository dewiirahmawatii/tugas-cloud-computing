import React from 'react';
import HeaderBar from '../common/HeaderBar';

export default function SplashScreen({ onStart }) {
  return (
    <div 
      onClick={onStart}
      className="flex-1 flex flex-col justify-between items-center text-center px-6 py-6 bg-[#1E3866] text-white relative select-none cursor-pointer transition-colors"
    >
      <HeaderBar transparent={true} />

      {/* Main Center: Official UTDI Emblem Logo from User Upload */}
      <div className="my-auto flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
        <div className="relative w-56 h-56 flex items-center justify-center">
          <img
            src="/assets/utdi-logo.png"
            alt="Logo Universitas Teknologi Digital Indonesia"
            className="w-full h-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
          />
        </div>
      </div>

      {/* Subtle indicator bar */}
      <div className="w-full pb-2 flex flex-col items-center">
        <div className="w-32 h-1 bg-white/30 rounded-full"></div>
      </div>
    </div>
  );
}
