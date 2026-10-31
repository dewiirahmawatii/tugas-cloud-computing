import React from 'react';
import { Home, Clock, User } from 'lucide-react';

export default function BottomNav({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'riwayat', label: 'Riwayat', icon: Clock },
    { id: 'profil', label: 'Profil', icon: User },
  ];

  return (
    <nav className="w-full bg-[#162a4d] border-t border-[#2b4c85] px-6 pt-2 pb-4 flex items-center justify-around shadow-2xl shrink-0 z-40 select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center py-0.5 px-4 transition-all duration-150 active:scale-95 ${
              isActive ? 'text-[#F5A623]' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
            <span className={`text-[11px] font-semibold mt-0.5 ${isActive ? 'text-[#F5A623]' : 'text-slate-300'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
