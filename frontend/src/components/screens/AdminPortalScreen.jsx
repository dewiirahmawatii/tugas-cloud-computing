import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, MessageSquare, AlertTriangle, Cloud, 
  Send, RefreshCw, User, CheckCircle2, Clock, MapPin, 
  Phone, ArrowLeft, Eye, ShieldAlert, Sparkles, Database,
  Check, ChevronRight, FileText, Smartphone
} from 'lucide-react';
import { api } from '../../services/api';

export default function AdminPortalScreen({ onBack, onSwitchToStudentMode }) {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'sos' | 'storage'
  
  // Officer Profile
  const [currentOfficer, setCurrentOfficer] = useState('Satgas Dewi');
  const officerOptions = [
    { name: 'Satgas Dewi', role: 'Divisi Advokasi & Pendampingan Korban', phone: '0823-1778-9406' },
    { name: 'Satgas Pusat', role: 'Hotline Layanan Utama Satgas PPKS UTDI', phone: '0823-1778-9406' },
    { name: 'Satgas Abel', role: 'Konselor Psikologis & Trauma Healing', phone: '0813-9876-5432' },
    { name: 'Satgas Putra', role: 'Tim Investigasi & Patroli Keamanan', phone: '0878-1122-3344' }
  ];

  // Chat Management State
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState('satgas-dewi');
  const [messages, setMessages] = useState([]);
  const [adminInput, setAdminInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  // SOS Reports State
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Storage Stats State
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncToast, setSyncToast] = useState(null);

  // Load Rooms
  const fetchRooms = async () => {
    try {
      const res = await api.getAdminRooms();
      if (res && res.success && res.rooms) {
        setRooms(res.rooms);
      }
    } catch (e) {
      console.warn('Error fetching admin rooms:', e);
    }
  };

  // Load Messages for Selected Room
  const fetchMessages = async () => {
    if (!selectedRoomId) return;
    try {
      const res = await api.getRoomMessages(selectedRoomId);
      if (res && res.messages) {
        setMessages(res.messages);
      }
    } catch (e) {
      console.warn('Error fetching messages for room:', e);
    }
  };

  // Load Reports
  const fetchReports = async () => {
    try {
      const res = await api.getHistory();
      if (res && res.history) {
        setReports(res.history);
      }
    } catch (e) {
      console.warn('Error fetching reports:', e);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchReports();
    const interval = setInterval(() => {
      fetchRooms();
      if (activeTab === 'chat') fetchMessages();
      if (activeTab === 'sos') fetchReports();
    }, 2500);

    return () => clearInterval(interval);
  }, [selectedRoomId, activeTab]);

  useEffect(() => {
    fetchMessages();
  }, [selectedRoomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle Send Admin Reply
  const handleSendAdminReply = async (textToSend = adminInput) => {
    if (!textToSend.trim() || isSending) return;

    setIsSending(true);
    try {
      const res = await api.sendAdminMessage(selectedRoomId, {
        text: textToSend,
        officerName: currentOfficer
      });

      if (res && res.success) {
        setAdminInput('');
        fetchMessages();
        fetchRooms();
      }
    } catch (e) {
      console.error('Error sending admin reply:', e);
    } finally {
      setIsSending(false);
    }
  };

  // Handle Update SOS Status
  const handleUpdateReportStatus = async (id, status) => {
    setIsUpdatingStatus(true);
    try {
      await api.updateReportStatus(id, {
        status,
        officer: `${currentOfficer} & Danru Security UTDI`
      });
      fetchReports();
      setSyncToast(`Status laporan berhasil diubah ke: ${status}`);
      setTimeout(() => setSyncToast(null), 3000);
    } catch (e) {
      console.error('Error updating status:', e);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Handle Manual Biznet Sync
  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      const res = await api.syncBiznetManual();
      setSyncToast('Semua database & foto tersinkron ke Biznet GIO! ☁️');
      setTimeout(() => setSyncToast(null), 3000);
    } catch (e) {
      setSyncToast('Gagal sinkron: ' + e.message);
      setTimeout(() => setSyncToast(null), 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  const activeRoomMeta = rooms.find(r => r.id === selectedRoomId);

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-[#0e1d38] text-slate-100 select-none overflow-hidden relative font-sans">
      
      {/* ======================================================== */}
      {/* 1. TOP ADMIN CONTROL HEADER                              */}
      {/* ======================================================== */}
      <div className="px-4 py-3 bg-[#13274c] border-b border-[#2b4c85] flex flex-col sm:flex-row items-center justify-between gap-2.5 shrink-0 shadow-lg z-20">
        
        {/* Officer Identity & Role Selector */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-[#1b3668] hover:bg-[#25498a] border border-[#2b4c85] flex items-center justify-center text-white transition active:scale-90 cursor-pointer shadow"
            title="Kembali ke Beranda"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>

          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F5A623] to-amber-300 p-0.5 shadow-md flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#F5A623]">
                PORTAL PENGELOLA SATGAS
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            
            {/* Officer Switcher Dropdown */}
            <select
              value={currentOfficer}
              onChange={(e) => setCurrentOfficer(e.target.value)}
              className="bg-[#1b3668] text-white text-xs font-bold rounded-lg px-2 py-0.5 border border-[#2b4c85] focus:outline-none focus:ring-1 focus:ring-[#F5A623] cursor-pointer"
            >
              {officerOptions.map(opt => (
                <option key={opt.name} value={opt.name}>
                  Petugas: {opt.name} ({opt.phone})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Pills: Mode Switch & Sync */}
        <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleManualSync}
            disabled={isSyncing}
            className="bg-[#1e3d73] hover:bg-[#274e94] active:bg-[#1a3461] border border-[#3b67b0] text-[10px] font-bold px-2.5 py-1.5 rounded-xl flex items-center space-x-1.5 transition active:scale-95 cursor-pointer text-cyan-200"
            title="Sinkronkan database ke Biznet GIO NEO Object Storage"
          >
            <Cloud className={`w-3.5 h-3.5 text-cyan-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Biznet GIO'}</span>
          </button>

          {onSwitchToStudentMode && (
            <button
              type="button"
              onClick={onSwitchToStudentMode}
              className="bg-[#F5A623] hover:bg-amber-400 active:bg-amber-500 text-slate-950 text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center space-x-1.5 shadow-md transition active:scale-95 cursor-pointer"
              title="Beralih ke Tampilan Mahasiswa (Mobile View)"
            >
              <Smartphone className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
              <span>Mode Mahasiswa</span>
            </button>
          )}
        </div>

      </div>

      {/* Sync Toast Alert */}
      {syncToast && (
        <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 text-center animate-in fade-in duration-200 shrink-0 shadow">
          {syncToast}
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. TAB CONTROLLER                                        */}
      {/* ======================================================== */}
      <div className="px-4 py-2 bg-[#10203f] border-b border-[#233f70] flex items-center space-x-2 shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-black flex items-center justify-center space-x-1.5 transition cursor-pointer ${
            activeTab === 'chat'
              ? 'bg-[#1E3866] text-[#F5A623] border border-[#F5A623]/60 shadow'
              : 'text-slate-400 hover:text-white bg-[#14274d]'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Live Chat Mahasiswa</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sos')}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-black flex items-center justify-center space-x-1.5 transition cursor-pointer ${
            activeTab === 'sos'
              ? 'bg-[#1E3866] text-[#F5A623] border border-[#F5A623]/60 shadow'
              : 'text-slate-400 hover:text-white bg-[#14274d]'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
          <span>Laporan Darurat ({reports.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('storage')}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-black flex items-center justify-center space-x-1.5 transition cursor-pointer ${
            activeTab === 'storage'
              ? 'bg-[#1E3866] text-[#F5A623] border border-[#F5A623]/60 shadow'
              : 'text-slate-400 hover:text-white bg-[#14274d]'
          }`}
        >
          <Cloud className="w-3.5 h-3.5 text-cyan-400" />
          <span>Biznet GIO Cloud</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 3. TAB 1: LIVE CHAT PENGELOLA SATGAS                     */}
      {/* ======================================================== */}
      {activeTab === 'chat' && (
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          
          {/* Room Pill Selector */}
          <div className="px-4 py-2 bg-[#132549] border-b border-[#233f70] flex items-center space-x-2 overflow-x-auto scrollbar-none shrink-0">
            {rooms.map((r) => {
              const isSelected = r.id === selectedRoomId;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRoomId(r.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap flex items-center space-x-1.5 transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#F5A623] text-slate-950 font-black shadow-md'
                      : 'bg-[#1c3563] text-blue-200 hover:bg-[#23427a]'
                  }`}
                >
                  <span>{r.name}</span>
                  {r.hasUnread && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Chat Header Details */}
          <div className="px-4 py-2 bg-[#172c57] border-b border-[#2b4c85] flex items-center justify-between shrink-0">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-extrabold text-white">
                  Ruang: {activeRoomMeta?.name || 'Satgas Dewi'}
                </span>
                <span className="text-[10px] bg-blue-900/60 text-blue-300 px-2 py-0.2 rounded-full font-semibold">
                  {activeRoomMeta?.isAnonymous ? '🔒 Mahasiswa Anonim' : '👤 ' + (activeRoomMeta?.studentName || 'Dewi')}
                </span>
              </div>
              <p className="text-[10px] text-blue-200/80">
                {activeRoomMeta?.isAnonymous 
                  ? 'Identitas disamarkan demi privasi korban/pelapor' 
                  : `NIM: ${activeRoomMeta?.studentNim} • No. HP: 0823-1778-9406`}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-emerald-400 font-bold block">
                Membalas sebagai:
              </span>
              <span className="text-xs font-black text-[#F5A623]">
                {currentOfficer}
              </span>
            </div>
          </div>

          {/* Messages Flow Area */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto min-h-0 bg-[#0e1d38]">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center p-6">
                <MessageSquare className="w-12 h-12 text-blue-400/40 mb-2" />
                <p className="text-xs">Belum ada percakapan masuk di ruangan ini.</p>
              </div>
            ) : (
              messages.map((m) => {
                const isStudent = m.sender === 'user';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isStudent ? 'items-start' : 'items-end'}`}
                  >
                    {/* Sender Identity Label */}
                    <span className={`text-[9px] font-bold mb-1 px-1 ${isStudent ? 'text-[#F5A623]' : 'text-blue-300'}`}>
                      {isStudent 
                        ? (m.isAnonymous ? '👤 Mahasiswa (Anonim)' : '👤 Dewi Rahmawati (Mahasiswa)') 
                        : `🛡️ ${m.officerName || 'Petugas Satgas'} (Pengelola)`}
                    </span>

                    {/* Chat Bubble */}
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md ${
                        isStudent
                          ? 'bg-[#18305c] text-white border border-[#2b4c85] rounded-tl-sm'
                          : 'bg-[#F5A623] text-slate-950 font-bold rounded-tr-sm shadow-[#F5A623]/20'
                      }`}
                    >
                      {/* Photo Attachment if present */}
                      {m.attachmentUrl && (
                        <div className="mb-2 rounded-xl overflow-hidden border border-black/30 bg-black/20">
                          <img
                            src={m.attachmentUrl}
                            alt="Bukti Terlampir"
                            className="w-full max-h-48 object-cover cursor-pointer"
                            onClick={() => window.open(m.attachmentUrl, '_blank')}
                          />
                          <div className="p-1.5 text-[9px] bg-black/40 text-blue-200 flex items-center justify-between">
                            <span>☁️ Tersimpan di Storage Biznet GIO</span>
                            <span className="text-[#F5A623] font-bold">Klik perbesar</span>
                          </div>
                        </div>
                      )}

                      <p className="whitespace-pre-line">{m.text}</p>
                      
                      <div className={`mt-1 text-[9px] text-right ${isStudent ? 'text-blue-300' : 'text-slate-900/80'}`}>
                        {m.timestamp || 'Baru saja'}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Template Pills */}
          <div className="px-4 py-2 bg-[#132549] border-t border-[#233f70] flex items-center space-x-1.5 overflow-x-auto scrollbar-none shrink-0">
            <span className="text-[10px] text-slate-400 font-bold shrink-0">Balasan Cepat:</span>
            {[
              "Iya, kenapa tuh? Cerita dong, Dewi dengerin di sini kok! Ada kejadian apa barusan?",
              "Lho kenapa kok bilang 'ihh'? Ada yang bikin kamu risih di kampus?",
              "Halo! Satgas Dewi siaga di sini. Boleh ceritakan pelan-pelan ya.",
              "Kamu aman bersama kami. Butuh tim patroli kampus datang jemput?",
              "Kerahasiaan kamu terjamin 100%. Jangan takut untuk bicara ya."
            ].map((tmpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendAdminReply(tmpl)}
                className="text-[10px] bg-[#1a3566] hover:bg-[#254b91] text-blue-200 px-2.5 py-1 rounded-full whitespace-nowrap transition cursor-pointer border border-[#2b4c85]"
              >
                {tmpl.slice(0, 32)}...
              </button>
            ))}
          </div>

          {/* Admin Reply Input Box */}
          <div className="p-3 bg-[#13274c] border-t border-[#2b4c85] flex items-center space-x-2 shrink-0">
            <input
              type="text"
              value={adminInput}
              onChange={(e) => setAdminInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendAdminReply()}
              placeholder={`Ketik balasan resmi sebagai ${currentOfficer}...`}
              className="flex-1 bg-[#0e1d38] border border-[#2b4c85] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
            />

            <button
              type="button"
              onClick={() => handleSendAdminReply()}
              disabled={isSending || !adminInput.trim()}
              className="px-4 py-2.5 bg-[#F5A623] hover:bg-amber-400 active:bg-amber-500 text-slate-950 font-black rounded-xl text-xs flex items-center space-x-1.5 shadow-lg transition active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
              <span className="hidden sm:inline">Kirim Balasan</span>
            </button>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* 4. TAB 2: MANAJEMEN LAPORAN DARURAT SOS                  */}
      {/* ======================================================== */}
      {activeTab === 'sos' && (
        <div className="flex-1 p-4 space-y-3 overflow-y-auto min-h-0 bg-[#0e1d38]">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-extrabold text-white">Daftar Sinyal Darurat SOS Mahasiswa</h3>
              <p className="text-[11px] text-slate-400">Semua laporan terhubung langsung ke Pos Satpam UTDI dan Satgas PPKS</p>
            </div>
            <button
              onClick={fetchReports}
              className="p-1.5 rounded-lg bg-[#1a3566] text-blue-200 hover:text-white border border-[#2b4c85] cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {reports.map((rep) => (
            <div
              key={rep.id}
              className="bg-[#13274c] border border-[#2b4c85] rounded-2xl p-4 shadow-lg space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-[#F5A623]">{rep.id}</span>
                    <span className="text-[10px] font-bold text-white bg-blue-900/60 px-2 py-0.5 rounded-md">
                      {rep.title || rep.type}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs text-blue-200 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    <span className="font-semibold">{rep.location}</span>
                  </div>
                </div>

                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full text-white ${
                  rep.status === 'Selesai' ? 'bg-emerald-600' :
                  rep.status === 'Sedang Ditangani' ? 'bg-amber-600' :
                  rep.status === 'Petugas Menuju Lokasi' ? 'bg-red-600 animate-pulse' : 'bg-slate-600'
                }`}>
                  {rep.status}
                </span>
              </div>

              {/* Note / Chronology */}
              <p className="text-xs text-slate-300 bg-[#0b172e] p-2.5 rounded-xl border border-blue-950">
                "{rep.note || 'Pemicuan tombol darurat cepat mahasiswa.'}"
              </p>

              {/* Attached Photo Evidence if available */}
              {rep.photoUrl && (
                <div className="rounded-xl overflow-hidden border border-blue-900 bg-black/30 p-2">
                  <span className="text-[10px] text-slate-400 block mb-1">Bukti Foto TKP:</span>
                  <img
                    src={rep.photoUrl}
                    alt="Foto TKP"
                    className="w-full max-h-48 object-cover rounded-lg cursor-pointer"
                    onClick={() => window.open(rep.photoUrl, '_blank')}
                  />
                </div>
              )}

              {/* Officer in Charge & Date */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Waktu: {rep.date}</span>
                <span>Petugas: {rep.officer || currentOfficer}</span>
              </div>

              {/* Quick Status Action Buttons */}
              <div className="pt-2 border-t border-[#1e3d73] flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateReportStatus(rep.id, 'Petugas Menuju Lokasi')}
                  disabled={isUpdatingStatus}
                  className="bg-red-600/80 hover:bg-red-500 text-white font-bold px-2.5 py-1.5 rounded-xl text-[10px] transition cursor-pointer"
                >
                  🚨 Menuju Lokasi
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateReportStatus(rep.id, 'Sedang Ditangani')}
                  disabled={isUpdatingStatus}
                  className="bg-amber-600/80 hover:bg-amber-500 text-white font-bold px-2.5 py-1.5 rounded-xl text-[10px] transition cursor-pointer"
                >
                  🟡 Sedang Ditangani
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateReportStatus(rep.id, 'Selesai')}
                  disabled={isUpdatingStatus}
                  className="bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold px-2.5 py-1.5 rounded-xl text-[10px] transition cursor-pointer"
                >
                  ✅ Tandai Selesai
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. TAB 3: BIZNET GIO NEO STORAGE STATUS                  */}
      {/* ======================================================== */}
      {activeTab === 'storage' && (
        <div className="flex-1 p-5 space-y-4 overflow-y-auto min-h-0 bg-[#0e1d38]">
          
          <div className="bg-gradient-to-tr from-[#162a4d] to-[#1a386b] border-2 border-[#F5A623] rounded-3xl p-5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F5A623] text-slate-950 flex items-center justify-center font-black shadow-lg">
                <Cloud className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">Biznet GIO NEO Object Storage</h3>
                <span className="text-xs text-emerald-300 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Terhubung & Aktif Siap Pakai
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#0e1d38] p-3 rounded-xl border border-blue-900">
                <span className="text-slate-400 block text-[10px]">Endpoint:</span>
                <span className="font-mono font-bold text-cyan-300 break-all">https://nos.jkt-1.neo.id</span>
              </div>

              <div className="bg-[#0e1d38] p-3 rounded-xl border border-blue-900">
                <span className="text-slate-400 block text-[10px]">Bucket Name:</span>
                <span className="font-mono font-bold text-[#F5A623]">utdi-care-storage</span>
              </div>

              <div className="bg-[#0e1d38] p-3 rounded-xl border border-blue-900">
                <span className="text-slate-400 block text-[10px]">Access Key ID:</span>
                <span className="font-mono font-bold text-slate-200">00d3e216103c97e72c51</span>
              </div>

              <div className="bg-[#0e1d38] p-3 rounded-xl border border-blue-900">
                <span className="text-slate-400 block text-[10px]">Integrasi Aplikasi:</span>
                <span className="font-bold text-emerald-400">Foto Profil, Laporan SOS, & Chat Mahasiswa</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-blue-900/60 flex items-center justify-between">
              <span className="text-[11px] text-blue-200">
                Sesuai dengan software CS Browser / S3 Browser yang Anda gunakan.
              </span>

              <button
                type="button"
                onClick={handleManualSync}
                disabled={isSyncing}
                className="bg-[#F5A623] hover:bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-lg transition active:scale-95 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Sync Sekarang</span>
              </button>
            </div>
          </div>

          <div className="bg-[#13274c] border border-blue-900 rounded-2xl p-4 text-xs space-y-2 text-slate-300">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Database className="w-4 h-4 text-cyan-400" />
              File yang otomatis tersinkron ke Biznet GIO:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li><code className="text-[#F5A623]">database-utdi.json</code> — Seluruh database live pengguna, kontak, dan laporan</li>
              <li><code className="text-[#F5A623]">data-mahasiswa.json</code> — Data mahasiswa Dewi Rahmawati (NIM 245410024)</li>
              <li><code className="text-[#F5A623]">laporan-darurat.json</code> — Riwayat laporan SOS darurat</li>
              <li><code className="text-[#F5A623]">utdi-uploads/...</code> — Folder foto profil dan bukti foto mahasiswa</li>
            </ul>
          </div>

        </div>
      )}

    </div>
  );
}

