import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Send, Phone, MessageSquare, ChevronRight, 
  Bot, ShieldCheck, PhoneCall, X, User, Sparkles, Paperclip, 
  Camera, Image as ImageIcon, CheckCircle2
} from 'lucide-react';
import { api } from '../../services/api';

export default function KonsultasiScreen({ onBack, onStartVoiceCall }) {
  // Current chat room: 'chatbot', 'satgas-pusat', 'satgas-dewi', 'satgas-abel', 'satgas-putra'
  const [activeRoom, setActiveRoom] = useState('chatbot');

  // Anonymous Mode Decision Modal State
  const [showAnonimModal, setShowAnonimModal] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(true);

  // Storage / Attachment state
  const [attachedImage, setAttachedImage] = useState(null);
  const [isUploadingAttachment, setIsUploadingAttachment] = useState(false);
  const fileInputRef = useRef(null);

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

  // Load room messages from backend on mount or room change
  useEffect(() => {
    let isMounted = true;
    api.getRoomMessages(activeRoom).then(res => {
      if (isMounted && res && res.messages && res.messages.length > 0) {
        setRoomMessages(prev => ({
          ...prev,
          [activeRoom]: res.messages
        }));
      }
    });
    return () => { isMounted = false; };
  }, [activeRoom]);

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

  // Handle Photo Attachment to Storage
  const handleAttachmentSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAttachment(true);
    try {
      const res = await api.uploadFile(file);
      if (res && res.url) {
        setAttachedImage(res.url);
      }
    } catch (err) {
      console.error('Error uploading chat attachment:', err);
    } finally {
      setIsUploadingAttachment(false);
    }
  };

  // Send message
  const handleSend = async (textToSend = inputText) => {
    if (!textToSend.trim() && !attachedImage) return;

    const currentAttachment = attachedImage;
    setAttachedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    const newMsg = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: textToSend,
      attachmentUrl: currentAttachment,
      senderName: isAnonymous ? 'Anda (Anonim)' : 'Dewi Rahmawati'
    };

    setRoomMessages((prev) => ({
      ...prev,
      [activeRoom]: [...(prev[activeRoom] || []), newMsg]
    }));

    setInputText('');
    setIsTyping(true);

    // Call backend API to save message and receive response
    try {
      const response = await api.sendRoomMessage(activeRoom, {
        text: textToSend,
        isAnonymous,
        attachmentUrl: currentAttachment
      });

      setIsTyping(false);

      if (activeRoom === 'chatbot') {
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
        const replyText = response?.replyMessage?.text || "Pesan telah kami terima. Satgas siaga mendampingi Anda.";
        const satgasReply = {
          id: 'satgas_' + Date.now(),
          sender: 'satgas',
          text: replyText
        };
        setRoomMessages((prev) => ({
          ...prev,
          [activeRoom]: [...(prev[activeRoom] || []), satgasReply]
        }));
      }
    } catch (e) {
      setIsTyping(false);
    }
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
            
            <p className="text-[11px] text-blue-200 mt-1.5 leading-relaxed">
              Pilih apakah Anda ingin berkonsultasi secara anonim tanpa nama atau menggunakan identitas mahasiswa UTDI.
            </p>

            {/* Decision Buttons */}
            <div className="mt-5 space-y-2.5">
              {/* Ya, Chat Anonim (Golden Amber) */}
              <button
                type="button"
                onClick={() => {
                  setIsAnonymous(true);
                  setShowAnonimModal(false);
                }}
                className="w-full bg-[#F5A623] hover:bg-amber-400 text-slate-950 font-black py-2.5 px-4 rounded-xl text-xs transition active:scale-95 shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                <span>Ya, Chat dengan Anonim</span>
              </button>

              {/* Tidak, Pakai Akun Mahasiswa */}
              <button
                type="button"
                onClick={() => {
                  setIsAnonymous(false);
                  setShowAnonimModal(false);
                }}
                className="w-full bg-[#1E3866] hover:bg-[#254680] border border-[#2b4c85] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition active:scale-95 shadow flex items-center justify-center space-x-2 cursor-pointer"
              >
                <User className="w-4 h-4 text-blue-300" />
                <span>Tidak, Gunakan Akun Mahasiswa</span>
              </button>
            </div>

            <div className="mt-3 text-[9px] text-slate-400">
              Kerahasiaan data pelapor dijamin 100% oleh Satgas PPKS UTDI.
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. TOP HEADER BAR WITH BACK BUTTON                       */}
      {/* ======================================================== */}
      <div className="px-4 py-3 bg-[#162a4d] border-b border-[#2b4c85] flex items-center justify-between shrink-0 relative z-30 shadow-md">
        
        {/* Left Section: Back Button + Title */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleHeaderBack}
            className="w-9 h-9 rounded-full bg-[#112140] hover:bg-[#1a3361] active:bg-[#23437d] border border-[#2b4c85] flex items-center justify-center text-white transition active:scale-90 cursor-pointer shadow"
            title={activeRoom !== 'chatbot' ? "Kembali ke Chat Bot" : "Kembali ke Beranda"}
          >
            <ArrowLeft className="w-5 h-5 text-white stroke-[2.5]" />
          </button>

          <div>
            <h2 className="text-sm sm:text-base font-black text-[#F5A623] tracking-wide leading-none">
              Konsultasi / Curhat
            </h2>
            <span className="text-[10px] text-blue-200 block mt-0.5 font-medium">
              {activeRoom === 'chatbot' ? 'Layanan Bantuan Otomatis' : currentSatgas?.name}
            </span>
          </div>
        </div>

        {/* Right Section: Anonymous Mode Pill Toggle */}
        <button
          type="button"
          onClick={() => setIsAnonymous(!isAnonymous)}
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition active:scale-95 cursor-pointer shadow-sm ${
            isAnonymous 
              ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300' 
              : 'bg-blue-500/15 border-blue-400/40 text-blue-200'
          }`}
          title="Ketuk untuk ubah mode anonim"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{isAnonymous ? "Anonim Aktif" : "Akun Dewi"}</span>
        </button>

      </div>

      {/* ======================================================== */}
      {/* 3. PROFILE BANNER                                        */}
      {/* ======================================================== */}
      {activeRoom === 'chatbot' ? (
        <div className="px-5 py-3.5 bg-[#162a4d]/80 border-b border-[#2b4c85] flex items-center space-x-3 shrink-0">
          <div className="w-11 h-11 rounded-full bg-[#F5A623] flex items-center justify-center text-slate-950 shadow-md">
            <Bot className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white">Chat Bot UTDI</h3>
            <span className="flex items-center text-[10px] text-emerald-400 font-semibold mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              Online 24 Jam
            </span>
          </div>
        </div>
      ) : (
        <div className="px-5 py-3 bg-[#162a4d]/80 border-b border-[#2b4c85] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#F5A623] overflow-hidden bg-white/10 shrink-0">
              <img
                src="/assets/satgas-ppks.jpg"
                alt="Satgas"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white">{currentSatgas?.name}</h3>
              <span className="text-[10px] text-emerald-400 flex items-center font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse"></span>
                Siaga Mendampingi
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
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
                {/* Image Attachment Preview */}
                {m.attachmentUrl && (
                  <div className="mb-2 rounded-xl overflow-hidden border border-black/20 bg-black/10">
                    <img
                      src={m.attachmentUrl}
                      alt="Attachment"
                      className="w-full max-h-44 object-cover"
                    />
                  </div>
                )}

                {m.text && <p className="whitespace-pre-line">{m.text}</p>}

                {/* 4 Satgas Options inside Bot message */}
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

      {/* Attachment Upload Preview Banner */}
      {attachedImage && (
        <div className="px-4 py-2 bg-[#122340] border-t border-[#2b4c85] flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <img src={attachedImage} alt="Attachment" className="w-10 h-10 rounded-lg object-cover border border-[#F5A623]" />
            <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Foto Siap Dikirim ke Satgas
            </span>
          </div>
          <button
            type="button"
            onClick={() => setAttachedImage(null)}
            className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Quick Suggestion Chips */}
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

      {/* Hidden File Input for Storage Upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleAttachmentSelect}
        className="hidden"
      />

      {/* Bottom Input Bar */}
      <div className="p-3 bg-[#162a4d] border-t border-[#2b4c85] flex items-center space-x-2 shrink-0">
        
        {/* Paperclip / Storage Attachment Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploadingAttachment}
          className="w-9 h-9 rounded-full bg-[#112140] hover:bg-[#1a3361] border border-[#2b4c85] text-slate-300 hover:text-[#F5A623] flex items-center justify-center transition active:scale-90 shrink-0 cursor-pointer shadow"
          title="Lampirkan foto/screenshot via Storage"
        >
          {isUploadingAttachment ? (
            <span className="w-4 h-4 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <Paperclip className="w-4 h-4" />
          )}
        </button>

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
