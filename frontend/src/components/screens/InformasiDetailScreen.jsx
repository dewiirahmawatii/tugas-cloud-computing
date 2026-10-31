import React from 'react';
import { ArrowLeft, Share2, Bookmark, Clock, User, ShieldCheck } from 'lucide-react';
import HeaderBar from '../common/HeaderBar';

export default function InformasiDetailScreen({ article, onBack, onOpenEmergency }) {
  const current = article || {
    title: "Panduan Evakuasi Bencana Gempa Bumi UTDI",
    category: "Keselamatan Kampus",
    readTime: "3 Menit",
    date: "28 Okt 2026",
    author: "Biro Keselamatan & Sarpras UTDI",
    image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80",
    content: `
### Prosedur Tanggap Darurat Gempa di Lingkungan Kampus UTDI

Universitas Teknologi Digital Indonesia telah menerapkan standar keselamatan gedung tahan gempa. Saat Anda merasakan getaran:

1. **JANGAN PANIK & SEGERA BERLINDUNG (Drop, Cover, Hold On)**
   Lindungi kepala Anda dengan tas kuliah atau merunduk di bawah meja praktikum komputer yang kokoh. Jauhi kaca jendela laboratorium.

2. **JANGAN MENGGUNAKAN LIFT**
   Gunakan tangga darurat gedung bertanda hijau untuk evakuasi ke lantai dasar.

3. **MENUJU 3 TITIK KUMPUL (ASSEMBLY POINT) UTDI**
   - **Titik Kumpul A:** Halaman Parkir Depan Rektorat
   - **Titik Kumpul B:** Area Terbuka Gazebo Barat
   - **Titik Kumpul C:** Lapangan Upacara / Belakang Lab Terpadu

4. **GUNAKAN FITUR SOS UTDI MOBILE JIKA TERPERANGKAP**
   Buka tombol SOS di aplikasi ini agar Tim Tanggap Darurat dan Satpam dapat melacak koordinat posisi Anda.
    `
  };

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-[#1E3866] text-slate-100 select-none overflow-hidden">
      
      {/* Pinned Top Header */}
      <div className="shrink-0">
        <HeaderBar
          title="Rincian Panduan"
          showBack={true}
          onBack={onBack}
          rightElement={
            <div className="flex items-center space-x-1 text-slate-400">
              <button onClick={() => alert("Panduan disimpan ke daftar baca offline.")} className="p-1 hover:text-white">
                <Bookmark className="w-4 h-4" />
              </button>
              <button onClick={() => alert("Tautan panduan disalin ke clipboard.")} className="p-1 hover:text-white">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          }
        />
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto min-h-0 pb-4">

        {/* Hero image */}
        <div className="w-full h-44 overflow-hidden relative">
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070d1a] via-transparent to-transparent"></div>
        </div>

        {/* Article Body */}
        <div className="px-5 -mt-6 relative z-10 space-y-3">
          
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold bg-blue-600/30 text-blue-300 border border-blue-500/40 px-2.5 py-0.5 rounded-full uppercase">
              {current.category}
            </span>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" /> {current.readTime}
            </span>
          </div>

          <h2 className="text-base font-extrabold text-white leading-snug">
            {current.title}
          </h2>

          <div className="flex items-center space-x-2 text-[11px] text-slate-400 pb-2 border-b border-blue-950">
            <User className="w-3.5 h-3.5 text-blue-400" />
            <span>Oleh: <strong className="text-slate-300">{current.author}</strong></span>
          </div>

          {/* Formatted Content */}
          <div className="text-xs text-slate-300 leading-relaxed space-y-2.5 pt-1">
            <p>
              Panduan ini disusun untuk memberikan instruksi jelas dan terukur bagi seluruh mahasiswa dan civitas akademika Universitas Teknologi Digital Indonesia dalam mengantisipasi situasi krisis.
            </p>
            <div className="bg-[#0f1f3d] p-3 rounded-xl border border-blue-900/60 my-2 space-y-1.5">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Langkah Kunci Evakuasi:
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                <li>Tetap tenang dan lindungi organ vital kepala.</li>
                <li>Gunakan tangga darurat terdekat, jangan gunakan lift.</li>
                <li>Berkumpul di Titik Kumpul (Assembly Point) UTDI.</li>
                <li>Laporkan rekan yang cedera melalui tombol SOS di aplikasi.</li>
              </ul>
            </div>
            <p className="text-[11px] text-slate-400">
              Jika terjadi situasi darurat segera di area kampus, Anda dapat langsung menekan tombol darurat di bawah ini.
            </p>
          </div>

        </div>
      </div>

      {/* Direct Emergency Call Button (Pinned) */}
      <div className="px-5 pt-2 pb-3 shrink-0">
        <button
          onClick={onOpenEmergency}
          className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-red-950/50 transition"
        >
          <span>Panggil Bantuan Darurat Kampus</span>
        </button>
      </div>

    </div>
  );
}

