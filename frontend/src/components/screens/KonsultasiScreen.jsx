import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Send, Phone, MessageSquare, ChevronRight, 
  Bot, ShieldCheck, PhoneCall, X
} from 'lucide-react';

export default function KonsultasiScreen({ onBack, onStartVoiceCall }) {
  // Current chat room: 'chatbot', 'satgas-pusat', 'satgas-dewi', 'satgas-abel', 'satgas-putra'
  const [activeRoom, setActiveRoom] = useState('chatbot');

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
  const [showAnonimToast, setShowAnonimToast] = useState(true);
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
      text: textToSend
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
      
      {/* Top Floating Toast: ANDA MENGAKSES SECARA ANONIM */}
      {showAnonimToast && activeRoom === 'chatbot' && (
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

      {/* Header Bar: (←) Konsultasi / Curhat */}
      <div className="px-5 pt-3 pb-3 flex items-center justify-between border-b border-[#2b4c85] bg-[#1E3866] z-30 shrink-0">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleHeaderBack}
            className="w-9 h-9 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] border border-[#2b4c85] flex items-center justify-center text-blue-200 transition active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-base sm:text-lg font-black text-[#F5A623] tracking-wide">
            Konsultasi / Curhat
          </h2>
        </div>

        {/* If in dedicated satgas room, show direct call action */}
        {activeRoom !== 'chatbot' && currentSatgas && (
          <a
            href={`tel:${currentSatgas.phone}`}
            className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow transition active:scale-95"
            title="Telepon Langsung"
          >
            <Phone className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Sub-Header: Chat Bot vs Satgas Identity */}
      {activeRoom === 'chatbot' ? (
        <div className="px-5 py-3 flex items-center space-x-3 border-b border-[#25457d] bg-[#1A325C] shrink-0">
          <div className="w-11 h-11 rounded-full bg-[#F5A623] flex items-center justify-center text-slate-900 shadow-md shrink-0">
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
                  Online
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <a
              href={`https://wa.me/${currentSatgas?.wa}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-slate-950 font-bold px-2.5 py-1 rounded-lg text-[10px] flex items-center space-x-1 shadow"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WA</span>
            </a>
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 space-y-3.5 overflow-y-auto min-h-0">
        {currentMessages.map((m) => {
          const isUser = m.sender === 'user';

          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
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
                        className="w-full bg-[#112140] hover:bg-[#1a3466] border border-[#2b4c85] hover:border-[#F5A623] rounded-xl px-3.5 py-2.5 flex items-center justify-between text-left transition active:scale-98 group"
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

      {/* Quick Suggestion Chips (if in chatbot room) */}
      {activeRoom === 'chatbot' && (
        <div className="px-4 py-1.5 bg-[#162a4d] flex space-x-2 overflow-x-auto border-t border-[#2b4c85] scrollbar-none shrink-0">
          <button
            onClick={() => handleSend("Saya ingin curhat")}
            className="text-[11px] bg-[#F5A623] hover:bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-full whitespace-nowrap shadow transition active:scale-95"
          >
            Saya ingin curhat
          </button>
          <button
            onClick={() => handleSend("Butuh nomor kontak satgas")}
            className="text-[11px] bg-[#1E3866] hover:bg-[#254680] text-blue-200 border border-[#2b4c85] px-3 py-1 rounded-full whitespace-nowrap transition active:scale-95"
          >
            Nomor Satgas
          </button>
        </div>
      )}

      {/* Bottom Input Bar */}
      <div className="p-3 bg-[#162a4d] border-t border-[#2b4c85] flex items-center space-x-2 shrink-0">
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
