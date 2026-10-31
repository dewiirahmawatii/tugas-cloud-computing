import React from 'react';
import { Compass, Shield, ArrowRight } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';

export default function SplashScreen({ onStart }) {
  return (
    <div className="flex-1 flex flex-col justify-between items-center text-center px-6 py-6 bg-gradient-to-b from-[#080d1a] via-[#0b162c] to-[#050811] relative overflow-hidden select-none">
      
      <HeaderBar transparent={true} />

      {/* Background Decorative Radar Waves */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[360px] h-[360px] rounded-full border border-blue-600/10 animate-ping-slow"></div>
        <div className="w-[280px] h-[280px] rounded-full border border-blue-500/20"></div>
        <div className="w-[200px] h-[200px] rounded-full border border-blue-400/25"></div>
      </div>

      {/* Main Center Glowing Emblem */}
      <div className="my-auto z-10 flex flex-col items-center">
        
        {/* Emblem Badge */}
        <div className="relative mb-6">
          <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
          
          <div className="relative w-32 h-32 rounded-full bg-[#0d1c3a] border-2 border-blue-400/50 flex flex-col items-center justify-center shadow-2xl p-4">
            
            {/* Geometric Compass Star */}
            <div className="relative w-16 h-16 flex items-center justify-center text-blue-400">
              <Compass className="w-16 h-16 stroke-[1.5] text-blue-300 animate-[spin_16s_linear_infinite]" />
              <Shield className="w-8 h-8 absolute text-cyan-400 fill-blue-900/60" />
            </div>

            <span className="text-[11px] font-black tracking-widest text-white mt-1 uppercase">UTDI</span>
          </div>
        </div>

        {/* Brand Text */}
        <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1">
          UTDI MOBILE CARE
        </h1>
        <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
          Campus Care & Emergency System
        </p>

        <div className="inline-flex items-center space-x-2 bg-blue-950/80 border border-blue-800/60 rounded-full px-4 py-1.5 shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span className="text-[11px] font-medium text-slate-300 tracking-wide">
            Digital • Global • Integrity
          </span>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="w-full z-10 pt-4 pb-2">
        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition transform active:scale-98"
        >
          <span>Mulai Aplikasi</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-[11px] text-slate-400 mt-3 font-normal">
          Universitas Teknologi Digital Indonesia (STMIK AKAKOM)
        </p>
      </div>

    </div>
  );
}
