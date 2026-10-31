import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Send, Phone, MessageSquare, ChevronRight, 
  Bot, ShieldCheck, UserCheck, PhoneCall, ExternalLink, X
} from 'lucide-react';
import HeaderBar from '../common/HeaderBar';

export default function KonsultasiScreen({ onBack, onStartVoiceCall }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Halo, ada yang bisa kami bantu?',
      showSatgasOptions: false,
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [showAnonimToast, setShowAnonimToast] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Satgas directory details
  const satgasList = [
    {
      id: 'satgas-pusat',
      name: 'Satgas Pusat',
      role: 'Hotline Layanan Utama Satgas PPKS UTDI',
      phone: '0811-2555-7788',
      wa: '081125557788',
      badge: '24 Jam Siaga',
      desc: 'Penanganan laporan terpadu & perlindungan darurat langsung dari koordinator kampus.'
    },
    {
      id: 'satgas-dewi',
      name: 'Satgas Dewi',
      role: 'Divisi Advokasi & Pendampingan Korban',
      phone: '0812-2456-7891',
      wa: '081224567891',
      badge: 'Hukum & Privasi',
      desc: 'Pendampingan advokasi, perlindungan identitas anonim, dan jaminan keamanan akademik.'
    },
    {
      id: 'satgas-abel',
      name: 'Satgas Abel',
      role: 'Konselor Psikologis & Trauma Healing',
      phone: '0813-9876-5432',
      wa: '081398765432',
      badge: 'Kesehatan Mental',
      desc: 'Bimbingan konseling empatik untuk mengatasi kecemasan, trauma, dan tekanan mental.'
    },
    {
      id: 'satgas-putra',
      name: 'Satgas Putra',
      role: 'Tim Investigasi & Pengamanan Lapangan',
      phone: '0878-1122-3344',
      wa: '087811223344',
      badge: 'Keamanan Fisik',
      desc: 'Tindakan cepat peninjauan lokasi kampus dan pengawalan keamanan di lingkungan UTDI.'
    }
  ];

  // Send message handler
  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      const lower = textToSend.toLowerCase();
      let botResponse = {};

      if (lower.includes('curhat') || lower.includes('bantu') || lower.includes('halo') || lower.includes('lapor')) {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Silahkan pilih tujuan layanan satgas.\nApakah anda ingin terhubung dengan satgas tertentu atau langsung menuju satgas pusat?`,
          showSatgasOptions: true
        };
      } else {
        botResponse = {
          id: Date.now() + 1,
          sender: 'bot',
          text: `Terima kasih sudah menyampaikan hal ini. Anda berhak merasa aman dan didengarkan di kampus UTDI.\n\nUntuk penanganan optimal, silakan pilih anggota Satgas yang siap mendampingi Anda di bawah ini:`,
          showSatgasOptions: true
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 900);
  };

  // Handle clicking one of the 4 Satgas options
  const handleSelectSatgas = (satgas) => {
    // Add user selection bubble
    const userChoiceMsg = {
      id: Date.now(),
      sender: 'user',
      text: satgas.name
    };

    setMessages((prev) => [...prev, userChoiceMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const satgasCardMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: `Baik, kami telah mengarahkan Anda ke ${satgas.name} (${satgas.role}). Silakan hubungi nomor kontak langsung di bawah ini:`,
        satgasContact: satgas
      };
      setMessages((prev) => [...prev, satgasCardMsg]);
    }, 700);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#1E3866] text-white select-none relative">
      
      {/* --- Top Floating Toast: ANDA MENGAKSES SECARA ANONIM --- */}
      {showAnonimToast && (
        <div className="absolute top-2 left-6 right-6 z-40 animate-in fade-in slide-in-from-top-2">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl py-2 px-4 shadow-xl flex items-center justify-between border border-white/40">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[11px] font-black text-slate-900 tracking-wide">
                ANDA MENGAKSES SECARA ANONIM
              </span>
            </div>
            <button
              onClick={() => setShowAnonimToast(false)}
              className="text-slate-500 hover:text-slate-800 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* --- Header Bar: (←) Konsultasi / Curhat --- */}
      <div className="px-5 pt-10 pb-3 flex items-center space-x-3 border-b border-[#2b4c85] bg-[#1E3866] z-30">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] border border-[#2b4c85] flex items-center justify-center text-blue-200 transition active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h2 className="text-base sm:text-lg font-black text-[#F5A623] tracking-wide">
          Konsultasi / Curhat
        </h2>
      </div>

      {/* --- Chat Bot Identity Section --- */}
      <div className="px-5 py-3 flex items-center space-x-3 border-b border-[#25457d] bg-[#1A325C]">
        {/* Yellow Robot Icon in Circle */}
        <div className="w-12 h-12 rounded-full bg-[#F5A623] flex items-center justify-center text-slate-900 shadow-md shrink-0">
          <Bot className="w-7 h-7 text-slate-900 stroke-[2.2]" />
        </div>

        <div>
          <h3 className="text-sm font-black text-white tracking-wide">
            Chat Bot
          </h3>
          <div className="flex items-center space-x-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-semibold text-emerald-300">
              Online
            </span>
          </div>
        </div>
      </div>

      {/* --- Chat Messages Scroll Area --- */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        
        {messages.map((m) => {
          const isBot = m.sender === 'bot';

          return (
            <div
              key={m.id}
              className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
            >
              {/* Message Bubble */}
              <div
                className={`max-w-[86%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md ${
                  isBot
                    ? 'bg-[#162a4d] text-white border border-[#2b4c85] rounded-tl-sm'
                    : 'bg-[#F5A623] text-slate-950 font-bold rounded-tr-sm shadow-[#F5A623]/20'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>

                {/* 4 Satgas Options (Directly inside / under the bot message) */}
                {m.showSatgasOptions && (
                  <div className="mt-3.5 space-y-2 pt-2 border-t border-[#2b4c85]">
                    {satgasList.map((satgas) => (
                      <button
                        key={satgas.id}
                        type="button"
                        onClick={() => handleSelectSatgas(satgas)}
                        className="w-full bg-[#112140] hover:bg-[#1a3466] border border-[#2b4c85] hover:border-[#F5A623] rounded-xl px-3.5 py-2.5 flex items-center justify-between text-left transition active:scale-98 group"
                      >
                        <div>
                          <span className="text-xs font-bold text-white group-hover:text-[#F5A623] transition block">
                            {satgas.name}
                          </span>
                          <span className="text-[10px] text-blue-200 block">
                            {satgas.badge}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#F5A623] group-hover:translate-x-0.5 transition" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Satgas Contact Card Details (when option is selected) */}
                {m.satgasContact && (
                  <div className="mt-3 bg-[#112140] border-2 border-[#F5A623]/60 rounded-xl p-3 space-y-2.5 text-xs text-white">
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#2b4c85]">
                      <div>
                        <h4 className="text-xs font-black text-[#F5A623]">
                          {m.satgasContact.name}
                        </h4>
                        <span className="text-[10px] text-slate-300">
                          {m.satgasContact.role}
                        </span>
                      </div>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                        {m.satgasContact.badge}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-300 leading-snug">
                      {m.satgasContact.desc}
                    </p>

                    <div className="text-xs font-black text-white bg-[#1A325C] p-2 rounded-lg text-center tracking-wider">
                      📞 {m.satgasContact.phone}
                    </div>

                    {/* Direct Call & WhatsApp Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <a
                        href={`tel:${m.satgasContact.phone}`}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-2.5 rounded-lg text-[11px] flex items-center justify-center space-x-1 shadow transition active:scale-95"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Telepon Langsung</span>
                      </a>

                      <a
                        href={`https://wa.me/${m.satgasContact.wa}?text=Halo%20${encodeURIComponent(m.satgasContact.name)}%2C%20saya%20mahasiswa%20UTDI%20ingin%20konsultasi%20layanan%20Satgas%20PPKS.`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-[#25D366] hover:bg-emerald-500 text-slate-950 font-black py-2 px-2.5 rounded-lg text-[11px] flex items-center justify-center space-x-1 shadow transition active:scale-95"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat WA</span>
                      </a>
                    </div>

                    {/* Voice Call in App Option */}
                    <button
                      type="button"
                      onClick={() => onStartVoiceCall(m.satgasContact)}
                      className="w-full bg-[#1E3866] hover:bg-[#284c8a] border border-[#2b4c85] text-blue-200 font-bold py-1.5 px-2 rounded-lg text-[10px] flex items-center justify-center space-x-1.5 transition"
                    >
                      <PhoneCall className="w-3 h-3 text-[#F5A623]" />
                      <span>Panggilan Suara via Aplikasi (Enkripsi End-to-End)</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center space-x-1.5 bg-[#162a4d] border border-[#2b4c85] px-3.5 py-2.5 rounded-2xl rounded-tl-sm w-16">
            <span className="w-1.5 h-1.5 bg-[#F5A623] rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-[#F5A623] rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1.5 h-1.5 bg-[#F5A623] rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* --- Quick Chips Suggestion (e.g. "Saya ingin curhat") --- */}
      <div className="px-4 py-1.5 bg-[#162a4d] flex space-x-2 overflow-x-auto border-t border-[#2b4c85] scrollbar-none">
        <button
          onClick={() => handleSend("Saya ingin curhat")}
          className="text-[11px] bg-[#F5A623] hover:bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-full whitespace-nowrap shadow transition active:scale-95"
        >
          Saya ingin curhat
        </button>
        <button
          onClick={() => handleSend("Lapor dugaan kekerasan seksual")}
          className="text-[11px] bg-[#1E3866] hover:bg-[#254680] text-blue-200 border border-[#2b4c85] px-3 py-1 rounded-full whitespace-nowrap transition active:scale-95"
        >
          Lapor PPKS
        </button>
        <button
          onClick={() => handleSend("Konsultasi akademik & stres")}
          className="text-[11px] bg-[#1E3866] hover:bg-[#254680] text-blue-200 border border-[#2b4c85] px-3 py-1 rounded-full whitespace-nowrap transition active:scale-95"
        >
          Konseling Stres
        </button>
      </div>

      {/* --- Bottom Input Bar: Ketik pesan.... + Golden Send Button --- */}
      <div className="p-3 bg-[#162a4d] border-t border-[#2b4c85] flex items-center space-x-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ketik pesan...."
          className="flex-1 bg-[#112140] border border-[#2b4c85] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
        />

        <button
          type="button"
          onClick={() => handleSend()}
          className="w-10 h-10 rounded-full bg-[#F5A623] hover:bg-amber-400 text-slate-900 flex items-center justify-center shadow-lg transition active:scale-95 shrink-0"
        >
          <Send className="w-4 h-4 text-slate-900 stroke-[2.5]" />
        </button>
      </div>

    </div>
  );
}
