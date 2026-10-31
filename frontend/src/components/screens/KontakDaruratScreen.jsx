import React, { useState } from 'react';
import { Users, Phone, Trash2, Plus, Heart, Shield, Check } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';

export default function KontakDaruratScreen({ user, onBack, onSaveSuccess }) {
  const [contacts, setContacts] = useState(user?.emergencyContacts || [
    { id: "ec_1", name: "Bambang Suharsono (Ayah)", relationship: "Orang Tua", phone: "0813-9988-7766" },
    { id: "ec_2", name: "Sri Wahyuni (Ibu)", relationship: "Orang Tua", phone: "0812-7766-5544" },
    { id: "ec_3", name: "Rizky Dwi (Teman Kost)", relationship: "Sahabat", phone: "0878-1234-5678" }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRel, setNewRel] = useState('Orang Tua');
  const [newPhone, setNewPhone] = useState('');

  const handleDelete = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newName || !newPhone) return;
    const newC = {
      id: "ec_" + Date.now(),
      name: `${newName} (${newRel})`,
      relationship: newRel,
      phone: newPhone
    };
    setContacts([...contacts, newC]);
    setShowAddModal(false);
    setNewName('');
    setNewPhone('');
    onSaveSuccess("Kontak darurat kerabat berhasil ditambahkan!");
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#1E3866] text-slate-100 select-none pb-4">
      
      <div>
        <HeaderBar title="Kontak Darurat Saya (Ko...)" showBack={true} onBack={onBack} />

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
              className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 bg-blue-950/60 border border-blue-800/60 px-2.5 py-1 rounded-lg"
            >
              <Plus className="w-3.5 h-3.5" /> Tambah
            </button>
          </div>

          <div className="space-y-2.5">
            {contacts.map((c) => (
              <div
                key={c.id}
                className="bg-[#0e1d3b] border border-blue-900/50 rounded-2xl p-3.5 flex items-center justify-between"
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
                    className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center hover:bg-emerald-600/30 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center hover:bg-red-600/30 transition"
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
          <div className="w-full max-w-xs bg-[#0e1d3b] border border-blue-800 rounded-3xl p-5 shadow-2xl">
            <h4 className="text-sm font-bold text-white mb-3">Tambah Kontak Darurat</h4>
            
            <form onSubmit={handleAdd} className="space-y-3">
              <div>
                <label className="text-[10px] font-semibold text-slate-300">Nama Kerabat</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pak Joko"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#091326] border border-blue-900 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-300">Hubungan</label>
                <select
                  value={newRel}
                  onChange={(e) => setNewRel(e.target.value)}
                  className="w-full bg-[#091326] border border-blue-900 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                >
                  <option value="Orang Tua">Orang Tua (Ayah/Ibu)</option>
                  <option value="Saudara">Kakak / Adik</option>
                  <option value="Teman Kost">Teman Kost</option>
                  <option value="Wali">Wali Mahasiswa</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-300">Nomor WhatsApp / HP</label>
                <input
                  type="tel"
                  required
                  placeholder="08xxxxxxxxxx"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-[#091326] border border-blue-900 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                />
              </div>

              <div className="flex space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 rounded-xl text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-xl text-xs"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

