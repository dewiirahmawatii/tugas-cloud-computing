import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, ArrowLeft, Paperclip, Mic, Shield, Smile } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';
import { api } from '../../services/api';

export default function ChatRoomScreen({ counselor, onBack, onStartCall }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const activeCounselor = counselor || {
    id: "c_1",
    name: "Dr. Rina Wulandari, M.Psi.",
    title: "Psikolog Klinis UTDI",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
  };

  useEffect(() => {
    api.getChatMessages(activeCounselor.id).then((res) => {
      if (res && res.messages) {
        setMessages(res.messages);
      }
    });
  }, [activeCounselor.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const newMsg = {
      id: "msg_" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB"
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setTyping(true);

    api.sendChatMessage(activeCounselor.id, textToSend).then((res) => {
      setTimeout(() => {
        setTyping(false);
        if (res && res.counselorReply) {
          setMessages((prev) => [...prev, res.counselorReply]);
        }
      }, 1000);
    });
  };

  const quickChips = [
    "Saya merasa cemas dengan skripsi",
    "Ingin konseling tatap muka",
    "Konsultasi penanganan stres"
  ];

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-[#1E3866] text-slate-100 select-none overflow-hidden">
      
      {/* Custom Chat Header (Pinned Top) */}
      <div className="bg-[#162a4d] border-b border-[#2b4c85] px-4 py-2.5 flex items-center justify-between shadow-md z-30 shrink-0">
        
        <div className="flex items-center space-x-2.5">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/50 flex items-center justify-center text-blue-200"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="relative">
            <img
              src={activeCounselor.avatar}
              alt={activeCounselor.name}
              className="w-10 h-10 rounded-full object-cover border border-blue-400"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[#0b162c]"></span>
          </div>

          <div>
            <h3 className="text-xs font-black text-white leading-tight">
              {activeCounselor.name}
            </h3>
            <span className="text-[10px] text-emerald-400 font-medium">
              {typing ? 'Sedang mengetik balasan...' : 'Online • Kerahasiaan Terjamin'}
            </span>
          </div>
        </div>

        <button
          onClick={() => onStartCall(activeCounselor)}
          className="w-9 h-9 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center hover:bg-emerald-600/40 transition"
        >
          <Phone className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto min-h-0">
        
        {/* Confidentiality Notice */}
        <div className="mx-auto max-w-[280px] bg-blue-950/40 border border-blue-800/40 rounded-xl p-2.5 text-center text-[10px] text-blue-300 flex items-center space-x-2">
          <Shield className="w-4 h-4 text-blue-400 shrink-0" />
          <span>Sesi ini dilindungi kode etik kerahasiaan konseling UTDI.</span>
        </div>

        {messages.map((m) => {
          const isUser = m.sender === 'user';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-[#122347] text-slate-100 border border-blue-800/50 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] text-slate-500 mt-1 px-1">
                {m.timestamp}
              </span>
            </div>
          );
        })}

        {typing && (
          <div className="flex items-center space-x-1.5 bg-[#122347] border border-blue-800/50 px-3 py-2 rounded-2xl rounded-tl-none w-16">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions Chips */}
      <div className="px-3 py-1.5 bg-[#081022] flex space-x-1.5 overflow-x-auto border-t border-blue-950 scrollbar-none shrink-0">
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="text-[10px] bg-[#122449] hover:bg-[#1a3468] text-blue-200 border border-blue-800/60 rounded-full px-2.5 py-1 whitespace-nowrap transition"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Bottom Message Input Bar */}
      <div className="p-3 bg-[#0a1428] border-t border-blue-900/50 flex items-center space-x-2 shrink-0">
        <button
          onClick={() => alert("Fitur lampirkan file & foto dokumen siap.")}
          className="text-slate-400 hover:text-blue-400 p-2 rounded-xl bg-[#101f3f]"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Tulis pesan untuk konselor..."
          className="flex-1 bg-[#101f3f] border border-blue-900/60 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        <button
          onClick={() => handleSend()}
          disabled={!inputText.trim()}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white p-2.5 rounded-xl shadow transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

