import React, { useState, useEffect } from 'react';
import { Shield, Phone, Radio, CheckCircle, AlertTriangle, X, Navigation, Car } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';

export default function LiveSosTrackingScreen({ report, onCancel, onResolve }) {
  const [eta, setEta] = useState(3);
  const [carProgress, setCarProgress] = useState(20); // percentage along path

  // Simulate vehicle moving towards user
  useEffect(() => {
    const interval = setInterval(() => {
      setCarProgress((prev) => {
        if (prev >= 85) return 85;
        return prev + 5;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#1E3866] text-slate-100 select-none pb-4">
      
      <div>
        <HeaderBar 
          title="Tracking Sinyal Darurat (Dar...)" 
          showBack={false}
          rightElement={
            <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> SOS Aktif
            </span>
          }
        />

        {/* Live Animated Map Container */}
        <div className="relative w-full h-56 bg-[#0a1429] overflow-hidden border-b border-blue-900/60 shadow-xl">
          
          {/* Radar background grid */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Animated radar wave circle around target */}
          <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border border-red-500/30 animate-ping"></div>

          {/* Route path line from Security Post to Student */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 50 150 Q 140 120, 220 110 T 290 95"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeDasharray="6 6"
              className="animate-pulse"
            />
          </svg>

          {/* Security Post Pin (Start) */}
          <div className="absolute top-[135px] left-[35px] flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-900 border-2 border-blue-400 flex items-center justify-center text-blue-300 shadow-md">
              <Shield className="w-4 h-4" />
            </div>
            <span className="text-[8px] font-bold bg-black/80 text-blue-200 px-1.5 py-0.2 rounded mt-0.5">
              Pos Satpam
            </span>
          </div>

          {/* Patrol Vehicle Moving (Position calculated by carProgress) */}
          <div 
            className="absolute transition-all duration-1000 flex flex-col items-center z-20"
            style={{
              left: `${20 + (carProgress * 0.65)}%`,
              top: `${140 - (carProgress * 0.55)}px`
            }}
          >
            <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-black shadow-xl animate-bounce">
              <Car className="w-4 h-4" />
            </div>
            <span className="text-[8px] font-black bg-amber-500 text-black px-1.5 rounded shadow">
              Patroli
            </span>
          </div>

          {/* Student Location Target (Destination) */}
          <div className="absolute top-[75px] left-[73%] flex flex-col items-center z-10">
            <div className="w-10 h-10 rounded-full bg-red-600/40 border-2 border-red-400 flex items-center justify-center shadow-lg animate-pulse">
              <Radio className="w-5 h-5 text-white" />
            </div>
            <span className="text-[8px] font-black bg-red-600 text-white px-2 py-0.5 rounded-full mt-0.5 shadow">
              Titik Anda
            </span>
          </div>

          {/* Status Overlay Pill */}
          <div className="absolute bottom-3 left-4 right-4 bg-[#0a162e]/90 border border-blue-800/80 rounded-xl px-3 py-1.5 backdrop-blur-md flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[11px] font-bold text-white">ETA Petugas:</span>
            </div>
            <span className="text-xs font-black text-amber-400">~2 Menit (Sedang Meluncur)</span>
          </div>
        </div>

        {/* Dispatcher Details Card */}
        <div className="px-5 py-4 space-y-3">
          
          <div className="bg-[#0e1d3b] border border-blue-900/60 rounded-2xl p-4 shadow-lg">
            
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-blue-950">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">
                    {report?.officer || "Bripka Bambang & Tim Security"}
                  </h4>
                  <p className="text-[10px] text-blue-300">
                    Unit Reaksi Cepat Kampus UTDI
                  </p>
                </div>
              </div>

              <a
                href="tel:0274-486664"
                className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-500 shadow-md shadow-emerald-950/50"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px] text-slate-300">Sinyal diterima Pos Satpam Utama (14:15)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px] text-slate-300">Regu 01 meluncur ke Gedung Lab Terpadu</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-4 h-4 rounded-full border-2 border-amber-400 flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                </span>
                <span className="text-[11px] font-bold text-amber-300">Petugas mendekati lokasi kejadian...</span>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={onResolve}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Bantuan Diterima</span>
            </button>
            <button
              onClick={onCancel}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition"
            >
              <X className="w-4 h-4" />
              <span>Batalkan Sinyal</span>
            </button>
          </div>

        </div>
      </div>

      <div className="px-5 text-center text-[10px] text-slate-400">
        Tetap berada di lokasi aman. Tim keamanan UTDI segera tiba.
      </div>

    </div>
  );
}

