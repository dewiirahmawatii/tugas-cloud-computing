import React, { useState } from 'react';
import { 
  User, Lock, Users, Bell, Shield, LogOut, ChevronRight, 
  ExternalLink, CheckCircle2, Phone, Mail, MapPin, Award
} from 'lucide-react';
import HeaderBar from '../common/HeaderBar';

export default function ProfilScreen({ 
  user, 
  onNavigate, 
  onLogout 
}) {
  const [soundAlert, setSoundAlert] = useState(true);

  return (
    <div className="flex-1 flex flex-col bg-[#070d1a] text-slate-100 select-none pb-6">
      
      <HeaderBar title="Profil Mahasiswa" showBack={false} />

      <div className="px-5 py-4 space-y-4 overflow-y-auto">
        
        {/* Student ID Card (Kartu Mahasiswa UTDI) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-[#0c1c3c] via-[#122855] to-[#1e3e82] p-5 border border-blue-600/40 shadow-xl">
          
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3.5">
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
                alt={user?.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-400/80 shadow-md"
              />
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-sm font-extrabold text-white tracking-tight">
                    {user?.name || "Ahmad Fauzi"}
                  </h3>
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-xs font-semibold text-blue-200">
                  {user?.nim || "215410089"}
                </p>
                <span className="inline-block text-[10px] bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-md font-medium mt-1">
                  {user?.prodi || "S1 Informatika"}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[9px] font-black tracking-widest text-white uppercase bg-blue-600/80 px-2 py-1 rounded-md border border-blue-400/50 block">
                UTDI ID
              </span>
              <span className="text-[9px] text-blue-300 font-medium block mt-1">
                Aktif 2026/2027
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-800/40 grid grid-cols-2 gap-2 text-[11px] text-slate-300">
            <div className="flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span className="truncate">{user?.phone || "0812-3456-7890"}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span className="truncate">{user?.email?.split('@')[0] || "ahmad.fauzi"}@...</span>
            </div>
          </div>
        </div>

        {/* Menu Section 1: Akun & Keamanan */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
            Pengaturan Akun & Keamanan
          </span>
          <div className="bg-[#0e1d3b] border border-blue-900/50 rounded-2xl overflow-hidden shadow-md divide-y divide-blue-950">
            
            {/* 1. Edit Profil ("Pe...") */}
            <div
              onClick={() => onNavigate('edit-profil')}
              className="p-3.5 flex items-center justify-between hover:bg-[#14264d] cursor-pointer transition active:scale-99"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Ubah Data Profil (Pe...)</h4>
                  <p className="text-[10px] text-slate-400">Nama, No HP, Alamat domisili</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

            {/* 2. Ganti Password ("ga...") */}
            <div
              onClick={() => onNavigate('ganti-password')}
              className="p-3.5 flex items-center justify-between hover:bg-[#14264d] cursor-pointer transition active:scale-99"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Ganti Kata Sandi (ga...)</h4>
                  <p className="text-[10px] text-slate-400">Perbarui kata sandi akun</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

            {/* 3. Kontak Darurat ("Ko...") */}
            <div
              onClick={() => onNavigate('kontak-darurat')}
              className="p-3.5 flex items-center justify-between hover:bg-[#14264d] cursor-pointer transition active:scale-99"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Kontak Darurat Kerabat (Ko...)</h4>
                  <p className="text-[10px] text-slate-400">Nomor orang tua & sahabat saat krisis</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

          </div>
        </div>

        {/* Menu Section 2: Preferensi & Informasi Kampus */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
            Preferensi & Privasi Kampus
          </span>
          <div className="bg-[#0e1d3b] border border-blue-900/50 rounded-2xl overflow-hidden shadow-md divide-y divide-blue-950">
            
            {/* Suara Alarm SOS */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Bunyi Alarm Sirene SOS</h4>
                  <p className="text-[10px] text-slate-400">Bunyikan sirene saat tombol ditekan</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={soundAlert}
                onChange={(e) => setSoundAlert(e.target.checked)}
                className="w-4 h-4 rounded bg-[#11203f] border-blue-900 text-blue-600 focus:ring-blue-500"
              />
            </div>

            {/* Kebijakan Privasi Satgas PPKS */}
            <div 
              onClick={() => onNavigate('informasi-list')}
              className="p-3.5 flex items-center justify-between hover:bg-[#14264d] cursor-pointer transition active:scale-99"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Privasi & SOP Keamanan Kampus</h4>
                  <p className="text-[10px] text-slate-400">Komitmen perlindungan data dan anonimitas</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-400 font-bold py-3 px-4 rounded-2xl flex items-center justify-center space-x-2 transition"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-xs">Keluar Akun Mahasiswa</span>
        </button>

      </div>

    </div>
  );
}
