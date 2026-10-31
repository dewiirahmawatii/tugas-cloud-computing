import React, { useState, useRef } from 'react';
import { User, Phone, Mail, MapPin, Save, Camera, RefreshCw, Check } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';
import { api } from '../../services/api';

export default function EditProfilScreen({ user, onBack, onSaveSuccess, onUpdateUser }) {
  const [formData, setFormData] = useState({
    name: user?.name || 'Dewi',
    phone: user?.phone || '0812-2456-7890',
    email: user?.email || 'dewi.rahmawati24@students.utdi.ac.id',
    alamat: user?.alamat || 'Jl. Raya Janti No. 143, Banguntapan, Bantul, DIY',
    prodi: user?.prodi || 'S1 Informatika',
    avatar: user?.avatar || '/assets/dewi-avatar.jpg'
  });
  
  const [loading, setLoading] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef(null);

  // Upload photo to Biznet GIO storage
  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const uploadRes = await api.uploadFile(file);
      if (uploadRes && uploadRes.url) {
        setFormData(prev => ({ ...prev, avatar: uploadRes.url }));
        await api.updateProfile({ avatar: uploadRes.url });
        if (onUpdateUser) {
          onUpdateUser({ ...user, avatar: uploadRes.url });
        }
      }
    } catch (err) {
      console.error('Gagal mengunggah foto profil:', err);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.updateProfile(formData);
      const updated = res?.user || { ...user, ...formData };
      if (onUpdateUser) onUpdateUser(updated);
      setLoading(false);
      onSaveSuccess("Profil mahasiswa berhasil diperbarui di server!");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-[#1E3866] text-slate-100 select-none overflow-hidden">
      
      {/* Pinned Top Header */}
      <div className="shrink-0">
        <HeaderBar title="Ubah Data Profil (Pe...)" showBack={true} onBack={onBack} />
      </div>

      {/* Hidden File Input for Storage Upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handlePhotoSelect}
        className="hidden"
      />

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto min-h-0 pb-6">

        {/* Avatar change banner */}
        <div className="flex flex-col items-center py-4">
          <div className="relative cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
            <img
              src={formData.avatar || "/assets/dewi-avatar.jpg"}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border-2 border-[#F5A623] shadow-xl group-hover:opacity-90"
            />
            <button
              type="button"
              className="absolute bottom-0 right-0 w-7 h-7 bg-[#F5A623] hover:bg-amber-400 rounded-full border-2 border-[#1E3866] flex items-center justify-center text-slate-900 shadow transition active:scale-90"
              title="Ganti Foto Profil ke Biznet GIO"
            >
              {isUploadingPhoto ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Camera className="w-3.5 h-3.5 stroke-[2.5]" />
              )}
            </button>
          </div>
          <span className="text-[11px] text-slate-300 font-semibold mt-2">NIM: {user?.nim || '245410024'}</span>
          <span className="text-[10px] text-blue-300 flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Tersimpan di Biznet GIO Cloud Storage
          </span>
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
                className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623]"
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
                className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-300">Email Mahasiswa UTDI</label>
            <div className="relative flex items-center mt-1">
              <Mail className="w-3.5 h-3.5 text-blue-400 absolute left-3" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623]"
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
                className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623] resize-none"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F5A623] hover:bg-amber-400 text-slate-900 font-extrabold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span className="text-xs">{loading ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </button>
          </div>

        </form>
      </div>

      <div className="px-5 text-center text-[10px] text-slate-400">
        Data ini disinkronkan langsung dengan Server UTDI & Biznet GIO
      </div>

    </div>
  );
}
