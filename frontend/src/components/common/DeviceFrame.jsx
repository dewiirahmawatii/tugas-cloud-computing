import React from 'react';
import { Smartphone, Monitor, Volume2, VolumeX, Layers, ShieldCheck } from 'lucide-react';

export default function DeviceFrame({ 
  children, 
  currentScreen, 
  onNavigate, 
  soundEnabled, 
  onToggleSound, 
  deviceMode, 
  onSetDeviceMode 
}) {
  const screensList = [
    { id: 'splash', label: '1. Splash Screen', group: 'Onboarding' },
    { id: 'onboarding1', label: '2. Onboarding 1', group: 'Onboarding' },
    { id: 'onboarding2', label: '3. Onboarding 2', group: 'Onboarding' },
    { id: 'login', label: '4. Login Akun', group: 'Auth' },
    { id: 'register', label: '5. Buat Akun Baru', group: 'Auth' },
    { id: 'home', label: '6. Beranda (Home)', group: 'Main' },
    { id: 'riwayat', label: '7. Riwayat Laporan', group: 'Main' },
    { id: 'profil', label: '8. Profil Mahasiswa', group: 'Main' },
    { id: 'nomor-darurat', label: '9. Nomor Darurat (nor...)', group: 'Fitur' },
    { id: 'lapor-darurat', label: '10. Peta & Lapor SOS (Da...)', group: 'Fitur' },
    { id: 'live-sos', label: '11. Tracking Tim SAR (Dar...)', group: 'Fitur' },
    { id: 'konselor-list', label: '12. Daftar Konselor (kon...)', group: 'Fitur' },
    { id: 'chat-room', label: '13. Chat Room Konseling', group: 'Fitur' },
    { id: 'voice-call', label: '14. Panggilan Suara Konselor', group: 'Fitur' },
    { id: 'informasi-list', label: '15. Panduan & Edukasi (Inf...)', group: 'Fitur' },
    { id: 'edit-profil', label: '16. Edit Profil (Pe...)', group: 'Profil' },
    { id: 'ganti-password', label: '17. Ganti Kata Sandi (ga...)', group: 'Profil' },
    { id: 'kontak-darurat', label: '18. Kontak Darurat Saya (Ko...)', group: 'Profil' },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col items-center justify-start p-2 sm:p-6 select-none font-sans">
      
      {/* Top Controller Bar */}
      <header className="w-full max-w-5xl mb-4 bg-[#0b162c]/90 border border-blue-900/40 backdrop-blur-md rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xl shadow-black/40">
        
        {/* Brand identity */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-500 p-0.5 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <div className="w-full h-full bg-[#0b162c] rounded-[10px] flex items-center justify-center">
              <span className="text-sm font-black tracking-tight text-white">UTDI</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold text-white tracking-wide">UTDI Mobile Care & SOS</h1>
              <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span> Live
              </span>
            </div>
            <p className="text-xs text-blue-300/70 font-medium">Figma Flow 1 Architecture • Digital - Global - Integrity</p>
          </div>
        </div>

        {/* Quick controls */}
        <div className="flex items-center flex-wrap gap-2">
          
          {/* Screen quick selector */}
          <div className="relative flex items-center">
            <Layers className="w-4 h-4 text-blue-400 absolute left-2.5 pointer-events-none" />
            <select
              value={currentScreen}
              onChange={(e) => onNavigate(e.target.value)}
              className="bg-[#122347] border border-blue-800/60 text-xs text-blue-100 rounded-xl pl-8 pr-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:bg-[#182d5a] transition shadow-inner font-medium"
            >
              <optgroup label="Alur Figma Flow 1:">
                {screensList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? "Nonaktifkan Efek Suara SOS" : "Aktifkan Efek Suara SOS"}
            className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition ${
              soundEnabled
                ? 'bg-blue-600/20 border-blue-500/50 text-blue-300'
                : 'bg-slate-800/50 border-slate-700 text-slate-400'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-blue-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Audio Aktif' : 'Mute'}</span>
          </button>

          {/* Device Frame View Toggle */}
          <div className="flex items-center bg-[#122347] p-1 rounded-xl border border-blue-900/50">
            <button
              onClick={() => onSetDeviceMode('iphone')}
              className={`p-1.5 rounded-lg text-xs transition ${
                deviceMode === 'iphone' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Tampilan iPhone Frame"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSetDeviceMode('full')}
              className={`p-1.5 rounded-lg text-xs transition ${
                deviceMode === 'full' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Tampilan Layar Penuh"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Device Presentation Container */}
      <main className="w-full flex justify-center items-center flex-1 my-auto">
        {deviceMode === 'iphone' ? (
          <div className="relative w-full max-w-[400px] h-[844px] bg-[#0b162c] border-[10px] border-[#1e293b] rounded-[52px] shadow-2xl shadow-blue-950/50 flex flex-col overflow-hidden ring-1 ring-white/10">
            
            {/* Dynamic Island / Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-2.5 shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700/60"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/80 animate-pulse"></div>
            </div>

            {/* Mobile Screen Content */}
            <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col bg-[#080e1c] relative pt-8 pb-4">
              {children}
            </div>

            {/* iOS Bottom Home Bar Indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-50 pointer-events-none"></div>
          </div>
        ) : (
          <div className="w-full max-w-md h-[860px] bg-[#080e1c] border border-blue-900/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative">
            <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col">
              {children}
            </div>
          </div>
        )}
      </main>

      {/* Footer disclaimer */}
      <footer className="mt-4 text-center text-xs text-slate-500 max-w-md">
        Aplikasi Layanan Keamanan & Konseling Terpadu Kampus UTDI • Universitas Teknologi Digital Indonesia (STMIK AKAKOM)
      </footer>

    </div>
  );
}
