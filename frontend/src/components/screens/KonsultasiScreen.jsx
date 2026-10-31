import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Send, Phone, MessageSquare, ChevronRight, 
  Bot, ShieldCheck, PhoneCall, X, User, Sparkles
} from 'lucide-react';

export default function KonsultasiScreen({ onBack, onStartVoiceCall }) {
  // Current chat room: 'chatbot', 'satgas-pusat', 'satgas-dewi', 'satgas-abel', 'satgas-putra'
  const [activeRoom, setActiveRoom] = useState('chatbot');

  // Anonymous Mode Decision Modal State
  const [showAnonimModal, setShowAnonimModal] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(true);

  // Messages per room
  const [roomMessages, setRoomMessages] = useState({
    chatbot: [
      {
        id: 'bot_1',
        sender: 'bot',
        text: 'Halo, ada yang bisa kami bantu?',
        showOptions: false
      }
    ],
    'satgas-pusat': [
      {
        id: 'pusat_1',
        sender: 'satgas',
        text: 'Halo, ada yang bisa kami bantu? Layanan Satgas Pusat PPKPS UTDI siap melayani 24 jam.'
      }
    ],
    'satgas-dewi': [
      {
        id: 'dewi_1',
        sender: 'satgas',
        text: 'Hai Hari ini Satgas Dewi di sini! Jangan ragu buat tanya apapun atau minta bantuan ya❤️'
      }
    ],
    'satgas-abel': [
      {
        id: 'abel_1',
        sender: 'satgas',
        text: 'Hai Hari ini Satgas Abel di sini! Jangan ragu buat tanya apapun atau minta bantuan ya❤️'
      }
    ],
    'satgas-putra': [
      {
        id: 'putra_1',
        sender: 'satgas',
        text: 'Halo, Satgas Putra di sini. Tim keamanan & investigasi siap mendampingi Anda di kampus.'
      }
    ]
  });

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const currentMessages = roomMessages[activeRoom] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, isTyping]);

  // Satgas metadata
  const satgasDirectory = {
    'satgas-pusat': {
      id: 'satgas-pusat',
      name: 'Satgas Pusat',
      role: 'Hotline Layanan Utama Satgas PPKS UTDI',
      phone: '0811-2555-7788',
      wa: '081125557788',
      greeting: 'Halo, ada yang bisa kami bantu?'
    },
    'satgas-dewi': {
      id: 'satgas-dewi',
      name: 'Satgas Dewi',
      role: 'Divisi Advokasi & Pendampingan Korban',
      phone: '0812-2456-7891',
      wa: '081224567891',
      greeting: 'Hai Hari ini Satgas Dewi di sini! Jangan ragu buat tanya apapun atau minta bantuan ya❤️'
    },
    'satgas-abel': {
      id: 'satgas-abel',
      name: 'Satgas Abel',
      role: 'Konselor Psikologis & Trauma Healing',
      phone: '0813-9876-5432',
      wa: '081398765432',
      greeting: 'Hai Hari ini Satgas Abel di sini! Jangan ragu buat tanya apapun atau minta bantuan ya❤️'
    },
    'satgas-putra': {
      id: 'satgas-putra',
      name: 'Satgas Putra',
      role: 'Tim Investigasi & Pengamanan Lapangan',
      phone: '0878-1122-3344',
      wa: '087811223344',
      greeting: 'Halo, Satgas Putra di sini. Tim keamanan siap membantu Anda.'
    }
  };

  // Send message
  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const newMsg = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: textToSend,
      senderName: isAnonymous ? 'Anda (Anonim)' : 'Dewi Rahmawati'
    };

    setRoomMessages((prev) => ({
      ...prev,
      [activeRoom]: [...(prev[activeRoom] || []), newMsg]
    }));

    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      if (activeRoom === 'chatbot') {
        // Main Chat Bot logic matching konsultasi 2 & 3
        const botReply = {
          id: 'bot_' + Date.now(),
          sender: 'bot',
          text: `Silahkan pilih tujuan layanan satgas.\nApakah anda ingin terhubung dengan satgas tertentu atau langsung menuju satgas pusat?`,
          showOptions: true
        };

        setRoomMessages((prev) => ({
          ...prev,
          chatbot: [...prev.chatbot, botReply]
        }));
      } else {
        // Dedicated Satgas replies with empathy and contact encouragement
        const satgasData = satgasDirectory[activeRoom];
        const smartReplies = [
          `Terima kasih sudah berbagi ceritamu. Kami sangat menghargai keberanianmu. Cerita ini sepenuhnya aman dan rahasia bersama kami.`,
          `Kami memahami situasimu tidak mudah. Jika kamu butuh pendampingan langsung, kamu bisa telepon kami di ${satgasData.phone} kapan saja.`,
          `Apakah kamu saat ini berada di tempat yang aman? Jika merasa cemas, tarik napas perlahan ya. Kami siap membantu setiap langkahmu.`,
          `Baik, laporanmu kami catat untuk pendampingan. Kamu juga bisa chat WhatsApp langsung ke nomor resmi kami.`
        ];
        const randomReply = smartReplies[Math.floor(Math.random() * smartReplies.length)];

        const satgasReply = {
          id: 'satgas_' + Date.now(),
          sender: 'satgas',
          text: randomReply
        };

        setRoomMessages((prev) => ({
          ...prev,
          [activeRoom]: [...(prev[activeRoom] || []), satgasReply]
        }));
      }
    }, 800);
  };

  // Navigating to direct Satgas consultation
  const handleSelectSatgasRoom = (roomId) => {
    setActiveRoom(roomId);
  };

  const handleHeaderBack = () => {
    if (activeRoom !== 'chatbot') {
      setActiveRoom('chatbot');
    } else {
      onBack();
    }
  };

  const currentSatgas = satgasDirectory[activeRoom];

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-[#1E3866] text-white select-none overflow-hidden relative">
      
      {/* ======================================================== */}
      {/* 1. MODAL ANIMASI KEREN: PILIHAN CHAT DENGAN ANONIM       */}
      {/* ======================================================== */}
      {showAnonimModal && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-5 select-none animate-in fade-in duration-300">
          <div className="w-full max-w-[290px] bg-gradient-to-b from-[#1a325c] to-[#122340] border-2 border-[#F5A623] rounded-3xl p-5 text-center shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            
            {/* Ambient Radial Flare Glow */}
            <div className="absolute -top-10 -left-10 w-28 h-28 bg-[#F5A623]/25 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>

            {/* Glowing Holographic Shield Icon */}
            <div className="relative w-16 h-16 rounded-full bg-[#162a4d] border-2 border-[#F5A623] flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#F5A623]/30">
              <ShieldCheck className="w-9 h-9 text-[#F5A623] stroke-[2.2] animate-pulse" />
              <div className="absolute inset-0 rounded-full border border-dashed border-[#F5A623]/50 animate-spin-slow pointer-events-none"></div>
            </div>

            {/* Question Title */}
            <h3 className="text-sm sm:text-base font-black text-white tracking-wide">
              Chat dengan Anonim?
            </h3>
            
            <p className="text-[11px] text-blue-100/90 mt-1.5 mb-4 leading-relaxed">
              Pilih <strong className="text-[#F5A623]">Ya</strong> untuk merahasiakan identitasmu sepenuhnya. Atau pilih <strong className="text-white">Tidak</strong> jika ingin konselor Satgas mengenali akun mahasiswamu.
            </p>

            {/* Action Buttons */}
            <div className="space-y-2">
              
              {/* Option 1: Ya, Chat Anonim */}
              <button
                type="button"
                onClick={() => {
                  setIsAnonymous(true);
                  setShowAnonimModal(false);
                }}
                className="w-full bg-[#F5A623] hover:bg-amber-400 active:scale-95 text-slate-950 font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-[#F5A623]/25"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                <span>Ya, Chat dengan Anonim</span>
              </button>

              {/* Option 2: Tidak, Gunakan Akun */}
              <button
                type="button"
                onClick={() => {
                  setIsAnonymous(false);
                  setShowAnonimModal(false);
                }}
                className="w-full bg-[#162a4d] hover:bg-[#1f3a69] active:scale-95 border border-[#2b4c85] text-slate-200 hover:text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all"
              >
                <User className="w-4 h-4 text-blue-300" />
                <span>Tidak, Gunakan Akun Mahasiswa</span>
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. PINNED TOP HEADER: (←) Konsultasi / Curhat            */}
      {/* ======================================================== */}
      <div className="px-5 pt-3 pb-3 flex items-center justify-between border-b border-[#2b4c85] bg-[#1E3866] z-30 shrink-0 relative">
        
        {/* Left Section: Back Button (←) & Title */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleHeaderBack}
            className="w-10 h-10 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] active:bg-[#254680] border border-[#2b4c85] flex items-center justify-center text-white transition-all active:scale-90 cursor-pointer shadow-md shrink-0"
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="w-5 h-5 text-white stroke-[2.5]" />
          </button>
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#F5A623] tracking-wide leading-tight">
              Konsultasi / Curhat
            </h2>
            <span className="text-[10px] text-blue-200/80">Layanan Pendampingan Satgas UTDI</span>
          </div>
        </div>

        {/* Right Section: Mode Indicator Badge + Call Button */}
        <div className="flex items-center space-x-2 shrink-0">
          
          {/* Clickable Badge to Switch or Toggle Anonymous Mode */}
          <button
            type="button"
            onClick={() => setShowAnonimModal(true)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition flex items-center gap-1 shadow-sm active:scale-95 cursor-pointer ${
              isAnonymous 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 hover:bg-emerald-500/30'
                : 'bg-blue-500/20 text-blue-300 border-blue-400/40 hover:bg-blue-500/30'
            }`}
            title="Klik untuk ubah mode anonim"
          >
            {isAnonymous ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Anonim</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-blue-300" />
                <span>Akun Dewi</span>
              </>
            )}
          </button>

          {/* If in dedicated satgas room, show direct call action */}
          {activeRoom !== 'chatbot' && currentSatgas && (
            <a
              href={`tel:${currentSatgas.phone}`}
              className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow transition active:scale-95"
              title="Telepon Langsung"
            >
              <Phone className="w-4 h-4" />
            </a>
          )}
        </div>

      </div>

      {/* ======================================================== */}
      {/* 3. SUB-HEADER: Identitas Chat Bot / Satgas               */}
      {/* ======================================================== */}
      {activeRoom === 'chatbot' ? (
        <div className="px-5 py-2.5 flex items-center justify-between border-b border-[#25457d] bg-[#1A325C] shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#F5A623] flex items-center justify-center text-slate-900 shadow-md shrink-0">
              <Bot className="w-6 h-6 text-slate-900 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white tracking-wide">
                Chat Bot
              </h3>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-semibold text-emerald-300">
                  Online 24 Jam
                </span>
              </div>
            </div>
          </div>

          <span className="text-[10px] text-blue-200/70 font-medium">
            {isAnonymous ? '🔒 Privasi Anonim Terjaga' : '👤 Sesi Akun Mahasiswa'}
          </span>
        </div>
      ) : (
        <div className="px-5 py-2.5 flex items-center justify-between border-b border-[#25457d] bg-[#1A325C] shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white p-0.5 flex items-center justify-center shrink-0 shadow">
              <img src="/assets/satgas-ppks.jpg" alt="Satgas" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white tracking-wide">
                {currentSatgas?.name}
              </h3>
              <div className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-semibold text-emerald-300">
                  Konselor Siaga
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <a
              href={`https://wa.me/${currentSatgas?.wa}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] hover:bg-emerald-500 text-slate-950 font-bold px-2.5 py-1 rounded-lg text-[10px] flex items-center space-x-1 shadow transition active:scale-95"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WA</span>
            </a>
            <a
              href={`tel:${currentSatgas?.phone}`}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold p-1 rounded-lg shadow transition active:scale-95"
              title="Telepon Langsung"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. MESSAGES SCROLL AREA                                  */}
      {/* ======================================================== */}
      <div className="flex-1 p-4 space-y-3.5 overflow-y-auto min-h-0">
        
        {/* Confidentiality Notice */}
        <div className="mx-auto max-w-[280px] bg-[#162a4d]/60 border border-[#2b4c85] rounded-xl p-2.5 text-center text-[10px] text-blue-200 flex items-center justify-center space-x-1.5 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Percakapan ini dilindungi kode etik kerahasiaan Satgas UTDI.</span>
        </div>

        {currentMessages.map((m) => {
          const isUser = m.sender === 'user';

          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              {isUser && m.senderName && (
                <span className="text-[9px] text-[#F5A623] font-bold mb-1 px-1">
                  {m.senderName}
                </span>
              )}

              <div
                className={`max-w-[86%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md ${
                  !isUser
                    ? 'bg-[#162a4d] text-white border border-[#2b4c85] rounded-tl-sm'
                    : 'bg-[#F5A623] text-slate-950 font-bold rounded-tr-sm shadow-[#F5A623]/20'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>

                {/* 4 Satgas Options inside Bot message (matching konsultasi 3) */}
                {m.showOptions && (
                  <div className="mt-3.5 space-y-2 pt-2 border-t border-[#2b4c85]">
                    {[
                      { id: 'satgas-pusat', label: 'Satgas Pusat' },
                      { id: 'satgas-dewi', label: 'Satgas Dewi' },
                      { id: 'satgas-abel', label: 'Satgas Abel' },
                      { id: 'satgas-putra', label: 'Satgas Putra' }
                    ].map((satgas) => (
                      <button
                        key={satgas.id}
                        type="button"
                        onClick={() => handleSelectSatgasRoom(satgas.id)}
                        className="w-full bg-[#112140] hover:bg-[#1a3466] border border-[#2b4c85] hover:border-[#F5A623] rounded-xl px-3.5 py-2.5 flex items-center justify-between text-left transition active:scale-98 group cursor-pointer"
                      >
                        <span className="text-xs font-bold text-white group-hover:text-[#F5A623] transition">
                          {satgas.label}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#F5A623] group-hover:translate-x-0.5 transition" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center space-x-1.5 bg-[#162a4d] border border-[#2b4c85] px-3.5 py-2.5 rounded-2xl rounded-tl-sm w-16">
            <span className="w-1.5 h-1.5 bg-[#F5A623] rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-[#F5A623] rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1.5 h-1.5 bg-[#F5A623] rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ======================================================== */}
      {/* 5. QUICK SUGGESTION CHIPS                                */}
      {/* ======================================================== */}
      {activeRoom === 'chatbot' && (
        <div className="px-4 py-1.5 bg-[#162a4d] flex space-x-2 overflow-x-auto border-t border-[#2b4c85] scrollbar-none shrink-0">
          <button
            type="button"
            onClick={() => handleSend("Saya ingin curhat")}
            className="text-[11px] bg-[#F5A623] hover:bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-full whitespace-nowrap shadow transition active:scale-95 cursor-pointer"
          >
            Saya ingin curhat
          </button>
          <button
            type="button"
            onClick={() => handleSend("Butuh nomor kontak satgas")}
            className="text-[11px] bg-[#1E3866] hover:bg-[#254680] text-blue-200 border border-[#2b4c85] px-3 py-1 rounded-full whitespace-nowrap transition active:scale-95 cursor-pointer"
          >
            Nomor Satgas
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. BOTTOM INPUT BAR                                      */}
      {/* ======================================================== */}
      <div className="p-3 bg-[#162a4d] border-t border-[#2b4c85] flex items-center space-x-2 shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={isAnonymous ? "Ketik pesan sebagai Anonim...." : "Ketik pesan sebagai Dewi...."}
          className="flex-1 bg-[#112140] border border-[#2b4c85] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
        />

        <button
          type="button"
          onClick={() => handleSend()}
          className="w-10 h-10 rounded-full bg-[#F5A623] hover:bg-amber-400 text-slate-900 flex items-center justify-center shadow-lg transition active:scale-95 shrink-0 cursor-pointer"
          title="Kirim Pesan"
        >
          <Send className="w-4 h-4 text-slate-900 stroke-[2.5]" />
        </button>
      </div>

    </div>
  );
}
