import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { playPhoneRing, stopPhoneRing } from '../../utils/audio';

export default function VoiceCallScreen({ counselor, onEndCall, soundEnabled }) {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [callState, setCallState] = useState('connected'); // 'ringing' or 'connected'

  const activeCounselor = counselor || {
    name: "Dr. Rina Wulandari, M.Psi.",
    title: "Psikolog Klinis UTDI",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col justify-between items-center text-center px-6 py-8 bg-[#1E3866] text-slate-100 select-none relative overflow-hidden">
      
      {/* Top Encryption Badge */}
      <div className="inline-flex items-center space-x-1.5 bg-blue-950/80 border border-blue-800/60 rounded-full px-3 py-1 text-[10px] text-blue-300">
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
        <span>Panggilan Terenkripsi End-to-End</span>
      </div>

      {/* Center Caller Graphic & Sound Waves */}
      <div className="my-auto flex flex-col items-center">
        
        {/* Pulsing concentric sound waves */}
        <div className="relative mb-6">
          <div className="w-48 h-48 rounded-full border-2 border-blue-500/20 absolute -inset-6 animate-ping-slow pointer-events-none"></div>
          <div className="w-40 h-40 rounded-full border border-blue-400/30 absolute -inset-2 pointer-events-none"></div>

          <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-2xl">
            <img
              src={activeCounselor.avatar}
              alt={activeCounselor.name}
              className="w-full h-full rounded-full object-cover border-4 border-[#0b162c]"
            />
          </div>
        </div>

        {/* Name and Status */}
        <h2 className="text-lg font-extrabold text-white tracking-tight mb-1">
          {activeCounselor.name}
        </h2>
        <p className="text-xs font-medium text-blue-300/80 mb-3">
          {activeCounselor.title}
        </p>

        {/* Live Call Duration */}
        <div className="text-2xl font-black font-mono tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-2xl shadow-inner">
          {formatTimer(callDuration)}
        </div>

        <p className="text-[11px] text-slate-400 mt-2">
          Kualitas Audio: HD Voice (Sangat Jernih)
        </p>
      </div>

      {/* Bottom Call Controls */}
      <div className="w-full max-w-xs space-y-6">
        
        {/* Mic & Speaker toggles */}
        <div className="flex justify-around items-center px-4">
          
          {/* Mute Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex flex-col items-center justify-center transition shadow-lg ${
              isMuted
                ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                : 'bg-[#122347] text-slate-200 border border-blue-800/60 hover:bg-[#1a3366]'
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          {/* Speaker Toggle */}
          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`w-14 h-14 rounded-full flex flex-col items-center justify-center transition shadow-lg ${
              isSpeaker
                ? 'bg-blue-600 text-white shadow-blue-600/40'
                : 'bg-[#122347] text-slate-200 border border-blue-800/60 hover:bg-[#1a3366]'
            }`}
          >
            {isSpeaker ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>

        </div>

        {/* Big Red End Call Button */}
        <div>
          <button
            onClick={onEndCall}
            className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center mx-auto shadow-2xl shadow-red-700/60 transition transform active:scale-90"
          >
            <PhoneOff className="w-7 h-7" />
          </button>
          <span className="text-[11px] text-slate-400 font-semibold block mt-2">
            Akhiri Panggilan
          </span>
        </div>

      </div>

    </div>
  );
}

