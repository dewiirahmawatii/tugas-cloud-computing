import React, { useState } from 'react';
import { 
  Phone, MessageSquare, Copy, Check, X, ShieldCheck, 
  Headphones, PhoneCall, ExternalLink, AlertCircle
} from 'lucide-react';

export default function CallModal({ 
  isOpen, 
  onClose, 
  contact = {
    title: 'Satgas Dewi (PPKS UTDI)',
    role: 'Layanan Siaga Advokasi & Perlindungan Korban',
    phone: '0823-1778-9406',
    rawPhone: '082317789406',
    whatsapp: '6282317789406'
  },
  onStartVoiceCall
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const realPhone = contact.phone || '0823-1778-9406';
  const cleanPhone = (contact.rawPhone || contact.phone || '082317789406').replace(/[^0-9]/g, '');
  const waNumber = (contact.whatsapp || '6282317789406').replace(/[^0-9]/g, '');

  const handleCopyNumber = () => {
    navigator.clipboard?.writeText(realPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeCall = () => {
    navigator.clipboard?.writeText(realPhone);
    setCopied(true);
    window.location.href = `tel:${cleanPhone}`;
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(`Halo Satgas PPKS UTDI (${contact.title || 'Dewi'}), saya mahasiswa UTDI membutuhkan bantuan darurat / bimbingan.`);
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-gradient-to-b from-[#182e54] to-[#0f1f3d] border-2 border-[#F5A623] rounded-3xl p-5 shadow-2xl relative overflow-hidden text-white animate-in zoom-in-95 duration-200">
        
        {/* Glow Accent */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#F5A623]/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon & Title */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#F5A623] to-amber-300 flex items-center justify-center shadow-lg shadow-[#F5A623]/30 text-slate-950 font-black shrink-0">
            <PhoneCall className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> Siaga 24 Jam
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-extrabold text-white mt-1 leading-tight">
              {contact.title || 'Satgas PPKS UTDI'}
            </h3>
            <p className="text-[11px] text-blue-200/90 leading-tight">
              {contact.role || 'Pusat Tanggap Darurat & Konseling Mahasiswa'}
            </p>
          </div>
        </div>

        {/* Real Phone Display Box */}
        <div className="bg-[#0b172e] border border-blue-900/80 rounded-2xl p-3.5 mb-4 flex items-center justify-between shadow-inner">
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Nomor Telepon Resmi:</span>
            <div className="text-base sm:text-lg font-black tracking-wider text-[#F5A623]">
              {realPhone}
            </div>
          </div>
          <button
            onClick={handleCopyNumber}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition active:scale-95 cursor-pointer ${
              copied 
                ? 'bg-emerald-600 text-white' 
                : 'bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-400/30'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin</span>
              </>
            )}
          </button>
        </div>

        {/* Call Action Choices */}
        <div className="space-y-2.5">
          
          {/* 1. WhatsApp Call & Chat (Recommended - No Windows 'Pick an app' error!) */}
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1caa50] text-slate-950 font-black py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-between shadow-lg shadow-emerald-950/40 transition active:scale-97 cursor-pointer"
          >
            <div className="flex items-center space-x-2.5">
              <MessageSquare className="w-5 h-5 text-slate-950 fill-slate-950" />
              <div className="text-left">
                <div className="font-extrabold leading-none">Panggilan WhatsApp (WA)</div>
                <span className="text-[10px] text-slate-900/80 font-semibold">Buka WA Web / Aplikasi Langsung • Gratis</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-950/80" />
          </button>

          {/* 2. Direct Cellular Phone Call (Dialer HP) */}
          <button
            type="button"
            onClick={handleNativeCall}
            className="w-full bg-[#1E3866] hover:bg-[#274880] active:bg-[#1a325b] border border-[#3b5e9e] text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-between shadow transition active:scale-97 cursor-pointer"
          >
            <div className="flex items-center space-x-2.5">
              <Phone className="w-4 h-4 text-[#F5A623]" />
              <div className="text-left">
                <div className="font-bold leading-none">Panggilan Telepon Seluler (Dialer)</div>
                <span className="text-[10px] text-blue-200">Dialer ponsel / Salin nomor otomatis</span>
              </div>
            </div>
            <span className="text-[10px] text-blue-300 font-bold bg-blue-900/40 px-2 py-0.5 rounded">
              0823...
            </span>
          </button>

          {/* 3. In-App Interactive Voice Simulator */}
          {onStartVoiceCall && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartVoiceCall({
                  name: contact.title || 'Satgas Dewi',
                  title: contact.role || 'Divisi Pendampingan Korban PPKS UTDI',
                  avatar: '/assets/satgas-ppks.jpg',
                  phone: realPhone
                });
              }}
              className="w-full bg-[#0d1c36] hover:bg-[#14284d] active:bg-[#0b172c] border border-blue-800/60 text-blue-200 font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-between shadow transition active:scale-97 cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <Headphones className="w-4 h-4 text-cyan-400" />
                <div className="text-left">
                  <div className="font-bold leading-none">Panggilan Suara Interaktif di Web</div>
                  <span className="text-[10px] text-slate-400">Simulasi panggilan suara Satgas langsung</span>
                </div>
              </div>
              <span className="text-[10px] text-cyan-300 font-bold bg-cyan-900/30 px-2 py-0.5 rounded">
                Simulasi
              </span>
            </button>
          )}

        </div>

        {/* Confidentiality Footer */}
        <div className="mt-4 pt-3 border-t border-blue-900/50 flex items-center justify-center space-x-1.5 text-[10px] text-slate-400 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Nomor resmi terverifikasi Satgas PPKS UTDI</span>
        </div>

      </div>
    </div>
  );
}

