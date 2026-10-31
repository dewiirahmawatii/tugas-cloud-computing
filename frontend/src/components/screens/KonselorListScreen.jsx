import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, Star, ShieldCheck, Search, ChevronRight, User } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';
import { api } from '../../services/api';

export default function KonselorListScreen({ onBack, onSelectCounselor, onStartCall }) {
  const [counselors, setCounselors] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.getCounselors().then((res) => {
      if (res && res.counselors) {
        setCounselors(res.counselors);
      }
    });
  }, []);

  const filtered = counselors.filter((c) => {
    const matchFilter = filter === 'all' || c.category === filter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                        c.specialties.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-[#1E3866] text-slate-100 select-none overflow-hidden">
      
      {/* Pinned Top Bar and Controls */}
      <div className="shrink-0">
        <HeaderBar title="Konsultasi Mahasiswa (kon...)" showBack={true} onBack={onBack} />

        {/* Search Input */}
        <div className="px-5 pt-3 pb-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari konselor psikologi, PPKS, karir..."
              className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="px-5 py-2 flex space-x-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'Semua Konselor' },
            { id: 'bk', label: 'Psikolog & BK' },
            { id: 'ppks', label: 'Satgas PPKS' },
            { id: 'akademik', label: 'Dosen Karir & IT' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition ${
                filter === tab.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-[#0f1f3d] text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Counselors List (Scrollable, BottomNav stays pinned!) */}
      <div className="px-5 py-3 space-y-3 flex-1 overflow-y-auto min-h-0 pb-6">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="bg-[#0e1d3b] hover:bg-[#13274e] border border-blue-900/50 rounded-2xl p-4 transition shadow-md"
          >
            <div className="flex items-start space-x-3.5">
              
              {/* Photo with status indicator */}
              <div className="relative shrink-0">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-13 h-13 rounded-2xl object-cover border-2 border-blue-500/50 shadow"
                />
                <span className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-[#0e1d3b] ${
                  c.status === 'online' ? 'bg-emerald-500' : 'bg-slate-500'
                }`}></span>
              </div>

              {/* Counselor Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-white truncate">{c.name}</h4>
                  <div className="flex items-center space-x-1 text-amber-400 text-[10px] font-bold shrink-0">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{c.rating}</span>
                  </div>
                </div>

                <p className="text-[11px] font-medium text-blue-300 truncate mt-0.5">
                  {c.title}
                </p>

                {/* Specialties chips */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {c.specialties.slice(0, 2).map((s, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] bg-blue-950 text-blue-200 border border-blue-800/60 px-2 py-0.5 rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-3.5 pt-2.5 border-t border-blue-950 flex items-center space-x-2">
              <button
                onClick={() => onSelectCounselor(c)}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow transition active:scale-97"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat Sekarang</span>
              </button>

              <button
                onClick={() => onStartCall(c)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center space-x-1 transition active:scale-97"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Panggil</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

