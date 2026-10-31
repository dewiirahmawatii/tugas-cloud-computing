import React, { useState, useEffect } from 'react';
import { History, ShieldAlert, MessageCircle, CheckCircle, Clock, MapPin, ChevronRight, X, Star } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';
import { api } from '../../services/api';

export default function RiwayatScreen({ onSelectReport }) {
  const [filter, setFilter] = useState('all'); // all, sos, konseling
  const [historyList, setHistoryList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    api.getHistory().then((res) => {
      if (res && res.history) {
        setHistoryList(res.history);
      }
    });
  }, []);

  const filteredItems = historyList.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'sos') return item.type !== 'Konseling';
    if (filter === 'konseling') return item.type === 'Konseling';
    return true;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#070d1a] text-slate-100 select-none pb-4">
      
      <HeaderBar title="Riwayat Aktivitas" showBack={false} />

      {/* Filter Tabs */}
      <div className="px-5 py-3 flex space-x-2 border-b border-blue-950">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition ${
            filter === 'all'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-[#0f1f3d] text-slate-400 hover:text-white'
          }`}
        >
          Semua ({historyList.length})
        </button>
        <button
          onClick={() => setFilter('sos')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition ${
            filter === 'sos'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-[#0f1f3d] text-slate-400 hover:text-white'
          }`}
        >
          Darurat SOS
        </button>
        <button
          onClick={() => setFilter('konseling')}
          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition ${
            filter === 'konseling'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-[#0f1f3d] text-slate-400 hover:text-white'
          }`}
        >
          Konseling
        </button>
      </div>

      {/* History List */}
      <div className="px-5 py-4 space-y-3 flex-1 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <History className="w-10 h-10 mx-auto text-slate-600 mb-2" />
            <p className="text-xs">Belum ada catatan riwayat pada kategori ini.</p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isSos = item.type !== 'Konseling';
            const isDone = item.status === 'Selesai';

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-[#0e1d3b] hover:bg-[#14264d] border border-blue-900/50 rounded-2xl p-4 transition cursor-pointer shadow-md active:scale-98"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSos ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                    }`}>
                      {isSos ? <ShieldAlert className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-blue-400">
                        {item.type}
                      </span>
                      <h4 className="text-xs font-bold text-white line-clamp-1">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border shrink-0 ${
                    isDone 
                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-blue-950 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center space-x-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <span className="text-[10px] shrink-0 font-medium text-slate-500">
                    {item.date}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 select-none animate-in fade-in">
          <div className="w-full max-w-sm bg-[#0e1d3b] border border-blue-800/80 rounded-3xl p-5 shadow-2xl relative">
            
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 mb-3">
              <span className="text-[10px] font-bold bg-blue-600/30 text-blue-300 px-2.5 py-0.5 rounded-full uppercase border border-blue-500/30">
                Tiket {selectedItem.id}
              </span>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full">
                {selectedItem.status}
              </span>
            </div>

            <h3 className="text-sm font-extrabold text-white mb-2 leading-snug">
              {selectedItem.title}
            </h3>

            <div className="space-y-2 text-xs bg-[#091326] p-3 rounded-xl border border-blue-950 my-3">
              <div>
                <span className="text-slate-400 block text-[10px]">Waktu Pelaporan:</span>
                <span className="text-white font-medium">{selectedItem.date}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Lokasi Kejadian:</span>
                <span className="text-white font-medium">{selectedItem.location}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Petugas / Konselor Pendamping:</span>
                <span className="text-cyan-300 font-semibold">{selectedItem.officer}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Catatan / Keluhan:</span>
                <span className="text-slate-200">{selectedItem.note}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <div className="flex items-center space-x-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-[11px] text-slate-300 ml-1 font-bold">5.0 (Puas)</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs transition"
            >
              Tutup Rincian Tiket
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
