import React from 'react';
import { Home, History, User } from 'lucide-react';

export default function BottomNav({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'riwayat', label: 'RIWAYAT', icon: History },
    { id: 'profil', label: 'PROFIL', icon: User },
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 w-full bg-[#162a4d] border-t border-[#2b4c85] backdrop-blur-lg px-6 py-2 z-40 flex items-center justify-around shadow-2xl shadow-black/40">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-4 rounded-2xl transition-all duration-200 relative group ${
              isActive ? 'text-[#F5A623] font-bold' : 'text-slate-300 hover:text-white font-medium'
            }`}
          >
            {/* Glowing active indicator pill */}
            {isActive && (
              <span className="absolute -top-2 w-8 h-1 bg-[#F5A623] rounded-full shadow-lg shadow-[#F5A623]/80"></span>
            )}
            
            <div className={`p-1 rounded-xl transition ${isActive ? 'bg-[#F5A623]/20 text-[#F5A623]' : 'group-hover:text-blue-200'}`}>
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
            </div>
            
            <span className={`text-[10px] tracking-wider uppercase mt-0.5 ${isActive ? 'text-[#F5A623] font-bold' : 'text-slate-300'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
