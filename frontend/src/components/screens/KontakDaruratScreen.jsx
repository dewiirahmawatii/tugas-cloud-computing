import React, { useState, useEffect } from 'react';
import { Users, Phone, Trash2, Plus, Heart, Shield, Check, RefreshCw } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';
import { api } from '../../services/api';

export default function KontakDaruratScreen({ user, onBack, onSaveSuccess }) {
  const [contacts, setContacts] = useState(user?.emergencyContacts || []);
  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRel, setNewRel] = useState('Orang Tua');
  const [newPhone, setNewPhone] = useState('');

  // Fetch emergency contacts from backend on mount
  useEffect(() => {
    api.getEmergencyContacts().then(res => {
      if (res && res.contacts) {
        setContacts(res.contacts);
      }
    });
  }, []);

  const handleDelete = async (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
    try {
      await api.deleteEmergencyContact(id);
      if (onSaveSuccess) onSaveSuccess("Kontak darurat kerabat berhasil dihapus.");
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newName || !newPhone) return;
    
    setLoading(true);
    try {
      const res = await api.addEmergencyContact({
        name: `${newName} (${newRel})`,
        relationship: newRel,
        phone: newPhone
      });
      if (res && res.contacts) {
        setContacts(res.contacts);
      } else {
        setContacts(prev => [...prev, {
          id: "ec_" + Date.now(),
          name: `${newName} (${newRel})`,
          relationship: newRel,
          phone: newPhone
        }]);
      }
      setShowAddModal(false);
      setNewName('');
      setNewPhone('');
      if (onSaveSuccess) onSaveSuccess("Kontak darurat kerabat berhasil ditambahkan ke database!");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-[#1E3866] text-slate-100 select-none overflow-hidden">
      
      {/* Pinned Top Header */}
      <div className="shrink-0">
        <HeaderBar title="Kontak Darurat Saya (Ko...)" showBack={true} onBack={onBack} />
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto min-h-0 pb-6">

        <div className="px-5 py-4">
          
          <div className="bg-[#0f1f3d] border border-blue-900/50 rounded-2xl p-3.5 mb-4 flex items-start space-x-3">
            <Heart className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-snug">
              Nomor-nomor ini akan menerima SMS/Panggilan otomatis saat Anda menekan tombol SOS darurat.
            </p>
          </div>

          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Daftar Kerabat ({contacts.length})
            </h4>
            <button
              onClick={() => setShowAddModal(true)}
              className="text-xs text-[#F5A623] hover:text-amber-400 font-bold flex items-center gap-1 bg-blue-950/60 border border-blue-800/60 px-2.5 py-1 rounded-lg transition active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah
            </button>
          </div>

          <div className="space-y-2.5">
            {contacts.map((c) => (
              <div
                key={c.id}
                className="bg-[#0e1d3b] border border-blue-900/50 rounded-2xl p-3.5 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">{c.name}</h5>
                    <span className="text-[11px] text-blue-300 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-slate-400" /> {c.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5">
                  <a
                    href={`tel:${c.phone}`}
                    className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center hover:bg-emerald-600/30 transition active:scale-90"
                    title="Panggil"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center hover:bg-red-600/30 transition active:scale-90"
                    title="Hapus"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 select-none animate-in fade-in">
          <div className="w-full max-w-xs bg-[#162a4d] border border-[#2b4c85] rounded-3xl p-5 shadow-2xl">
            <h3 className="text-sm font-extrabold text-white mb-3">
              Tambah Kontak Darurat
            </h3>
            
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-400 font-semibold block mb-1">Nama Lengkap Kerabat:</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623]"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-semibold block mb-1">Hubungan Keluarga:</label>
                <select
                  value={newRel}
                  onChange={(e) => setNewRel(e.target.value)}
                  className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623]"
                >
                  <option value="Orang Tua">Orang Tua</option>
                  <option value="Wali / Keluarga">Wali / Keluarga</option>
                  <option value="Sahabat / Teman Kost">Sahabat / Teman Kost</option>
                  <option value="Dosen Wali">Dosen Wali</option>
                  <option value="Saudara Kandung">Saudara Kandung</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 font-semibold block mb-1">Nomor WhatsApp / HP Aktif:</label>
                <input
                  type="tel"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="0812-xxxx-xxxx"
                  className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 rounded-xl text-xs transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#F5A623] hover:bg-amber-400 text-slate-950 font-black py-2 rounded-xl text-xs transition active:scale-95 shadow flex items-center justify-center gap-1"
                >
                  {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
