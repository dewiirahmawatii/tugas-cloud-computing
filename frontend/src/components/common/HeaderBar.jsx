import React from 'react';
import { ChevronLeft, Wifi, BatteryMedium, Signal } from 'lucide-react';

export default function HeaderBar({ 
  title, 
  onBack, 
  showBack = false, 
  rightElement = null, 
  transparent = false 
}) {
  const currentTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`w-full z-40 select-none ${transparent ? 'bg-transparent' : 'bg-[#1E3866] border-b border-[#2b4c85] backdrop-blur-md sticky top-0'}`}>
      
      {/* Mobile OS Status Bar */}
      <div className="flex items-center justify-between px-6 pt-1 pb-1 text-[11px] font-semibold text-slate-200">
        <span>{currentTime}</span>
        <div className="flex items-center space-x-1.5">
          <Signal className="w-3.5 h-3.5 text-slate-200" />
          <Wifi className="w-3.5 h-3.5 text-slate-200" />
          <div className="flex items-center">
            <BatteryMedium className="w-4 h-4 text-slate-200" />
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
                className="w-8 h-8 rounded-full bg-[#162a4d] hover:bg-[#122340] border border-[#2b4c85] flex items-center justify-center text-blue-200 transition active:scale-95"
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
