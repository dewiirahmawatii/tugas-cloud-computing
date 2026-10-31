import React, { useState } from 'react';
import { 
  Bell, MapPin, Siren, PhoneCall, MessageSquareHeart, 
  BookOpen, Users, PhoneForwarded, AlertCircle, ChevronRight,
  ShieldCheck, Radio, CheckCircle2
} from 'lucide-react';
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
    <div className="flex-1 flex flex-col bg-[#070d1a] text-slate-100 select-none pb-4">
      
      <HeaderBar transparent={true} />

      {/* Top User Greeting & Status Bar */}
      <div className="px-5 pt-1 pb-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative cursor-pointer" onClick={() => onNavigate('profil')}>
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
              alt="Profil"
              className="w-11 h-11 rounded-full object-cover border-2 border-blue-500/60 shadow-md"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#070d1a] rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="text-sm font-extrabold text-white tracking-tight">
                Halo, {user?.name?.split(' ')[0] || 'Mahasiswa'} 👋
              </h3>
            </div>
            <p className="text-[11px] font-medium text-blue-300/80">
              {user?.nim || '215410089'} • {user?.prodi || 'Informatika'}
            </p>
          </div>
        </div>

        {/* Bell Notification */}
        <button
          onClick={() => alert("Tidak ada notifikasi darurat baru saat ini. Kampus terpantau aman.")}
          className="w-9 h-9 rounded-xl bg-[#112142] border border-blue-800/60 flex items-center justify-center text-blue-300 hover:text-white transition relative shadow-sm"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      {/* Live Campus Location Pill */}
      <div className="px-5 mb-3">
        <div className="bg-[#0f1f3d]/90 border border-blue-900/50 rounded-xl px-3 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-slate-300 truncate">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0 animate-bounce" />
            <span className="truncate text-[11px] font-medium">
              Kampus UTDI: <strong className="text-white">Gedung Lab 3 Lt. 2</strong>
            </span>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold shrink-0 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Aman
          </span>
        </div>
      </div>

      <div className="px-5 space-y-4">
        
        {/* --- MAIN HERO SOS BUTTON (Iconic Red Box from Figma) --- */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-rose-700 to-red-900 p-5 shadow-2xl shadow-red-900/50 border border-red-500/50">
          
          {/* Subtle Radar rings in background */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full border-4 border-white/10 pointer-events-none animate-ping-slow"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/40 flex items-center justify-center mb-3 shadow-inner cursor-pointer active:scale-95 transition"
                 onClick={handleSosPress}>
              <Siren className="w-8 h-8 text-white animate-bounce" />
            </div>

            <h3 className="text-lg font-black text-white tracking-wide uppercase drop-shadow">
              TOMBOL DARURAT (SOS)
            </h3>
            <p className="text-[11px] text-red-100 max-w-[260px] font-medium mt-1 leading-snug">
              Tekan untuk memanggil bantuan Satpam Kampus & Tim Medis darurat seketika
            </p>

            {/* Quick Action Button */}
            <button
              onClick={handleSosPress}
              className="mt-3.5 w-full bg-white text-red-700 hover:bg-red-50 font-extrabold text-xs py-3 px-4 rounded-xl shadow-lg flex items-center justify-center space-x-2 transition transform active:scale-95"
            >
              <Radio className="w-4 h-4 text-red-600 animate-pulse" />
              <span>TEKAN UNTUK BANTUAN SEKARANG</span>
            </button>
          </div>
        </div>

        {/* SOS Countdown Modal Overlay */}
        {sosConfirming && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 select-none animate-in fade-in">
            <div className="w-full max-w-xs bg-[#111f3b] border-2 border-red-500 rounded-3xl p-6 text-center shadow-2xl flex flex-col items-center">
              
              <div className="w-20 h-20 rounded-full bg-red-600/30 border-4 border-red-500 flex items-center justify-center text-3xl font-black text-white mb-4 animate-ping-slow">
                {countdown}
              </div>

              <h4 className="text-base font-extrabold text-white">Memancarkan Sinyal Darurat!</h4>
              <p className="text-xs text-slate-300 mt-2 mb-5">
                Pos Satpam UTDI akan menerima koordinat lokasimu dalam hitungan detik.
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

        {/* --- FITUR-FITUR UTAMA (GRID MENU) --- */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-blue-500 rounded-full"></span>
              Layanan Utama Mahasiswa
            </h4>
            <span className="text-[10px] text-blue-400 font-medium">Siaga 24 Jam</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            
            {/* 1. Lapor Darurat & Peta */}
            <div
              onClick={() => onNavigate('lapor-darurat')}
              className="bg-[#0f1f3d] hover:bg-[#152a52] border border-blue-900/50 p-3.5 rounded-2xl flex flex-col justify-between cursor-pointer transition transform active:scale-97 group shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-105 transition">
                  <MapPin className="w-5 h-5 text-red-400" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
              </div>
              <div className="mt-3">
                <span className="text-xs font-bold text-white block">Peta & Lapor SOS</span>
                <span className="text-[10px] text-slate-400">Kirim titik lokasi GPS</span>
              </div>
            </div>

            {/* 2. Nomor Darurat */}
            <div
              onClick={() => onNavigate('nomor-darurat')}
              className="bg-[#0f1f3d] hover:bg-[#152a52] border border-blue-900/50 p-3.5 rounded-2xl flex flex-col justify-between cursor-pointer transition transform active:scale-97 group shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition">
                  <PhoneCall className="w-5 h-5 text-amber-400" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
              </div>
              <div className="mt-3">
                <span className="text-xs font-bold text-white block">Nomor Darurat</span>
                <span className="text-[10px] text-slate-400">Satpam, Polisi, IGD 118</span>
              </div>
            </div>

            {/* 3. Konsultasi Online */}
            <div
              onClick={() => onNavigate('konselor-list')}
              className="bg-[#0f1f3d] hover:bg-[#152a52] border border-blue-900/50 p-3.5 rounded-2xl flex flex-col justify-between cursor-pointer transition transform active:scale-97 group shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition">
                  <MessageSquareHeart className="w-5 h-5 text-blue-400" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
              </div>
              <div className="mt-3">
                <span className="text-xs font-bold text-white block">Konseling & Chat</span>
                <span className="text-[10px] text-slate-400">Konselor BK & PPKS</span>
              </div>
            </div>

            {/* 4. Panggilan Suara */}
            <div
              onClick={() => onNavigate('voice-call')}
              className="bg-[#0f1f3d] hover:bg-[#152a52] border border-blue-900/50 p-3.5 rounded-2xl flex flex-col justify-between cursor-pointer transition transform active:scale-97 group shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition">
                  <PhoneForwarded className="w-5 h-5 text-emerald-400" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
              </div>
              <div className="mt-3">
                <span className="text-xs font-bold text-white block">Panggilan Suara</span>
                <span className="text-[10px] text-slate-400">Konsultasi via audio</span>
              </div>
            </div>

            {/* 5. Informasi & Edukasi */}
            <div
              onClick={() => onNavigate('informasi-list')}
              className="bg-[#0f1f3d] hover:bg-[#152a52] border border-blue-900/50 p-3.5 rounded-2xl flex flex-col justify-between cursor-pointer transition transform active:scale-97 group shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
              </div>
              <div className="mt-3">
                <span className="text-xs font-bold text-white block">Panduan Edukasi</span>
                <span className="text-[10px] text-slate-400">Gempa, PPKS, P3K</span>
              </div>
            </div>

            {/* 6. Kontak Darurat Saya */}
            <div
              onClick={() => onNavigate('kontak-darurat')}
              className="bg-[#0f1f3d] hover:bg-[#152a52] border border-blue-900/50 p-3.5 rounded-2xl flex flex-col justify-between cursor-pointer transition transform active:scale-97 group shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition">
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
              </div>
              <div className="mt-3">
                <span className="text-xs font-bold text-white block">Kontak Kerabat</span>
                <span className="text-[10px] text-slate-400">Keluarga & teman kost</span>
              </div>
            </div>

          </div>
        </div>

        {/* --- EDUKASI & INFORMASI BANNER --- */}
        <div 
          onClick={() => onNavigate('informasi-list')}
          className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-[#0f1f3d] border border-blue-800/40 rounded-2xl p-3.5 flex items-center space-x-3 cursor-pointer hover:border-blue-600/50 transition shadow-md"
        >
          <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-300 shrink-0">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
              Edukasi Keselamatan UTDI
            </span>
            <h5 className="text-xs font-bold text-white truncate">
              Ketahui 3 Titik Kumpul Aman Gempa di Kampus
            </h5>
            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
              Panduan evakuasi resmi dari Biro Keselamatan & Sarpras UTDI.
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        </div>

        {/* --- QUICK RECENT ACTIVITY PREVIEW --- */}
        <div className="bg-[#0b162c] border border-blue-900/40 rounded-2xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-300">Riwayat Terkini</span>
            <button
              onClick={() => onNavigate('riwayat')}
              className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold"
            >
              Lihat Semua
            </button>
          </div>

          <div 
            onClick={() => onNavigate('riwayat')}
            className="flex items-center space-x-3 bg-[#112142]/60 p-2.5 rounded-xl border border-blue-900/30 cursor-pointer hover:bg-[#15274d] transition"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">Pertolongan Pertama Lab 3</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-semibold">Selesai</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">31 Okt 2026 • Petugas Security UTDI</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
