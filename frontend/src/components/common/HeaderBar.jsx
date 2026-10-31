import React from 'react';
import { ChevronLeft, Wifi, BatteryMedium, Signal, Shield } from 'lucide-react';

export default function HeaderBar({ 
  title, 
  onBack, 
  showBack = false, 
  rightElement = null, 
  transparent = false 
}) {
  const currentTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`w-full z-40 select-none ${transparent ? 'bg-transparent' : 'bg-[#0b162c]/95 border-b border-blue-900/40 backdrop-blur-md sticky top-0'}`}>
      
      {/* Mobile OS Status Bar */}
      <div className="flex items-center justify-between px-6 pt-1 pb-1 text-[11px] font-semibold text-slate-300">
        <span>{currentTime}</span>
        <div className="flex items-center space-x-1.5">
          <Signal className="w-3.5 h-3.5 text-slate-300" />
          <Wifi className="w-3.5 h-3.5 text-slate-300" />
          <div className="flex items-center">
            <BatteryMedium className="w-4 h-4 text-slate-300" />
          </div>
        </div>
      </div>

      {/* Screen Title Bar (if title provided) */}
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center space-x-2">
            {showBack && (
              <button
                onClick={onBack}
                className="w-8 h-8 rounded-full bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/50 flex items-center justify-center text-blue-200 transition active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <h2 className="text-base font-bold text-white tracking-tight">{title}</h2>
          </div>
          {rightElement && <div>{rightElement}</div>}
        </div>
      )}
    </div>
  );
}
