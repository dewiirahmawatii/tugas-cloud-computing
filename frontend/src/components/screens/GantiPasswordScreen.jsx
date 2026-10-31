import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';

export default function GantiPasswordScreen({ onBack, onSaveSuccess }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Konfirmasi kata sandi tidak cocok!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSaveSuccess("Kata sandi akun UTDI berhasil diubah!");
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#1E3866] text-slate-100 select-none pb-4">
      
      <div>
        <HeaderBar title="Ganti Kata Sandi (ga...)" showBack={true} onBack={onBack} />

        <div className="px-5 py-4">
          <div className="bg-[#0f1f3d] border border-blue-900/50 rounded-2xl p-4 mb-4 flex items-center space-x-3">
            <ShieldCheck className="w-8 h-8 text-blue-400 shrink-0" />
            <p className="text-xs text-slate-300 leading-snug">
              Pastikan kata sandi baru minimal 8 karakter dan mengandung kombinasi huruf serta angka.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            <div>
              <label className="text-[11px] font-semibold text-slate-300">Kata Sandi Lama</label>
              <div className="relative flex items-center mt-1">
                <Lock className="w-3.5 h-3.5 text-blue-400 absolute left-3" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Masukkan kata sandi lama"
                  className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl pl-9 pr-9 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300">Kata Sandi Baru</label>
              <div className="relative flex items-center mt-1">
                <Lock className="w-3.5 h-3.5 text-blue-400 absolute left-3" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl pl-9 pr-9 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300">Konfirmasi Sandi Baru</label>
              <div className="relative flex items-center mt-1">
                <Lock className="w-3.5 h-3.5 text-blue-400 absolute left-3" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ketik ulang kata sandi baru"
                  className="w-full bg-[#0f1f3d] border border-blue-900/60 rounded-xl pl-9 pr-9 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <input
                type="checkbox"
                id="showPass"
                checked={showPass}
                onChange={(e) => setShowPass(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-[#0f1f3d] border-blue-900 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="showPass" className="text-xs text-slate-300">
                Tampilkan kata sandi
              </label>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition"
              >
                <span className="text-xs">{loading ? 'Memproses...' : 'Perbarui Kata Sandi'}</span>
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}

