import React, { useState, useRef } from 'react';
import { 
  MapPin, Siren, AlertTriangle, ShieldCheck, Flame, HeartPulse, 
  Camera, Upload, X, Check, Image as ImageIcon, Navigation 
} from 'lucide-react';
import HeaderBar from '../common/HeaderBar';
import RealMapView from '../common/RealMapView';
import { api } from '../../services/api';

export default function LaporDaruratScreen({ onBack, onSubmitSos }) {
  const [category, setCategory] = useState('Medis');
  const [locationName, setLocationName] = useState('Gedung Lab Terpadu Lt. 2, Sayap Barat UTDI');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Storage & Photo Attachment State
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef(null);

  const categories = [
    { id: 'Medis', label: 'Medis / P3K', icon: HeartPulse, color: 'text-emerald-400', border: 'border-emerald-500/50' },
    { id: 'Kejahatan', label: 'Keamanan / Ancaman', icon: AlertTriangle, color: 'text-red-400', border: 'border-red-500/50' },
    { id: 'PPKS', label: 'Satgas PPKS (Privasi)', icon: ShieldCheck, color: 'text-purple-400', border: 'border-purple-500/50' },
    { id: 'Bencana', label: 'Kebakaran / Gempa', icon: Flame, color: 'text-amber-400', border: 'border-amber-500/50' },
  ];

  // Handle Photo Selection & Upload to Storage
  const handlePhotoSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setIsUploadingPhoto(true);

    try {
      const uploadRes = await api.uploadFile(file);
      if (uploadRes && uploadRes.url) {
        setUploadedPhotoUrl(uploadRes.url);
      }
    } catch (err) {
      console.error('Gagal upload foto bukti:', err);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    setUploadedPhotoUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmitSos({
        type: category,
        location: locationName,
        note: notes || `Laporan darurat kategori ${category} di ${locationName}`,
        photoUrl: uploadedPhotoUrl || photoPreview || null
      });
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-[#1E3866] text-slate-100 select-none overflow-hidden">
      
      {/* Pinned Top Header */}
      <div className="shrink-0">
        <HeaderBar title="Peta & Lapor SOS (Da...)" showBack={true} onBack={onBack} />
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto min-h-0 pb-6">

        {/* Real Interactive Street & Satellite Map View */}
        <RealMapView 
          height="h-48"
          emergencyLocation={locationName}
          onRecenter={() => {
            setLocationName('Gedung Lab Terpadu Lt. 2, Kampus UTDI');
          }}
        />

        {/* Lapor Darurat Form */}
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3.5">
          
          {/* Pilih Kategori Bahaya */}
          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-2">
              Pilih Jenis Bantuan Darurat:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((c) => {
                const Icon = c.icon;
                const isSelected = category === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`p-2.5 rounded-xl border flex items-center space-x-2.5 transition text-left ${
                      isSelected
                        ? `bg-blue-600/30 ${c.border} text-white shadow-md ring-1 ring-blue-500`
                        : 'bg-[#0f1f3d] border-blue-900/50 text-slate-300 hover:bg-[#14264d]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${c.color} shrink-0`} />
                    <span className="text-[11px] font-bold leading-tight">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lokasi Terdeteksi */}
          <div>
            <label className="text-[11px] font-semibold text-slate-300">
              Lokasi Gedung / Ruangan:
            </label>
            <div className="relative flex items-center mt-1">
              <MapPin className="w-3.5 h-3.5 text-red-400 absolute left-3" />
              <input
                type="text"
                required
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="Nama gedung atau ruangan"
                className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Catatan Tambahan */}
          <div>
            <label className="text-[11px] font-semibold text-slate-300">
              Deskripsi Kejadian (Opsional):
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Ada rekan terjatuh di tangga Lab Jaringan, butuh pertolongan medis..."
              className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1 resize-none"
            />
          </div>

          {/* Storage Feature: Unggah Foto Bukti Kejadian */}
          <div>
            <label className="text-[11px] font-semibold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-[#F5A623]" />
                Foto Bukti Kejadian (Layanan Storage):
              </span>
              <span className="text-[10px] text-blue-300 font-medium">Opsional</span>
            </label>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              capture="environment"
              onChange={handlePhotoSelect}
              className="hidden"
            />

            {!photoPreview ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full mt-1.5 py-3 px-4 rounded-xl border border-dashed border-[#2b4c85] bg-[#0f1f3d] hover:bg-[#152a52] flex items-center justify-center space-x-2 text-xs text-blue-200 transition active:scale-98"
              >
                <Upload className="w-4 h-4 text-[#F5A623]" />
                <span className="font-semibold">Ambil / Unggah Foto Bukti ke Server</span>
              </button>
            ) : (
              <div className="mt-1.5 relative rounded-2xl overflow-hidden border border-blue-700/60 bg-[#0c1833]">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-sm"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-[10px] text-white flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-400" />
                    {isUploadingPhoto ? "Mengunggah ke storage..." : "Tersimpan di Cloud Storage"}
                  </span>
                  <span className="text-[#F5A623] font-bold">1 Foto Siap Dilaporkan</span>
                </div>
              </div>
            )}
          </div>

          {/* Big Red Action Button */}
          <button
            type="submit"
            disabled={loading || isUploadingPhoto}
            className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-extrabold py-3.5 px-4 rounded-2xl flex items-center justify-center space-x-2 shadow-xl shadow-red-900/50 border border-red-400/50 transition transform active:scale-97 mt-2"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <Siren className="w-5 h-5 text-white animate-bounce" />
                <span className="text-xs uppercase tracking-wider">KIRIM SINYAL DARURAT KE SATPAM</span>
              </>
            )}
          </button>

        </form>
      </div>

      <div className="px-5 text-center text-[10px] text-slate-400">
        Pos Keamanan Kampus UTDI akan segera menerima koordinat GPS dan foto bukti laporan Anda.
      </div>

    </div>
  );
}
