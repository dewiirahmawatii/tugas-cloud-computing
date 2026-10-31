import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, ChevronRight, Settings, Shield, Lock, LogOut, 
  Eye, EyeOff, Check, X, Camera, Upload, User, Phone, Mail, 
  MapPin, RefreshCw, CheckCircle2
} from 'lucide-react';
import { api } from '../../services/api';

export default function ProfilScreen({ 
  user: initialUser, 
  onLogout,
  onBack,
  onUpdateUser,
  initialView = 'main' // 'main', 'pengaturan', 'ganti-sandi', 'privasi', 'edit-bio'
}) {
  const [view, setView] = useState(initialView);
  const [currentUser, setCurrentUser] = useState(initialUser || {
    id: "usr_utdi_24001",
    name: "Dewi",
    fullName: "Dewi Rahmawati",
    nim: "245410024",
    prodi: "S1 Informatika",
    email: "dewi.rahmawati24@students.utdi.ac.id",
    phone: "0812-2456-7890",
    alamat: "Jl. Raya Janti No. 143, Banguntapan, Bantul, DIY",
    avatar: "/assets/dewi-avatar.jpg"
  });

  // Sync with initialUser prop changes
  useEffect(() => {
    if (initialUser) {
      setCurrentUser(initialUser);
    }
  }, [initialUser]);

  // Fetch latest user from backend on mount so Biznet GIO photo is immediately visible
  useEffect(() => {
    api.getMe().then(res => {
      if (res && res.user) {
        setCurrentUser(res.user);
        if (onUpdateUser) onUpdateUser(res.user);
      }
    });
  }, []);

  // Storage / Avatar Upload state
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const avatarInputRef = useRef(null);
  
  // Password change state
  const [currentPass, setCurrentPass] = useState('password123');
  const [newPass, setNewPass] = useState('newpassword123');
  const [confirmPass, setConfirmPass] = useState('newpassword123');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Modals state
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Konfir sandi
  const [showSuccessModal, setShowSuccessModal] = useState(false); // acc sandi

  // Edit Bio state
  const [editName, setEditName] = useState(currentUser.name || 'Dewi');
  const [editPhone, setEditPhone] = useState(currentUser.phone || '0812-2456-7890');
  const [editEmail, setEditEmail] = useState(currentUser.email || 'dewi.rahmawati24@students.utdi.ac.id');
  const [editAlamat, setEditAlamat] = useState(currentUser.alamat || 'Jl. Raya Janti No. 143, Banguntapan, Bantul, DIY');
  const [isSavingBio, setIsSavingBio] = useState(false);

  // Privacy checkboxes state
  const [privacySettings, setPrivacySettings] = useState(
    currentUser?.privacySettings || {
      anonim: true,
      hideEmail: true,
      confirmSos: true,
    }
  );

  // Sync privacy changes with backend
  const handleTogglePrivacy = async (key) => {
    const updated = { ...privacySettings, [key]: !privacySettings[key] };
    setPrivacySettings(updated);
    try {
      await api.updatePrivacy(updated);
      showToast("Pengaturan privasi diperbarui!");
    } catch (e) {
      console.error(e);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Avatar Upload to Storage Handler
  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingAvatar(true);
    try {
      const uploadRes = await api.uploadFile(file);
      if (uploadRes && uploadRes.url) {
        // Save new avatar to user profile in backend
        const updateRes = await api.updateProfile({ avatar: uploadRes.url });
        const updatedUser = updateRes?.user || { ...currentUser, avatar: uploadRes.url };
        setCurrentUser(updatedUser);
        if (onUpdateUser) onUpdateUser(updatedUser);
        showToast("Foto profil tersimpan di Biznet GIO!");
      }
    } catch (err) {
      console.error("Gagal mengunggah foto profil:", err);
      showToast("Gagal menyimpan foto profil");
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Save Bio Handler
  const handleSaveBio = async (e) => {
    e.preventDefault();
    setIsSavingBio(true);
    try {
      const res = await api.updateProfile({
        name: editName,
        phone: editPhone,
        email: editEmail,
        alamat: editAlamat
      });
      const updatedUser = res?.user || {
        ...currentUser,
        name: editName,
        phone: editPhone,
        email: editEmail,
        alamat: editAlamat
      };
      setCurrentUser(updatedUser);
      if (onUpdateUser) onUpdateUser(updatedUser);
      showToast("Data profil mahasiswa berhasil disimpan!");
      setView('main');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingBio(false);
    }
  };

  // Submit Password Change
  const handleConfirmPasswordChange = async () => {
    setShowConfirmModal(false);
    try {
      await api.updatePassword({
        oldPassword: currentPass,
        newPassword: newPass
      });
      setShowSuccessModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  const studentName = currentUser.name || "Dewi";
  const studentEmail = currentUser.email || "dewi.rahmawati24@students.utdi.ac.id";
  const avatarUrl = currentUser.avatar || "/assets/dewi-avatar.jpg";

  // Shared Profile Header Component with Click-to-Upload Storage Avatar
  const ProfileHeader = () => (
    <div className="flex flex-col items-center my-4 relative">
      <input
        type="file"
        ref={avatarInputRef}
        accept="image/*"
        onChange={handleAvatarChange}
        className="hidden"
      />
      
      {/* Avatar Container with interactive camera badge */}
      <div 
        onClick={() => avatarInputRef.current?.click()}
        className="relative group cursor-pointer"
        title="Klik untuk ganti foto profil via Storage"
      >
        <div className="w-20 h-20 rounded-full border-2 border-[#F5A623] p-0.5 shadow-lg overflow-hidden bg-[#162a4d] mb-2.5 transition group-hover:opacity-90">
          <img
            src={avatarUrl}
            alt={studentName}
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Camera Pill Overlay */}
        <div className="absolute bottom-2 right-0 bg-[#F5A623] hover:bg-amber-400 text-slate-900 p-1.5 rounded-full shadow-md border-2 border-[#1E3866] flex items-center justify-center transition active:scale-90">
          {isUploadingAvatar ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Camera className="w-3.5 h-3.5 stroke-[2.5]" />
          )}
        </div>
      </div>

      <h3 className="text-base font-extrabold text-[#F5A623] tracking-tight">
        {studentName}
      </h3>
      <p className="text-[11px] text-slate-300 font-medium">
        {studentEmail}
      </p>

      {/* Storage indicator badge */}
      <span className="text-[9px] text-blue-300 bg-blue-950/70 border border-blue-800/60 px-2 py-0.5 rounded-full mt-1.5 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
        Data Terhubung ke Backend Server
      </span>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-[#1E3866] text-white select-none pb-2 overflow-hidden relative">
      
      {/* Floating Success Toast */}
      {toastMessage && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-emerald-600/95 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xl border border-emerald-400 flex items-center gap-1.5 animate-in fade-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
          {toastMessage}
        </div>
      )}

      {/* ======================================================== */}
      {/* 1. VIEW: PROFIL (Main Profile Screen)                    */}
      {/* ======================================================== */}
      {view === 'main' && (
        <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
          {/* Header */}
          <div className="px-5 pt-3 pb-3 flex items-center space-x-3 border-b border-[#2b4c85] shrink-0 relative z-30">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (onBack) onBack();
              }}
              className="w-10 h-10 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] active:bg-[#254680] border border-[#2b4c85] flex items-center justify-center text-white transition-all active:scale-90 cursor-pointer shadow-md"
              title="Kembali ke Beranda"
            >
              <ArrowLeft className="w-5 h-5 text-white stroke-[2.5]" />
            </button>
            <h2 className="text-base sm:text-lg font-black text-[#F5A623] tracking-wide">
              Profil
            </h2>
          </div>

          <div className="px-5 flex-1 overflow-y-auto min-h-0 pb-6">
            <ProfileHeader />

            {/* Menu Options */}
            <div className="space-y-3 mt-4">
              
              {/* 1. Pengaturan Akun */}
              <div
                onClick={() => setView('pengaturan')}
                className="bg-[#162a4d] hover:bg-[#1c3561] border border-[#2b4c85] rounded-2xl p-4 flex items-center justify-between cursor-pointer transition active:scale-98 shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-white">
                    <Settings className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    Pengaturan Akun
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>

              {/* 2. Privasi dan Keamanan */}
              <div
                onClick={() => setView('privasi')}
                className="bg-[#162a4d] hover:bg-[#1c3561] border border-[#2b4c85] rounded-2xl p-4 flex items-center justify-between cursor-pointer transition active:scale-98 shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-white">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    Privasi dan Keamanan
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>

              {/* 3. Edit Data Mahasiswa */}
              <div
                onClick={() => setView('edit-bio')}
                className="bg-[#162a4d] hover:bg-[#1c3561] border border-[#2b4c85] rounded-2xl p-4 flex items-center justify-between cursor-pointer transition active:scale-98 shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-[#F5A623]/20 border border-[#F5A623]/30 flex items-center justify-center text-[#F5A623]">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    Edit Data Mahasiswa
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. VIEW: PENGATURAN AKUN                                 */}
      {/* ======================================================== */}
      {view === 'pengaturan' && (
        <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
          {/* Header */}
          <div className="px-5 pt-3 pb-3 flex items-center space-x-3 border-b border-[#2b4c85] shrink-0 relative z-30">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (initialView === 'pengaturan' && onBack) {
                  onBack();
                } else {
                  setView('main');
                }
              }}
              className="w-10 h-10 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] active:bg-[#254680] border border-[#2b4c85] flex items-center justify-center text-white transition-all active:scale-90 cursor-pointer shadow-md"
              title="Kembali"
            >
              <ArrowLeft className="w-5 h-5 text-white stroke-[2.5]" />
            </button>
            <h2 className="text-base sm:text-lg font-black text-[#F5A623] tracking-wide">
              Pengaturan Akun
            </h2>
          </div>

          <div className="px-5 flex-1 overflow-y-auto min-h-0 pb-6">
            <ProfileHeader />

            {/* Menu Options */}
            <div className="space-y-3 mt-4">
              
              {/* Ganti Foto Profil */}
              <div
                onClick={() => avatarInputRef.current?.click()}
                className="bg-[#162a4d] hover:bg-[#1c3561] border border-[#2b4c85] rounded-2xl p-4 flex items-center justify-between cursor-pointer transition active:scale-98 shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-white">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-white tracking-wide block">
                      Ganti Foto Profil
                    </span>
                    <span className="text-[10px] text-slate-300">
                      Simpan foto ke storage server
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>

              {/* Ubah Kata Sandi */}
              <div
                onClick={() => setView('ganti-sandi')}
                className="bg-[#162a4d] hover:bg-[#1c3561] border border-[#2b4c85] rounded-2xl p-4 flex items-center justify-between cursor-pointer transition active:scale-98 shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-white">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    Ubah Kata Sandi
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>

              {/* Keluar Akun */}
              <div
                onClick={onLogout}
                className="bg-[#162a4d] hover:bg-[#1c3561] border border-[#2b4c85] rounded-2xl p-4 flex items-center justify-between cursor-pointer transition active:scale-98 shadow-md"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-400/30 flex items-center justify-center text-red-300">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    Keluar Akun
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. VIEW: GANTI SANDI                                     */}
      {/* ======================================================== */}
      {view === 'ganti-sandi' && (
        <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden relative">
          {/* Header */}
          <div className="px-5 pt-3 pb-3 flex items-center space-x-3 border-b border-[#2b4c85] shrink-0 relative z-30">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (initialView === 'ganti-sandi' && onBack) {
                  onBack();
                } else {
                  setView('pengaturan');
                }
              }}
              className="w-10 h-10 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] active:bg-[#254680] border border-[#2b4c85] flex items-center justify-center text-white transition-all active:scale-90 cursor-pointer shadow-md"
              title="Kembali"
            >
              <ArrowLeft className="w-5 h-5 text-white stroke-[2.5]" />
            </button>
            <h2 className="text-base sm:text-lg font-black text-[#F5A623] tracking-wide">
              Ubah Kata Sandi
            </h2>
          </div>

          <div className="px-5 py-4 flex-1 overflow-y-auto min-h-0 space-y-4 pb-6">
            
            {/* Input 1: Kata Sandi Saat Ini */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-200">
                Kata Sandi Saat Ini
              </label>
              <div className="relative flex items-center">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  className="w-full bg-[#CBD5E1] text-slate-900 font-medium rounded-xl pl-3.5 pr-10 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 text-slate-600 hover:text-slate-900"
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Input 2: Kata Sandi Baru */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-200">
                Kata Sandi Baru
              </label>
              <div className="relative flex items-center">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full bg-[#CBD5E1] text-slate-900 font-medium rounded-xl pl-3.5 pr-10 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 text-slate-600 hover:text-slate-900"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Input 3: Konfirmasi Kata Sandi Baru */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-200">
                Konfirmasi Kata Sandi Baru
              </label>
              <div className="relative flex items-center">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="w-full bg-[#CBD5E1] text-slate-900 font-medium rounded-xl pl-3.5 pr-10 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#F5A623]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 text-slate-600 hover:text-slate-900"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Tombol Konfirmasi Perubahan */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="w-full bg-[#162a4d] hover:bg-[#122340] border-2 border-[#F5A623] text-white font-extrabold py-2.5 px-4 rounded-xl text-xs transition active:scale-98 shadow-md"
              >
                Konfirmasi Perubahan
              </button>
            </div>

          </div>

          {/* MODAL 1: Konfir sandi */}
          {showConfirmModal && (
            <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-5 select-none animate-in fade-in">
              <div className="w-full max-w-[280px] bg-[#162a4d] border-2 border-[#2b4c85] rounded-2xl p-5 text-center shadow-2xl">
                
                <h4 className="text-xs sm:text-sm font-extrabold text-white mb-5 leading-snug">
                  Yakin Merubah Kata Sandi ?
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowConfirmModal(false)}
                    className="bg-[#F5A623] hover:bg-amber-400 text-slate-900 font-black py-2 rounded-xl text-xs transition active:scale-95 shadow"
                  >
                    Tidak
                  </button>

                  <button
                    onClick={handleConfirmPasswordChange}
                    className="bg-[#1E3866] hover:bg-[#254680] border border-[#2b4c85] text-white font-black py-2 rounded-xl text-xs transition active:scale-95 shadow"
                  >
                    Ya
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL 2: acc sandi */}
          {showSuccessModal && (
            <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-5 select-none animate-in fade-in">
              <div 
                onClick={() => {
                  setShowSuccessModal(false);
                  setView('pengaturan');
                }}
                className="w-full max-w-[280px] bg-[#162a4d] border-2 border-[#2b4c85] rounded-2xl p-6 text-center shadow-2xl cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-[#F5A623]/20 border-2 border-[#F5A623] flex items-center justify-center mx-auto mb-3 shadow-md animate-bounce">
                  <Check className="w-8 h-8 text-[#F5A623] stroke-[3]" />
                </div>

                <h4 className="text-xs sm:text-sm font-black text-white leading-snug">
                  Kata Sandi Berhasil Diubah
                </h4>

                <span className="text-[10px] text-blue-200 mt-2 block">
                  Ketuk untuk kembali
                </span>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* 4. VIEW: PRIVASI DAN KEAMANAN                            */}
      {/* ======================================================== */}
      {view === 'privasi' && (
        <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
          {/* Header */}
          <div className="px-5 pt-3 pb-3 flex items-center space-x-3 border-b border-[#2b4c85] shrink-0 relative z-30">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (initialView === 'privasi' && onBack) {
                  onBack();
                } else {
                  setView('main');
                }
              }}
              className="w-10 h-10 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] active:bg-[#254680] border border-[#2b4c85] flex items-center justify-center text-white transition-all active:scale-90 cursor-pointer shadow-md"
              title="Kembali"
            >
              <ArrowLeft className="w-5 h-5 text-white stroke-[2.5]" />
            </button>
            <h2 className="text-base sm:text-lg font-black text-[#F5A623] tracking-wide">
              Privasi dan Keamanan
            </h2>
          </div>

          <div className="px-5 flex-1 overflow-y-auto min-h-0 pb-6">
            <ProfileHeader />

            {/* Privacy Card with 3 Checkboxes */}
            <div className="bg-[#162a4d] border border-[#2b4c85] rounded-2xl p-4 space-y-4 shadow-md mt-4">
              
              {/* Option 1: Mode Anonim */}
              <div 
                onClick={() => handleTogglePrivacy('anonim')}
                className="flex items-start space-x-3 cursor-pointer group"
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition ${
                  privacySettings.anonim ? 'bg-[#F5A623] text-slate-900 font-bold' : 'bg-slate-700 border border-slate-500'
                }`}>
                  {privacySettings.anonim && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#F5A623] transition">
                    Mode Anonim
                  </h4>
                  <p className="text-[10px] text-slate-300 leading-snug mt-0.5">
                    Laporan dikirim tanpa menampilkan identitas pengguna.
                  </p>
                </div>
              </div>

              {/* Option 2: Sembunyikan e-mail */}
              <div 
                onClick={() => handleTogglePrivacy('hideEmail')}
                className="flex items-start space-x-3 cursor-pointer group"
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition ${
                  privacySettings.hideEmail ? 'bg-[#F5A623] text-slate-900 font-bold' : 'bg-slate-700 border border-slate-500'
                }`}>
                  {privacySettings.hideEmail && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#F5A623] transition">
                    Sembunyikan e-mail
                  </h4>
                  <p className="text-[10px] text-slate-300 leading-snug mt-0.5">
                    Email tidak akan ditampilkan pada laporan.
                  </p>
                </div>
              </div>

              {/* Option 3: Konfirmasi Sebelum Mengirim SOS */}
              <div 
                onClick={() => handleTogglePrivacy('confirmSos')}
                className="flex items-start space-x-3 cursor-pointer group"
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition ${
                  privacySettings.confirmSos ? 'bg-[#F5A623] text-slate-900 font-bold' : 'bg-slate-700 border border-slate-500'
                }`}>
                  {privacySettings.confirmSos && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#F5A623] transition">
                    Konfirmasi Sebelum Mengirim SOS
                  </h4>
                  <p className="text-[10px] text-slate-300 leading-snug mt-0.5">
                    Menampilkan konfirmasi pop-up sebelum sinyal terkirim.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. VIEW: EDIT DATA MAHASISWA                             */}
      {/* ======================================================== */}
      {view === 'edit-bio' && (
        <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
          <div className="px-5 pt-3 pb-3 flex items-center space-x-3 border-b border-[#2b4c85] shrink-0 relative z-30">
            <button
              type="button"
              onClick={() => setView('main')}
              className="w-10 h-10 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] active:bg-[#254680] border border-[#2b4c85] flex items-center justify-center text-white transition-all active:scale-90 cursor-pointer shadow-md"
              title="Kembali"
            >
              <ArrowLeft className="w-5 h-5 text-white stroke-[2.5]" />
            </button>
            <h2 className="text-base sm:text-lg font-black text-[#F5A623] tracking-wide">
              Edit Data Mahasiswa
            </h2>
          </div>

          <form onSubmit={handleSaveBio} className="px-5 py-4 flex-1 overflow-y-auto min-h-0 space-y-3.5 pb-6">
            <div>
              <label className="text-[11px] font-semibold text-slate-300">Nama Panggilan:</label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623] mt-1"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300">Nomor Telepon / WA:</label>
              <input
                type="text"
                required
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623] mt-1"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300">Email Mahasiswa UTDI:</label>
              <input
                type="email"
                required
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623] mt-1"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300">Alamat Tempat Tinggal / Kost:</label>
              <textarea
                rows={2}
                value={editAlamat}
                onChange={(e) => setEditAlamat(e.target.value)}
                className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#F5A623] mt-1 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSavingBio}
              className="w-full bg-[#F5A623] hover:bg-amber-400 text-slate-900 font-extrabold py-2.5 rounded-xl text-xs transition active:scale-95 shadow-lg mt-4 flex items-center justify-center gap-1.5"
            >
              {isSavingBio ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Simpan Perubahan ke Database"}
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
