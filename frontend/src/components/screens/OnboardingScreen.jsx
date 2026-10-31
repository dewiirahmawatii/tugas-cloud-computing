import React, { useState } from 'react';
import { ShieldCheck, HeartHandshake, ArrowRight, ArrowLeft } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';

export default function OnboardingScreen({ initialStep = 1, onComplete, onSkip }) {
  const [step, setStep] = useState(initialStep);

  const slides = [
    {
      id: 1,
      tag: "SISTEM KEAMANAN KAMPUS",
      title: "Respon Darurat Cepat & Terintegrasi",
      desc: "Kirim sinyal darurat (SOS) seketika dalam situasi krisis ke Pos Satpam UTDI, Tim P3K Medis Kampus, dan aparat kepolisian terdekat.",
      icon: ShieldCheck,
      iconColor: "text-red-400",
      accentBg: "from-red-600/20 via-blue-900/30 to-blue-950/20",
      ringColor: "border-red-500/40",
    },
    {
      id: 2,
      tag: "LAYANAN KONSELING & PPKS",
      title: "Pendampingan Mahasiswa & Perlindungan",
      desc: "Konsultasi psikologis terpercaya dengan konselor berpengalaman, serta pendampingan Satgas PPKS UTDI dengan kerahasiaan identitas 100%.",
      icon: HeartHandshake,
      iconColor: "text-blue-400",
      accentBg: "from-blue-600/20 via-indigo-900/30 to-blue-950/20",
      ringColor: "border-blue-400/40",
    }
  ];

  const currentSlide = slides[step - 1];
  const Icon = currentSlide.icon;

  const handleNext = () => {
    if (step < slides.length) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 py-4 bg-[#080e1c] text-slate-100 select-none">
      
      {/* Header with Skip option */}
      <div>
        <HeaderBar transparent={true} />
        <div className="flex justify-between items-center pt-2">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-xs text-blue-300 flex items-center gap-1 hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Kembali
            </button>
          ) : (
            <div></div>
          )}
          <button
            onClick={onSkip}
            className="text-xs font-semibold text-slate-400 hover:text-blue-300 tracking-wider uppercase transition"
          >
            Lewati
          </button>
        </div>
      </div>

      {/* Main Illustration & Graphic Area */}
      <div className="my-auto flex flex-col items-center text-center">
        
        {/* Animated Graphic Container */}
        <div className="relative mb-8">
          <div className={`w-44 h-44 rounded-full bg-gradient-to-b ${currentSlide.accentBg} p-1 border-2 ${currentSlide.ringColor} flex items-center justify-center shadow-2xl relative`}>
            
            {/* Concentric rings */}
            <div className="absolute inset-2 rounded-full border border-white/10 animate-ping-slow"></div>
            
            <div className="w-28 h-28 rounded-full bg-[#0d1a33] flex items-center justify-center shadow-inner border border-blue-800/40">
              <Icon className={`w-14 h-14 ${currentSlide.iconColor} stroke-[1.75]`} />
            </div>
          </div>
        </div>

        {/* Content details */}
        <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800/50 mb-3">
          {currentSlide.tag}
        </span>
        <h2 className="text-xl font-extrabold text-white leading-tight mb-3">
          {currentSlide.title}
        </h2>
        <p className="text-xs leading-relaxed text-slate-300 max-w-xs font-normal">
          {currentSlide.desc}
        </p>

      </div>

      {/* Bottom Navigation & Indicator */}
      <div className="w-full pb-4">
        
        {/* Slide Indicator Dots */}
        <div className="flex justify-center items-center space-x-2 mb-6">
          {slides.map((s, idx) => (
            <span
              key={s.id}
              className={`h-2 rounded-full transition-all duration-300 ${
                step === idx + 1 ? 'w-8 bg-blue-500 shadow-md shadow-blue-500/50' : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/30 transition transform active:scale-98"
        >
          <span>{step === slides.length ? 'Mulai Sekarang' : 'Lanjutkan'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
