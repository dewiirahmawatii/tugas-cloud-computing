import React, { useState } from 'react';
import { Phone, BookOpen, MessageSquare, AlertCircle, Sun, Bell } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';

export default function HomeScreen({ 
  user, 
  onNavigate, 
  onTriggerSos, 
  soundEnabled 
}) {
  const [sosConfirming, setSosConfirming] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleSosPress = () => {
    setSosConfirming(true);
    let count = 3;
    setCountdown(count);

    const timer = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(timer);
        setSosConfirming(false);
        onTriggerSos({
          type: "Darurat Seketika (Tombol SOS)",
          location: "Kampus UTDI - Lab Terpadu Lt. 2",
          note: "Sinyal SOS dipicu langsung dari tombol merah beranda aplikasi."
        });
      }
    }, 1000);
  };

  const handleCancelSos = () => {
    setSosConfirming(false);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#1E3866] text-white select-none px-5 pt-1 pb-4">
      
      <div>
        <HeaderBar transparent={true} />

        {/* --- Top Header Card: Logo Satgas + SISTEM PENANGAN CEPAT --- */}
        <div className="mt-3 bg-[#162a4d] border border-[#2b4c85] rounded-2xl p-4 flex items-center space-x-3.5 shadow-lg">
          
          {/* Logo Satgas PPKS in White Circle */}
          <div className="w-13 h-13 rounded-full bg-white p-1 flex items-center justify-center shrink-0 shadow-md">
            <img
              src="/assets/satgas-ppks.jpg"
              alt="Logo Satgas PPKS"
              className="w-11 h-11 object-contain rounded-full"
            />
          </div>

          {/* Golden Yellow Heading */}
          <div className="flex flex-col justify-center">
            <h2 className="text-base sm:text-lg font-black tracking-wider text-[#F5A623] uppercase leading-tight drop-shadow-sm">
              SISTEM PENANGAN
            </h2>
            <h2 className="text-base sm:text-lg font-black tracking-wider text-[#F5A623] uppercase leading-tight drop-shadow-sm">
              CEPAT
            </h2>
          </div>
        </div>

        {/* --- Two Grid Cards: Kontak Darurat & Informasi --- */}
        <div className="grid grid-cols-2 gap-3.5 mt-5">
          
          {/* Left Card: Kontak Darurat */}
          <div
            onClick={() => onNavigate('nomor-darurat')}
            className="bg-[#162a4d] hover:bg-[#1a335c] border border-[#2b4c85] rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition active:scale-97 shadow-md group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 mb-2 group-hover:scale-105 transition">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xs font-bold text-white tracking-wide">
              Kontak Darurat
            </h3>
            <p className="text-[10px] text-blue-200/80 mt-0.5">
              Telepon & Hotline
            </p>
          </div>

          {/* Right Card: Informasi */}
          <div
            onClick={() => onNavigate('informasi-list')}
            className="bg-[#162a4d] hover:bg-[#1a335c] border border-[#2b4c85] rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer transition active:scale-97 shadow-md group"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 mb-2 group-hover:scale-105 transition">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xs font-bold text-white tracking-wide">
              Informasi
            </h3>
            <p className="text-[10px] text-blue-200/80 mt-0.5">
              Panduan Edukasi
            </p>
          </div>

        </div>

        {/* --- Big Red Emergency Banner: LAPOR DARURAT --- */}
        <div
          onClick={handleSosPress}
          className="mt-5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 border border-red-400/50 rounded-2xl p-4 flex items-center space-x-3.5 cursor-pointer shadow-xl transition active:scale-98"
        >
          {/* Glowing Sun / Siren Icon in Circle */}
          <div className="w-12 h-12 rounded-full bg-[#F5A623] flex items-center justify-center text-white shrink-0 shadow-lg animate-pulse">
            <Sun className="w-7 h-7 text-white stroke-[2.5]" />
          </div>

          {/* Text: LAPOR DARURAT */}
          <div>
            <h3 className="text-sm sm:text-base font-black text-white tracking-wider uppercase drop-shadow">
              LAPOR DARURAT
            </h3>
            <p className="text-[11px] text-red-100 font-medium">
              Prioritas • Kirim Sinyal Bantuan
            </p>
          </div>
        </div>

        {/* --- Bottom Wide Card: Konsultasi --- */}
        <div
          onClick={() => onNavigate('konsultasi')}
          className="mt-5 bg-[#162a4d] hover:bg-[#1a335c] border border-[#2b4c85] rounded-2xl p-4 flex items-center space-x-3.5 cursor-pointer shadow-md transition active:scale-98"
        >
          {/* Chat Bubble Icon */}
          <div className="w-11 h-11 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>

          {/* Text */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
              Konsultasi
            </h3>
            <p className="text-[10px] text-blue-200/80">
              Curhat & Pendampingan Satgas
            </p>
          </div>
        </div>

      </div>

      {/* SOS Countdown Modal */}
      {sosConfirming && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 select-none animate-in fade-in">
          <div className="w-full max-w-xs bg-[#162a4d] border-2 border-red-500 rounded-3xl p-6 text-center shadow-2xl flex flex-col items-center">
            
            <div className="w-20 h-20 rounded-full bg-red-600/30 border-4 border-red-500 flex items-center justify-center text-3xl font-black text-white mb-4 animate-ping-slow">
              {countdown}
            </div>

            <h4 className="text-base font-extrabold text-white">Memancarkan Sinyal Darurat!</h4>
            <p className="text-xs text-slate-200 mt-2 mb-5">
              Pos Satpam & Satgas PPKPS UTDI akan menerima koordinat lokasimu dalam hitungan detik.
            </p>

            <div className="w-full space-y-2">
              <button
                onClick={() => {
                  setSosConfirming(false);
                  onTriggerSos({
                    type: "Sinyal Darurat Segera",
                    location: "Kampus UTDI - Gedung Lab 3",
                    note: "Pemicuan langsung tanpa menunggu hitung mundur."
                  });
                }}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 rounded-xl text-xs transition"
              >
                Kirim Sekarang Juga
              </button>
              <button
                onClick={handleCancelSos}
                className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2 rounded-xl text-xs transition"
              >
                Batalkan (Salah Tekan)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
