import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Shield, AlertTriangle, Copy, Check, Search, ExternalLink } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';
import CallModal from '../common/CallModal';
import { api } from '../../services/api';

export default function NomorDaruratScreen({ onBack, onStartVoiceCall }) {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [selectedCallContact, setSelectedCallContact] = useState(null);

  useEffect(() => {
    api.getEmergencyNumbers().then((res) => {
      if (res && res.contacts) {
        setContacts(res.contacts);
      }
    });
  }, []);

  const handleCopy = (id, phone) => {
    navigator.clipboard?.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenCallModal = (contact) => {
    setSelectedCallContact({
      title: contact.title,
      role: contact.description,
      phone: contact.phone,
      rawPhone: contact.phone,
      whatsapp: contact.whatsapp || '6282317789406'
    });
  };

  const filteredContacts = contacts.filter((c) => {
    const matchFilter = filter === 'all' || c.category === filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-[#1E3866] text-slate-100 select-none overflow-hidden">
      
      {/* Pinned Top Elements */}
      <div className="shrink-0">
        <HeaderBar title="Nomor Darurat (nor...)" showBack={true} onBack={onBack} />

        {/* Search Input */}
        <div className="px-5 pt-3 pb-2">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kontak darurat kampus..."
              className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="px-5 py-2 flex space-x-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'Semua' },
            { id: 'kampus', label: 'Satpam UTDI' },
            { id: 'ppks', label: 'PPKS UTDI' },
            { id: 'medis', label: 'Medis & RS' },
            { id: 'polisi', label: 'Polisi' },
            { id: 'damkar', label: 'Damkar' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition ${
                filter === tab.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-[#0f1f3d] text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Directory List (Scrollable, BottomNav stays pinned!) */}
      <div className="px-5 py-3 space-y-3 flex-1 overflow-y-auto min-h-0 pb-6">
        {filteredContacts.map((c) => (
          <div
            key={c.id}
            className={`rounded-2xl p-4 border transition ${
              c.isPrimary
                ? 'bg-[#0f224a] border-blue-600/50 shadow-lg'
                : 'bg-[#0d1b37] border-blue-900/40 shadow'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-black text-white">{c.title}</h4>
                  {c.badge && (
                    <span className="text-[9px] font-extrabold bg-blue-500/20 text-cyan-300 border border-blue-400/30 px-1.5 py-0.2 rounded uppercase">
                      {c.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  {c.description}
                </p>
                <div className="mt-2 text-sm font-extrabold text-blue-300 tracking-wider">
                  {c.phone}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-3 pt-2.5 border-t border-blue-950 flex items-center space-x-2">
              
              {/* Direct Call Button -> Opens Smart Call Modal (No OS crash!) */}
              <button
                type="button"
                onClick={() => handleOpenCallModal(c)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-950/50 transition active:scale-97 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Panggil</span>
              </button>

              {/* WhatsApp Button if available */}
              {c.whatsapp && (
                <a
                  href={`https://wa.me/${c.whatsapp.replace(/[^0-9]/g, '')}?text=Halo%20saya%20mahasiswa%20UTDI%20butuh%20bantuan%20darurat`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-800/80 hover:bg-emerald-700 text-emerald-200 border border-emerald-600/40 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center space-x-1 transition cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WA</span>
                </a>
              )}

              {/* Copy Number */}
              <button
                type="button"
                onClick={() => handleCopy(c.id, c.phone)}
                className="bg-[#12244a] hover:bg-[#183163] text-slate-300 border border-blue-900/60 py-2 px-3 rounded-xl text-xs flex items-center justify-center space-x-1 transition cursor-pointer"
              >
                {copiedId === c.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[10px]">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Salin</span>
                  </>
                )}
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* Smart Call Modal */}
      <CallModal
        isOpen={!!selectedCallContact}
        onClose={() => setSelectedCallContact(null)}
        contact={selectedCallContact || {}}
        onStartVoiceCall={onStartVoiceCall}
      />

    </div>
  );
}

