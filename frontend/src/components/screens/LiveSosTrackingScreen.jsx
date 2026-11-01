import React, { useState, useEffect } from 'react';
import { 
  Shield, Phone, Radio, CheckCircle, AlertTriangle, X, 
  Navigation, Car, Bell, ShieldCheck, UserCheck, MessageSquare
} from 'lucide-react';
import HeaderBar from '../common/HeaderBar';
import RealMapView from '../common/RealMapView';
import CallModal from '../common/CallModal';

export default function LiveSosTrackingScreen({ report, onCancel, onResolve }) {
  const [eta, setEta] = useState(2);
  const [carProgress, setCarProgress] = useState(20); // percentage along path
  const [isArrived, setIsArrived] = useState(false);
  const [showArrivalModal, setShowArrivalModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);

  // Simulate vehicle moving towards user and reaching destination
  useEffect(() => {
    const interval = setInterval(() => {
      setCarProgress((prev) => {
        if (prev >= 80) {
          setIsArrived(true);
          setShowArrivalModal(true);
          return 85;
        }
        return prev + 15;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-[#1E3866] text-slate-100 select-none overflow-hidden relative">
      
      {/* Pinned Top Header */}
      <div className="shrink-0">
        <HeaderBar 
          title="Tracking Sinyal Darurat (Dar...)" 
          showBack={false}
          rightElement={
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
              isArrived 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isArrived ? 'bg-emerald-400' : 'bg-red-500'}`}></span>
              {isArrived ? 'Petugas Tiba' : 'SOS Aktif'}
            </span>
          }
        />
      </div>

      {/* Arrival Alert Banner when officer reaches victim */}
      {isArrived && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 flex items-center justify-between text-white shrink-0 shadow-md animate-in slide-in-from-top duration-300">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
            <div>
              <span className="text-xs font-black tracking-wide">PETUGAS SUDAH SAMPAI DI LOKASI!</span>
              <p className="text-[10px] text-emerald-100 leading-tight">Pos Satpam & Satgas sudah berada di titik Anda.</p>
            </div>
          </div>
          <button
            onClick={() => setShowArrivalModal(true)}
            className="bg-white text-emerald-900 font-extrabold text-[10px] px-2.5 py-1 rounded-lg shadow"
          >
            Lihat
          </button>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto min-h-0 pb-6">

        {/* Real Map with Patrol Navigation Overlay */}
        <div className="relative">
          <RealMapView
            height="h-60"
            showPatrolRoute={true}
            carProgress={carProgress}
            officerName="Patroli Satpam"
            emergencyLocation={report?.location || "Kampus UTDI - Lab Terpadu Lt. 2"}
          />

          {/* Status Overlay Pill */}
          <div className={`absolute bottom-2.5 left-3 right-3 z-30 border rounded-xl px-3 py-1.5 backdrop-blur-md flex items-center justify-between text-xs shadow-lg ${
            isArrived
              ? 'bg-emerald-950/90 border-emerald-500/80 text-emerald-200'
              : 'bg-[#0a162e]/95 border-blue-700/80 text-white'
          }`}>
            <div className="flex items-center space-x-2">
              <span className={`w-2 h-2 rounded-full ${isArrived ? 'bg-emerald-400' : 'bg-emerald-400 animate-pulse'}`}></span>
              <span className="text-[11px] font-bold">Status:</span>
            </div>
            <span className={`text-xs font-black ${isArrived ? 'text-emerald-300' : 'text-amber-400'}`}>
              {isArrived ? '🟢 Petugas Telah Tiba di Lokasi Anda!' : '~2 Menit (Meluncur via Jl. Raya Janti)'}
            </span>
          </div>
        </div>

        {/* Dispatcher Details Card */}
        <div className="px-5 py-4 space-y-3">
          
          <div className="bg-[#0e1d3b] border border-blue-900/60 rounded-2xl p-4 shadow-lg">
            
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-blue-950">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">
                    {report?.officer || "Bripka Agus & Danru Security Pos Utama UTDI"}
                  </h4>
                  <p className="text-[10px] text-blue-300">
                    Unit Reaksi Cepat Kampus UTDI
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowCallModal(true)}
                className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-500 shadow-md shadow-emerald-950/50 cursor-pointer"
                title="Panggil Petugas Satpam"
              >
                <Phone className="w-4 h-4" />
              </button>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px] text-slate-300">Sinyal diterima Pos Satpam Utama (14:15)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[11px] text-slate-300">Regu 01 meluncur ke Gedung Lab Terpadu</span>
              </div>
              <div className="flex items-center space-x-2.5">
                {isArrived ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-[11px] font-black text-emerald-300">
                      Petugas telah sampai di lokasi Anda (Tatap Muka Langsung)
                    </span>
                  </>
                ) : (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-amber-400 flex items-center justify-center shrink-0">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                    </span>
                    <span className="text-[11px] font-bold text-amber-300">Petugas mendekati lokasi kejadian...</span>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={onResolve}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition active:scale-97 cursor-pointer shadow-lg shadow-emerald-950/50"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Bantuan Diterima</span>
            </button>
            <button
              onClick={onCancel}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition active:scale-97 cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Batalkan Sinyal</span>
            </button>
          </div>

        </div>
      </div>

      {/* Arrival Confirmation Modal */}
      {showArrivalModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-5 select-none animate-in fade-in duration-300">
          <div className="w-full max-w-[320px] bg-gradient-to-b from-[#18325a] to-[#0f1f3d] border-2 border-emerald-400 rounded-3xl p-5 text-center shadow-2xl relative overflow-hidden animate-in zoom-in-95">
            
            {/* Glowing Accent */}
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/40">
              <UserCheck className="w-8 h-8 text-emerald-400 animate-bounce" />
            </div>

            <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full inline-block mb-1.5">
              Notifikasi Kedatangan
            </span>

            <h3 className="text-base font-black text-white">
              Petugas Telah Sampai di Lokasi!
            </h3>

            <p className="text-xs text-blue-100 mt-2 leading-relaxed">
              Tim Satgas PPKS & Pos Satpam Utama UTDI (<strong>Bripka Agus & Danru Security</strong>) sudah berada di titik Anda.
            </p>

            <p className="text-[11px] text-amber-300 mt-1 font-semibold bg-amber-900/30 p-2 rounded-xl border border-amber-500/30">
              👋 Segera temui petugas berseragam atau lambaikan tangan Anda.
            </p>

            {/* Action buttons inside arrival modal */}
            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setShowArrivalModal(false);
                  onResolve();
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg transition active:scale-95 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Konfirmasi Bantuan Diterima</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowArrivalModal(false);
                  setShowCallModal(true);
                }}
                className="w-full bg-[#1e3866] hover:bg-[#284c8a] border border-blue-400/40 text-blue-200 font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition active:scale-95 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Hubungi Petugas (0823-1778-9406)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Smart Call Modal */}
      <CallModal
        isOpen={showCallModal}
        onClose={() => setShowCallModal(false)}
        contact={{
          title: "Bripka Agus & Danru Security Pos Utama UTDI",
          role: "Tim Reaksi Cepat Pos Satpam Kampus UTDI",
          phone: "0823-1778-9406",
          rawPhone: "082317789406",
          whatsapp: "6282317789406"
        }}
      />

    </div>
  );
}


