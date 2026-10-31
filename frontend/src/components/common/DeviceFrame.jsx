import React from 'react';
import { Smartphone, Monitor, Volume2, VolumeX, Layers } from 'lucide-react';

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
    { id: 'splash', label: '1. On Boarding 1 (Logo UTDI)' },
    { id: 'onboarding2', label: '2. On Boarding 2 (Teks PPKPS)' },
    { id: 'onboarding3', label: '3. On Boarding 3 (Logo PPKS + Teks)' },
    { id: 'login', label: '4. Login (Masuk)' },
    { id: 'register', label: '5. Buat Akun (Register)' },
    { id: 'home', label: '6. Home (Beranda)' },
    { id: 'riwayat', label: '7. Riwayat Pelaporan' },
    { id: 'profil', label: '8. Profil (Dewi)' },
    { id: 'pengaturan-akun', label: '9. Pengaturan Akun' },
    { id: 'ganti-sandi', label: '10. Ubah Kata Sandi' },
    { id: 'privasi-keamanan', label: '11. Privasi dan Keamanan' },
    { id: 'nomor-darurat', label: '12. Kontak Darurat (nor...)' },
    { id: 'lapor-darurat', label: '13. Peta & Lapor SOS (Da...)' },
    { id: 'live-sos', label: '14. Tracking Tim SAR (Dar...)' },
    { id: 'konselor-list', label: '15. Daftar Konselor (kon...)' },
    { id: 'chat-room', label: '16. Chat Room Konseling' },
    { id: 'voice-call', label: '17. Panggilan Suara Konselor' },
    { id: 'informasi-list', label: '18. Panduan Edukasi (Inf...)' },
  ];

  return (
    <div className="min-h-screen bg-[#152747] text-slate-100 flex flex-col items-center justify-start p-2 sm:p-6 select-none font-sans">
      
      {/* Top Controller Bar */}
      <header className="w-full max-w-5xl mb-4 bg-[#1E3866] border border-[#2b4c85] backdrop-blur-md rounded-2xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xl shadow-black/30">
        
        {/* Brand identity */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow-lg">
            <img src="/assets/satgas-ppks.jpg" alt="Satgas PPKS" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold text-white tracking-wide">SATGAS PPKPS • UTDI</h1>
              <span className="text-[10px] bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/40 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-ping"></span> Live
              </span>
            </div>
            <p className="text-xs text-blue-200/80 font-medium">Universitas Teknologi Digital Indonesia • Warna Resmi #1E3866</p>
          </div>
        </div>

        {/* Quick controls */}
        <div className="flex items-center flex-wrap gap-2">
          
          {/* Screen quick selector */}
          <div className="relative flex items-center">
            <Layers className="w-4 h-4 text-blue-300 absolute left-2.5 pointer-events-none" />
            <select
              value={currentScreen}
              onChange={(e) => onNavigate(e.target.value)}
              className="bg-[#162a4d] border border-blue-400/40 text-xs text-white rounded-xl pl-8 pr-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-[#F5A623] cursor-pointer hover:bg-[#1a335c] transition shadow-inner font-medium"
            >
              <optgroup label="Alur Layar:">
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
                ? 'bg-[#F5A623]/20 border-[#F5A623]/50 text-[#F5A623]'
                : 'bg-slate-800/50 border-slate-700 text-slate-400'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#F5A623]" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Audio Aktif' : 'Mute'}</span>
          </button>

          {/* Device Frame View Toggle */}
          <div className="flex items-center bg-[#162a4d] p-1 rounded-xl border border-blue-400/30">
            <button
              onClick={() => onSetDeviceMode('iphone')}
              className={`p-1.5 rounded-lg text-xs transition ${
                deviceMode === 'iphone' ? 'bg-[#1E3866] text-[#F5A623] border border-[#F5A623]/50 shadow' : 'text-slate-400 hover:text-white'
              }`}
              title="Tampilan iPhone Frame"
            >
              <Smartphone className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSetDeviceMode('full')}
              className={`p-1.5 rounded-lg text-xs transition ${
                deviceMode === 'full' ? 'bg-[#1E3866] text-[#F5A623] border border-[#F5A623]/50 shadow' : 'text-slate-400 hover:text-white'
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
          <div className="relative w-full max-w-[390px] h-[844px] bg-[#1E3866] border-[10px] border-[#0e1b33] rounded-[52px] shadow-2xl shadow-black/60 flex flex-col overflow-hidden ring-2 ring-white/10">
            
            {/* Dynamic Island / Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-2.5 shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700/60"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse"></div>
            </div>

            {/* Mobile Screen Content */}
            <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col bg-[#1E3866] relative pt-8 pb-4">
              {children}
            </div>

            {/* iOS Bottom Home Bar Indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full z-50 pointer-events-none"></div>
          </div>
        ) : (
          <div className="w-full max-w-md h-[860px] bg-[#1E3866] border border-[#2b4c85] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative">
            <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col bg-[#1E3866]">
              {children}
            </div>
          </div>
        )}
      </main>

      {/* Footer disclaimer */}
      <footer className="mt-4 text-center text-xs text-blue-200/60 max-w-md">
        Satgas PPKPS • Universitas Teknologi Digital Indonesia (STMIK AKAKOM)
      </footer>

    </div>
  );
}
