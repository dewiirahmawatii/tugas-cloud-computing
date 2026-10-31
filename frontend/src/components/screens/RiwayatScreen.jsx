import React, { useState, useEffect } from 'react';
import { ArrowLeft, X, Star, RefreshCw, Camera, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { api } from '../../services/api';

export default function RiwayatScreen({ onBack, onSelectReport }) {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  // Load history from backend API
  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await api.getHistory();
      if (res && res.history) {
        setReports(res.history);
      }
    } catch (err) {
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-[#1E3866] text-white select-none overflow-hidden">
      
      {/* Top Header with Back Arrow, Title, and Refresh Button */}
      <div className="px-5 pt-3 pb-3 flex items-center justify-between border-b border-[#2b4c85] shrink-0">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] active:bg-[#254680] border border-[#2b4c85] flex items-center justify-center text-white transition active:scale-95 shadow-md"
            title="Kembali"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-base sm:text-lg font-black text-[#F5A623] tracking-wide">
            Riwayat Pelaporan
          </h2>
        </div>

        <button
          onClick={fetchReports}
          disabled={loading}
          className="w-8 h-8 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] border border-[#2b4c85] flex items-center justify-center text-blue-200 transition active:scale-90"
          title="Segarkan Riwayat"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#F5A623]' : 'text-slate-300'}`} />
        </button>
      </div>

      {/* List of Live Report Cards */}
      <div className="px-5 py-4 space-y-3.5 flex-1 overflow-y-auto min-h-0 pb-6">
        
        {loading && reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400 space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin text-[#F5A623]" />
            <p className="text-xs">Memuat riwayat dari server...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <ShieldCheck className="w-10 h-10 mx-auto text-blue-400/40 mb-2" />
            <p className="text-xs">Belum ada riwayat laporan darurat.</p>
          </div>
        ) : (
          reports.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedItem(item);
                if (onSelectReport) onSelectReport(item);
              }}
              className="bg-[#162a4d] hover:bg-[#1a335c] border border-[#2b4c85] rounded-2xl p-4 transition cursor-pointer shadow-md active:scale-98 relative"
            >
              {/* Top Row: Title + Status Pill */}
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    {item.title || item.type || "Laporan Darurat"}
                  </h3>
                  {item.photoUrl && (
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-[10px]" title="Ada foto bukti lampiran">
                      <Camera className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <span className={`w-8 h-2.5 rounded-full ${item.statusColor || 'bg-emerald-500'} shadow-sm`}></span>
              </div>

              {/* Location / Note */}
              <p className="text-xs text-blue-200 mt-2 font-medium flex items-center gap-1.5 line-clamp-1">
                <MapPin className="w-3 h-3 text-[#F5A623] shrink-0" />
                {item.location}
              </p>

              {/* Date & ID */}
              <div className="flex justify-between items-center mt-2 text-[11px] text-slate-300 border-t border-[#2b4c85]/50 pt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {item.date}
                </span>
                <span className="text-[10px] font-semibold text-[#F5A623] bg-[#F5A623]/10 px-2 py-0.5 rounded-md">
                  {item.status || "Selesai"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Item Detail Modal with Photo Proof Preview */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 select-none animate-in fade-in">
          <div className="w-full max-w-xs bg-[#162a4d] border border-[#2b4c85] rounded-3xl p-5 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 mb-2">
              <span className="text-[10px] font-bold bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/40 px-2.5 py-0.5 rounded-full uppercase">
                {selectedItem.id}
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                {selectedItem.status || "Selesai"}
              </span>
            </div>

            <h3 className="text-base font-extrabold text-white mt-2">
              {selectedItem.title || selectedItem.type}
            </h3>

            {/* Photo Attachment Preview (If Uploaded) */}
            {selectedItem.photoUrl && (
              <div className="mt-3 rounded-xl overflow-hidden border border-[#2b4c85] bg-black/40">
                <div className="px-2.5 py-1 bg-[#0f1f3d] text-[10px] text-blue-300 font-bold flex items-center gap-1">
                  <Camera className="w-3 h-3 text-[#F5A623]" /> Foto Bukti Terlampir di Server
                </div>
                <img
                  src={selectedItem.photoUrl}
                  alt="Bukti Laporan"
                  className="w-full max-h-40 object-cover"
                />
              </div>
            )}

            <div className="space-y-2 mt-4 text-xs">
              <div className="bg-[#0f1f3d] p-3 rounded-xl border border-blue-900/60">
                <span className="text-slate-400 block text-[10px] font-semibold uppercase">Titik Lokasi:</span>
                <span className="text-white font-medium flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  {selectedItem.location}
                </span>
              </div>

              <div className="bg-[#0f1f3d] p-3 rounded-xl border border-blue-900/60">
                <span className="text-slate-400 block text-[10px] font-semibold uppercase">Petugas Penangan:</span>
                <span className="text-[#F5A623] font-bold mt-0.5 block">
                  {selectedItem.officer || "Tim Satgas & Satpam UTDI"}
                </span>
              </div>

              <div className="bg-[#0f1f3d] p-3 rounded-xl border border-blue-900/60">
                <span className="text-slate-400 block text-[10px] font-semibold uppercase">Keterangan Penanganan:</span>
                <span className="text-slate-200 mt-0.5 block leading-relaxed text-[11px]">
                  {selectedItem.note || "Tindakan penanganan cepat telah diselesaikan oleh posko keamanan kampus."}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="w-full mt-4 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-2.5 rounded-xl text-xs shadow-md border border-blue-400/30 transition active:scale-95"
            >
              Tutup Rincian
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
