import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Shield, ArrowRight, UserCheck } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';

export default function LoginScreen({ onLoginSuccess, onGoToRegister }) {
  const [identifier, setIdentifier] = useState('215410089');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 600);
  };

  const handleQuickDemo = () => {
    setIdentifier('215410089');
    setPassword('demo1234');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 400);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-4 bg-[#080e1c] text-slate-100 select-none">
      
      <div>
        <HeaderBar transparent={true} />
        
        {/* Top Brand Header */}
        <div className="flex flex-col items-center text-center mt-3 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#0e1d3d] border-2 border-blue-500/40 flex items-center justify-center shadow-lg shadow-blue-600/20 mb-3 relative">
            <Shield className="w-9 h-9 text-blue-400" />
            <span className="absolute -bottom-1 text-[9px] font-black bg-blue-600 text-white px-1.5 py-0.2 rounded uppercase">
              UTDI
            </span>
          </div>
          
          <h2 className="text-xl font-black text-white tracking-tight">
            Masuk Akun UTDI
          </h2>
          <p className="text-xs text-blue-300/70 font-medium mt-1">
            Sistem Keamanan & Layanan Terpadu Kampus
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Identifier (NIM / Email) */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              NIM / Email Mahasiswa
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-blue-400 absolute left-3.5" />
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Contoh: 215410089"
                className="w-full bg-[#11203f] border border-blue-900/60 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">
                Kata Sandi
              </label>
              <button
                type="button"
                onClick={() => alert("Silakan hubungi Biro Akademik/Puskom UTDI untuk reset kata sandi email mahasiswa.")}
                className="text-[11px] text-blue-400 hover:text-blue-300 transition"
              >
                Lupa Sandi?
              </button>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-blue-400 absolute left-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                className="w-full bg-[#11203f] border border-blue-900/60 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me checkbox */}
          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded bg-[#11203f] border-blue-900 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="remember" className="text-xs text-slate-300">
              Ingat akun saya di perangkat ini
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition transform active:scale-98 mt-2"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="mt-4 pt-3 border-t border-blue-950">
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full bg-[#13264c]/80 hover:bg-[#193264] border border-blue-800/60 text-blue-200 text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition"
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Login Instan (Akun Demo Mahasiswa)</span>
          </button>
        </div>
      </div>

      {/* Footer link to register */}
      <div className="pt-4 pb-2 text-center">
        <p className="text-xs text-slate-400">
          Belum memiliki akun terdaftar?{' '}
          <button
            onClick={onGoToRegister}
            className="text-blue-400 font-bold hover:underline"
          >
            Daftar Akun Baru
          </button>
        </p>
      </div>

    </div>
  );
}
