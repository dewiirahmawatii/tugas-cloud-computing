import React, { useState } from 'react';
import { User, CreditCard, BookOpen, Phone, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';

export default function RegisterScreen({ onRegisterSuccess, onBackToLogin }) {
  const [formData, setFormData] = useState({
    name: 'Ahmad Fauzi',
    nim: '215410089',
    prodi: 'S1 Informatika',
    phone: '0812-3456-7890',
    email: 'ahmad.fauzi@students.utdi.ac.id',
    password: 'password123',
    confirmPassword: 'password123',
  });
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert("Harap setujui syarat & ketentuan layanan keamanan UTDI.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onRegisterSuccess();
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-4 bg-[#080e1c] text-slate-100 select-none">
      
      <div>
        <HeaderBar 
          title="Pendaftaran Akun" 
          showBack={true} 
          onBack={onBackToLogin} 
        />

        <div className="mt-2 mb-4">
          <h2 className="text-lg font-black text-white tracking-tight">
            Registrasi Mahasiswa UTDI
          </h2>
          <p className="text-xs text-blue-300/70 font-medium">
            Lengkapi data diri untuk aktivasi akses darurat kampus
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          
          {/* Nama Lengkap */}
          <div>
            <label className="text-[11px] font-semibold text-slate-300">Nama Lengkap</label>
            <div className="relative flex items-center mt-1">
              <User className="w-3.5 h-3.5 text-blue-400 absolute left-3" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Nama sesuai KTM"
                className="w-full bg-[#11203f] border border-blue-900/60 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row: NIM & Prodi */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-300">NIM Mahasiswa</label>
              <div className="relative flex items-center mt-1">
                <CreditCard className="w-3.5 h-3.5 text-blue-400 absolute left-3" />
                <input
                  type="text"
                  name="nim"
                  required
                  value={formData.nim}
                  onChange={handleChange}
                  placeholder="215410089"
                  className="w-full bg-[#11203f] border border-blue-900/60 rounded-xl pl-9 pr-2 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-300">Program Studi</label>
              <div className="relative flex items-center mt-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-400 absolute left-3" />
                <select
                  name="prodi"
                  value={formData.prodi}
                  onChange={handleChange}
                  className="w-full bg-[#11203f] border border-blue-900/60 rounded-xl pl-9 pr-2 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="S1 Informatika">S1 Informatika</option>
                  <option value="S1 Sistem Informasi">S1 Sistem Informasi</option>
                  <option value="S1 Rekayasa Perangkat Lunak">S1 Rekayasa PL</option>
                  <option value="S1 Teknologi Informasi">S1 Teknologi Informasi</option>
                  <option value="D3 Manajemen Informatika">D3 MI</option>
                </select>
              </div>
            </div>
          </div>

          {/* Nomor HP */}
          <div>
            <label className="text-[11px] font-semibold text-slate-300">Nomor WhatsApp / HP Aktif</label>
            <div className="relative flex items-center mt-1">
              <Phone className="w-3.5 h-3.5 text-blue-400 absolute left-3" />
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="0812-3456-7890"
                className="w-full bg-[#11203f] border border-blue-900/60 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-[11px] font-semibold text-slate-300">Email Mahasiswa</label>
            <div className="relative flex items-center mt-1">
              <Mail className="w-3.5 h-3.5 text-blue-400 absolute left-3" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="nim@students.utdi.ac.id"
                className="w-full bg-[#11203f] border border-blue-900/60 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-300">Kata Sandi</label>
              <div className="relative flex items-center mt-1">
                <Lock className="w-3.5 h-3.5 text-blue-400 absolute left-3" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#11203f] border border-blue-900/60 rounded-xl pl-9 pr-2 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-300">Konfirmasi Sandi</label>
              <div className="relative flex items-center mt-1">
                <Lock className="w-3.5 h-3.5 text-blue-400 absolute left-3" />
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-[#11203f] border border-blue-900/60 rounded-xl pl-9 pr-2 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Aggreement Checkbox */}
          <div className="flex items-start space-x-2 pt-1">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-3.5 h-3.5 rounded bg-[#11203f] border-blue-900 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="agree" className="text-[11px] text-slate-300 leading-tight">
              Saya menyetujui Ketentuan Privasi & Penggunaan Layanan Keamanan Darurat Kampus UTDI.
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition transform active:scale-98 mt-2"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span className="text-xs">Daftar Akun Baru</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="pt-3 pb-1 text-center">
        <p className="text-xs text-slate-400">
          Sudah memiliki akun?{' '}
          <button
            onClick={onBackToLogin}
            className="text-blue-400 font-bold hover:underline"
          >
            Masuk Sekarang
          </button>
        </p>
      </div>

    </div>
  );
}
