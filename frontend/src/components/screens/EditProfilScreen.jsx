import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Save, Camera } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';

export default function EditProfilScreen({ user, onBack, onSaveSuccess }) {
  const [formData, setFormData] = useState({
    name: user?.name || 'Ahmad Fauzi',
    phone: user?.phone || '0812-3456-7890',
    email: user?.email || 'ahmad.fauzi@students.utdi.ac.id',
    alamat: user?.alamat || 'Jl. Karang Jambe No. 18, Banguntapan, Bantul, DIY',
    prodi: user?.prodi || 'S1 Informatika'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSaveSuccess("Profil mahasiswa berhasil diperbarui!");
    }, 500);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#070d1a] text-slate-100 select-none pb-4">
      
      <div>
        <HeaderBar title="Ubah Data Profil (Pe...)" showBack={true} onBack={onBack} />

        {/* Avatar change banner */}
        <div className="flex flex-col items-center py-4">
          <div className="relative">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border-2 border-blue-400 shadow-xl"
            />
            <button
              type="button"
              onClick={() => alert("Fitur ambil foto kamera siap.")}
              className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full border-2 border-[#070d1a] flex items-center justify-center text-white shadow hover:bg-blue-500"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-[11px] text-slate-400 mt-2">NIM: {user?.nim || '215410089'} (Tetap)</span>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="px-5 space-y-3">
          
          <div>
            <label className="text-[11px] font-semibold text-slate-300">Nama Lengkap</label>
            <div className="relative flex items-center mt-1">
              <User className="w-3.5 h-3.5 text-blue-400 absolute left-3" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300">Nomor Telepon / WhatsApp</label>
            <div className="relative flex items-center mt-1">
              <Phone className="w-3.5 h-3.5 text-blue-400 absolute left-3" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300">Email Mahasiswa</label>
            <div className="relative flex items-center mt-1">
              <Mail className="w-3.5 h-3.5 text-blue-400 absolute left-3" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300">Alamat Domisili di Jogja</label>
            <div className="relative flex items-start mt-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400 absolute left-3 top-2.5" />
              <textarea
                rows={2}
                value={formData.alamat}
                onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition"
            >
              <Save className="w-4 h-4" />
              <span className="text-xs">{loading ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </button>
          </div>

        </form>
      </div>

      <div className="px-5 text-center text-[10px] text-slate-500">
        Data ini disinkronkan dengan Sistem Informasi Akademik UTDI
      </div>

    </div>
  );
}
