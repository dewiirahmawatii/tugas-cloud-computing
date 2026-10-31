import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessModal({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 select-none animate-in fade-in">
      <div className="w-full max-w-xs bg-[#0e1d3b] border-2 border-emerald-500/50 rounded-3xl p-6 text-center shadow-2xl relative">
        
        {/* Animated Checkmark Circle */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-4 text-emerald-400 animate-bounce">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        <h3 className="text-base font-extrabold text-white tracking-tight">
          Berhasil Diperbarui! (acc...)
        </h3>
        
        <p className="text-xs text-slate-300 mt-2 mb-5 leading-relaxed">
          {message}
        </p>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-lg shadow-emerald-900/40 transition"
        >
          Selesai & Lanjutkan
        </button>

      </div>
    </div>
  );
}
