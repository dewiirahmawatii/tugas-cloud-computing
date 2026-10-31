import React, { useState } from 'react';
import { ArrowLeft, X, Star } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';

export default function RiwayatScreen({ onBack, onSelectReport }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const reports = [
    {
      id: "REP-280526-01",
      title: "Laporan Darurat",
      location: "Jl. Pemuda No. 17",
      date: "28 Mei 2026, 10:15",
      statusColor: "bg-emerald-500",
      statusText: "Selesai",
      officer: "Tim Reaksi Cepat Satgas & Satpam",
      note: "Pencegahan insiden dan pendampingan di lokasi."
    },
    {
      id: "REP-200526-02",
      title: "Konsultasi",
      location: "Chat dengan Satgas Dewi",
      date: "20 Mei 2026, 13:40",
      statusColor: "bg-amber-500",
      statusText: "Selesai",
      officer: "Satgas PPKS Dewi Rahmawati",
      note: "Sesi konseling pendampingan mahasiswa."
    },
    {
      id: "REP-150526-03",
      title: "Laporan Darurat",
      location: "Parkiran Kampus",
      date: "15 Mei 2026, 16:45",
      statusColor: "bg-emerald-500",
      statusText: "Selesai",
      officer: "Danru Pos Satpam UTDI",
      note: "Patroli pengamanan area parkir timur."
    }
  ];

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-[#1E3866] text-white select-none overflow-hidden">
      
      {/* Top Header with Back Arrow and Golden Yellow Title */}
      <div className="px-5 pt-3 pb-3 flex items-center space-x-3 border-b border-[#2b4c85] shrink-0">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] border border-[#2b4c85] flex items-center justify-center text-blue-200 transition active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h2 className="text-base sm:text-lg font-black text-[#F5A623] tracking-wide">
          Riwayat Pelaporan
        </h2>
      </div>

      {/* List of Report Cards */}
      <div className="px-5 py-4 space-y-4 flex-1 overflow-y-auto min-h-0 pb-6">
        {reports.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="bg-[#162a4d] hover:bg-[#1a335c] border border-[#2b4c85] rounded-2xl p-4 transition cursor-pointer shadow-md active:scale-98 relative"
          >
            {/* Top Right Status Pill Indicator (Green or Amber bar) */}
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-bold text-white tracking-wide">
                {item.title}
              </h3>
              <span className={`w-8 h-2.5 rounded-full ${item.statusColor} shadow-sm`}></span>
            </div>

            {/* Location / Note */}
            <p className="text-xs text-blue-200 mt-2 font-medium">
              {item.location}
            </p>

            {/* Date */}
            <p className="text-[11px] text-slate-300 mt-1">
              {item.date}
            </p>
          </div>
        ))}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 select-none animate-in fade-in">
          <div className="w-full max-w-xs bg-[#162a4d] border border-[#2b4c85] rounded-3xl p-5 shadow-2xl relative">
            
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-bold bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/40 px-2.5 py-0.5 rounded-full uppercase">
              {selectedItem.id}
            </span>

            <h3 className="text-sm font-black text-white mt-2 mb-3">
              {selectedItem.title}
            </h3>

            <div className="space-y-2 text-xs bg-[#112140] p-3 rounded-xl border border-[#203a68] mb-3">
              <div>
                <span className="text-slate-400 block text-[10px]">Lokasi / Topik:</span>
                <span className="text-white font-medium">{selectedItem.location}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Waktu:</span>
                <span className="text-white font-medium">{selectedItem.date}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Petugas Pendamping:</span>
                <span className="text-[#F5A623] font-semibold">{selectedItem.officer}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Keterangan:</span>
                <span className="text-slate-200">{selectedItem.note}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="w-full bg-[#F5A623] hover:bg-amber-400 text-slate-900 font-extrabold py-2.5 rounded-xl text-xs transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
