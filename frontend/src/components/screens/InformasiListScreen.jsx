import React, { useState } from 'react';
import { 
  ArrowLeft, ChevronRight, MapPin, Clock, ShieldCheck, PhoneCall, 
  Sparkles, BookOpen, Lightbulb, Shield, Smartphone, HeartHandshake, 
  Eye, AlertOctagon, CheckCircle2, XCircle, Search, Lock, Users
} from 'lucide-react';

export default function InformasiListScreen({ onBack, onNavigateEmergency, onNavigateConsultation }) {
  // Navigation State
  const [currentView, setCurrentView] = useState('list'); 
  // 'list', 'profil-satgas', 'hindari-sendiri', 'simpan-darurat', 'undang-undang', 
  // 'cyber-safety', 'bystander-intervention', 'bentuk-kekerasan', 'pertolongan-psikologis'

  // Filter State
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'tips', 'pengetahuan', 'sop'
  const [searchQuery, setSearchQuery] = useState('');

  // Education items database with characters
  const educationItems = [
    {
      id: 'profil-satgas',
      title: 'PROFIL SATGAS PPKPS UTDI',
      category: 'sop',
      categoryLabel: '🏛️ SOP & Regulasi',
      characterImg: '/assets/satgas-ppks.jpg',
      characterName: 'Satgas PPKPS UTDI',
      characterRole: 'Unit Resmi Pencegahan & Penanganan Kekerasan',
      readTime: '2 Menit',
      shortDesc: 'Satuan tugas resmi pencegahan dan penanganan segala bentuk kekerasan di lingkungan kampus UTDI. Siaga 24 jam.',
      badge: 'Resmi Kampus',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
    },
    {
      id: 'hindari-sendiri',
      title: 'Hindari Berjalan Sendiri (Tips Pulang Aman)',
      category: 'tips',
      categoryLabel: '💡 Tips & Trik',
      characterImg: '/assets/maya-safety-walk.jpg',
      characterName: 'Maya & Sahabat Kampus',
      characterRole: 'Karakter Edukasi: Sahabat Siaga Lapangan',
      readTime: '3 Menit',
      shortDesc: 'Pilih jalan yang ramai dan terang, hindari memakai headset di jalan sepi, dan bagikan live-location ke sahabat.',
      badge: 'Tips Lapangan',
      badgeColor: 'bg-[#F5A623]/20 text-[#F5A623] border-[#F5A623]/40'
    },
    {
      id: 'simpan-darurat',
      title: 'Simpan Nomor Darurat & Trik Panggilan Cepat',
      category: 'tips',
      categoryLabel: '💡 Tips & Trik',
      characterImg: '/assets/diko-guardian.jpg',
      characterName: 'Diko the UTDI Guardian',
      characterRole: 'Karakter Edukasi: Pelindung & Respon Cepat SOS',
      readTime: '2 Menit',
      shortDesc: 'Pastikan kontak satpam kampus dan hotline satgas dapat diakses dalam 1 detik lewat speed dial atau widget layar kunci.',
      badge: 'Respon Cepat',
      badgeColor: 'bg-red-500/20 text-red-300 border-red-400/30'
    },
    {
      id: 'cyber-safety',
      title: 'Tips Keamanan Digital & Tangkal Cyberstalking / KBGO',
      category: 'tips',
      categoryLabel: '💡 Tips & Trik',
      characterImg: '/assets/sari-cyber-shield.jpg',
      characterName: 'Sari Cyber Shield',
      characterRole: 'Karakter Edukasi: Duta Perlindungan Data & Medsos',
      readTime: '4 Menit',
      shortDesc: 'Trik mengamankan jejak digital, menghentikan doxxing, ancaman foto pribadi (revenge porn), dan aktivasi 2FA.',
      badge: 'Privasi Online',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30'
    },
    {
      id: 'bystander-intervention',
      title: 'Bystander Intervention: Teknik 5D Membela Teman',
      category: 'pengetahuan',
      categoryLabel: '🧠 Pengetahuan Luas',
      characterImg: '/assets/bystander-heroes.jpg',
      characterName: 'Tim Bystander Heroes UTDI',
      characterRole: 'Karakter Edukasi: Gerakan Solidaritas Aktif',
      readTime: '4 Menit',
      shortDesc: 'Cara berani & aman menolong korban tanpa konfrontasi berbahaya melalui metode 5D: Distract, Delegate, Document, Direct, Delay.',
      badge: 'Solidaritas',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30'
    },
    {
      id: 'bentuk-kekerasan',
      title: 'Kenali 21 Bentuk Kekerasan Seksual di Lingkungan Kampus',
      category: 'pengetahuan',
      categoryLabel: '🧠 Pengetahuan Luas',
      characterImg: '/assets/diko-mascot.jpg',
      characterName: 'Diko Maskot UTDI',
      characterRole: 'Karakter Edukasi: Edukasi Kritis Mahasiswa',
      readTime: '5 Menit',
      shortDesc: 'Penjelasan detail Permendikbudristek No. 30/2021: Batasan candaan vs pelecehan verbal, catcalling, dan relasi kuasa akademik.',
      badge: 'Wawasan Hukum',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30'
    },
    {
      id: 'pertolongan-psikologis',
      title: 'Pertolongan Pertama Psikologis & Teknik Grounding 5-4-3-2-1',
      category: 'tips',
      categoryLabel: '💡 Tips & Trik',
      characterImg: '/assets/dewi-avatar.jpg',
      characterName: 'Dewi Rahmawati',
      characterRole: 'Karakter Edukasi: Duta Kesehatan Mental & Pemulihan',
      readTime: '3 Menit',
      shortDesc: 'Langkah darurat meredakan serangan panik, kecemasan akut, atau trauma saat melihat atau mengalami insiden di kampus.',
      badge: 'Kesehatan Mental',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
    },
    {
      id: 'undang-undang',
      title: 'Undang-Undang Tentang Kekerasan Fisik, Perundungan & TPKS',
      category: 'sop',
      categoryLabel: '🏛️ SOP & Regulasi',
      characterImg: '/assets/diko-guardian.jpg',
      characterName: 'Diko Guardian Hukum',
      characterRole: 'Karakter Edukasi: Landasan Hukum & Sanksi Pidana',
      readTime: '4 Menit',
      shortDesc: 'Kupas tuntas UU TPKS No. 12/2022, KUHP Pasal 351, dan UU Perlindungan Anak serta sanksi pidana bagi pelaku.',
      badge: 'Payung Hukum',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30'
    }
  ];

  // Filtering
  const filteredList = educationItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.characterName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-[#1E3866] text-white select-none overflow-hidden">
      
      {/* ======================================================== */}
      {/* 1. MAIN LIST VIEW: EDUKASI & INFORMASI KAMPUS            */}
      {/* ======================================================== */}
      {currentView === 'list' && (
        <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
          
          {/* Top Header Bar */}
          <div className="px-5 pt-3 pb-3 flex items-center justify-between border-b border-[#2b4c85] shrink-0 relative z-30 bg-[#1E3866]">
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] active:bg-[#254680] border border-[#2b4c85] flex items-center justify-center text-white transition-all active:scale-90 cursor-pointer shadow-md"
                title="Kembali ke Beranda"
              >
                <ArrowLeft className="w-5 h-5 text-white stroke-[2.5]" />
              </button>
              <div>
                <h2 className="text-base sm:text-lg font-black text-[#F5A623] tracking-wide">
                  Edukasi & Informasi
                </h2>
                <span className="text-[10px] text-blue-200/80">Tips Praktis, Karakter Penjaga & Regulasi</span>
              </div>
            </div>

            <span className="text-[10px] bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/40 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#F5A623]" /> 8 Modul
            </span>
          </div>

          {/* Search & Category Filter Section (Pinned Top) */}
          <div className="px-5 pt-2 pb-2 space-y-2 shrink-0 bg-[#1A325C] border-b border-[#2b4c85]">
            
            {/* Search Input */}
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-blue-300 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari tips, trik, atau panduan..."
                className="w-full bg-[#112140] border border-[#2b4c85] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-blue-200/50 focus:outline-none focus:ring-1 focus:ring-[#F5A623]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex space-x-1.5 overflow-x-auto scrollbar-none pb-0.5">
              {[
                { id: 'all', label: 'Semua (8)' },
                { id: 'tips', label: '💡 Tips & Trik (4)' },
                { id: 'pengetahuan', label: '🧠 Pengetahuan (2)' },
                { id: 'sop', label: '🏛️ SOP & Regulasi (2)' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition active:scale-95 ${
                    selectedCategory === tab.id
                      ? 'bg-[#F5A623] text-slate-950 shadow-md font-extrabold'
                      : 'bg-[#162a4d] text-slate-300 hover:text-white border border-[#2b4c85]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>

          {/* Scrollable Educational Card Feed */}
          <div className="px-5 py-3 space-y-3.5 flex-1 overflow-y-auto min-h-0 pb-6">
            
            {/* Featured Mascot Tip Banner */}
            <div className="bg-gradient-to-r from-[#162a4d] to-[#1c3866] border border-[#F5A623]/40 rounded-2xl p-3.5 shadow-lg flex items-center space-x-3.5">
              <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-[#F5A623]/60 shadow bg-[#112140]">
                <img 
                  src="/assets/diko-guardian.jpg" 
                  alt="Diko Guardian" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] bg-[#F5A623] text-slate-950 px-2 py-0.2 rounded-full font-black uppercase">
                    Pesan Diko Guardian
                  </span>
                </div>
                <h4 className="text-xs font-black text-white mt-1 leading-tight line-clamp-1">
                  "Kenali Hakmu, Lindungi Sesama di UTDI!"
                </h4>
                <p className="text-[10px] text-blue-200/80 mt-0.5 line-clamp-2 leading-relaxed">
                  Semua mahasiswa berhak belajar dengan rasa aman. Pelajari tips mandiri & gunakan tombol darurat jika butuh bantuan.
                </p>
              </div>
            </div>

            {/* List of Educational Cards */}
            {filteredList.map((item) => (
              <div
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className="bg-[#162a4d] hover:bg-[#1c3561] border border-[#2b4c85] hover:border-[#F5A623]/60 rounded-2xl p-3.5 flex items-start space-x-3.5 cursor-pointer transition active:scale-98 shadow-md group relative overflow-hidden"
              >
                {/* Character Thumbnail Avatar */}
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-white/20 shadow-md bg-[#112140] group-hover:scale-105 transition-transform">
                  <img
                    src={item.characterImg}
                    alt={item.characterName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pr-1">
                  
                  {/* Category Pill + Read Time */}
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <span className="text-[10px] text-blue-200/60 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-blue-300" /> {item.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xs sm:text-sm font-black text-white tracking-wide group-hover:text-[#F5A623] transition line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Character Credit */}
                  <p className="text-[10px] text-[#F5A623] font-semibold mt-0.5 flex items-center gap-1">
                    👤 {item.characterName}
                  </p>

                  {/* Summary */}
                  <p className="text-[10px] text-blue-200/80 mt-1 leading-snug line-clamp-2">
                    {item.shortDesc}
                  </p>

                </div>

                {/* Arrow Action */}
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#F5A623] group-hover:translate-x-0.5 transition shrink-0 self-center" />
              </div>
            ))}

            {filteredList.length === 0 && (
              <div className="py-12 text-center text-slate-300">
                <BookOpen className="w-8 h-8 mx-auto text-blue-400 mb-2 opacity-60" />
                <p className="text-xs font-semibold">Tidak ditemukan modul edukasi dengan kata kunci tersebut.</p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="mt-3 text-[11px] text-[#F5A623] underline font-bold"
                >
                  Reset Pencarian
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. DETAIL: PROFIL SATGAS PPKPS UTDI                      */}
      {/* ======================================================== */}
      {currentView === 'profil-satgas' && (
        <DetailScreenWrapper
          title="PROFIL SATGAS PPKPS UTDI"
          characterImg="/assets/satgas-ppks.jpg"
          characterName="Satgas PPKPS UTDI"
          characterTag="Unit Khusus Pencegahan & Penanganan Kekerasan"
          onBack={() => setCurrentView('list')}
        >
          <div className="space-y-4">
            
            {/* Highlight Banner */}
            <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-4 text-justify">
              <h4 className="text-xs font-black text-[#F5A623] uppercase tracking-wider mb-2">
                Mandat & Komitmen UTDI
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                Satgas PPKPS (Satuan Pencegahan dan Penanganan Kekerasan di Lingkungan Perguruan Tinggi) Universitas Teknologi Digital Indonesia dibentuk atas amanat Permendikbudristek No. 30/2021 dan UU TPKS No. 12/2022. Satgas bertugas menjamin seluruh civitas akademika mendapatkan ruang belajar yang aman, inklusif, dan terlindungi dari kekerasan fisik, psikis, perundungan, maupun kekerasan seksual.
              </p>
            </div>

            {/* Quick Facility Badges */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#112140] border border-[#2b4c85] rounded-xl p-3 flex items-center space-x-2.5">
                <MapPin className="w-5 h-5 text-[#F5A623] shrink-0" />
                <div>
                  <span className="text-[10px] text-blue-200/70 block">Posko Layanan</span>
                  <span className="text-xs font-bold text-white">Gedung Utara, Lt. 1</span>
                </div>
              </div>
              <div className="bg-[#112140] border border-[#2b4c85] rounded-xl p-3 flex items-center space-x-2.5">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-blue-200/70 block">Jam Operasional</span>
                  <span className="text-xs font-bold text-white">24 Jam Siaga</span>
                </div>
              </div>
            </div>

            {/* Layanan Utama Satgas */}
            <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-4 space-y-2.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                🛡️ 4 Layanan Utama yang Disediakan
              </h4>
              <ul className="space-y-2 text-xs text-slate-200">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                  <span><strong>Penerimaan Laporan Anonim & Terbuka:</strong> Menjamin kerahasiaan identitas korban 100%.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                  <span><strong>Konseling & Pendampingan Psikologis:</strong> Bantuan trauma healing oleh konselor bersertifikat.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                  <span><strong>Advokasi & Perlindungan Akademik:</strong> Memastikan nilai & kelulusan mahasiswa tetap terlindungi.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
                  <span><strong>Investigasi & Rekomendasi Sanksi:</strong> Pemeriksaan berkeadilan dan penindakan tegas bagi pelaku.</span>
                </li>
              </ul>
            </div>

          </div>
        </DetailScreenWrapper>
      )}

      {/* ======================================================== */}
      {/* 3. DETAIL: HINDARI BERJALAN SENDIRI (TIPS PULANG AMAN)   */}
      {/* ======================================================== */}
      {currentView === 'hindari-sendiri' && (
        <DetailScreenWrapper
          title="HINDARI BERJALAN SENDIRI"
          characterImg="/assets/maya-safety-walk.jpg"
          characterName="Maya & Rekan Mahasiswa"
          characterTag="Karakter Edukasi: Tips Jalan Aman & Sahabat Siaga"
          onBack={() => setCurrentView('list')}
        >
          <div className="space-y-4">
            
            <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-4 text-justify">
              <h4 className="text-xs font-black text-[#F5A623] uppercase tracking-wider mb-2">
                Mengapa Berjalan Sendiri Berisiko?
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                Pelaku kejahatan atau pelecehan cenderung menargetkan individu yang terlihat sendirian, terdistraksi (seperti menunduk menatap layar HP atau memakai headphone berperedam suara), dan melintasi koridor sepi. Berjalan bersama rekan memberikan perlindungan ganda: efek gentar bagi pelaku dan kecepatan meminta tolong bila ada ancaman.
              </p>
            </div>

            {/* Checklist Tips & Trik Praktis */}
            <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-4 space-y-2.5">
              <h4 className="text-xs font-black text-[#F5A623] uppercase tracking-wider">
                💡 5 Tips & Trik Pulang Aman di Area Kampus
              </h4>
              <div className="space-y-2 text-xs text-slate-200">
                <div className="flex items-start space-x-2 bg-[#162a4d] p-2.5 rounded-xl border border-blue-900/40">
                  <span className="w-5 h-5 rounded-full bg-[#F5A623] text-slate-900 font-black text-[11px] flex items-center justify-center shrink-0">1</span>
                  <p><strong>Gunakan Buddy System:</strong> Buat janji pulang bersama rekan satu jurusan atau minta satpam mendampingi hingga tempat parkir bila sudah larut.</p>
                </div>
                <div className="flex items-start space-x-2 bg-[#162a4d] p-2.5 rounded-xl border border-blue-900/40">
                  <span className="w-5 h-5 rounded-full bg-[#F5A623] text-slate-900 font-black text-[11px] flex items-center justify-center shrink-0">2</span>
                  <p><strong>Pilih Koridor Terang & CCTV:</strong> Lewati koridor gedung utama UTDI yang memiliki pencahayaan memadai dan pantauan kamera keamanan.</p>
                </div>
                <div className="flex items-start space-x-2 bg-[#162a4d] p-2.5 rounded-xl border border-blue-900/40">
                  <span className="w-5 h-5 rounded-full bg-[#F5A623] text-slate-900 font-black text-[11px] flex items-center justify-center shrink-0">3</span>
                  <p><strong>Aktifkan Fitur Share Location:</strong> Kirim live-location 1 jam melalui WhatsApp atau Google Maps ke teman sekamar atau keluarga.</p>
                </div>
                <div className="flex items-start space-x-2 bg-[#162a4d] p-2.5 rounded-xl border border-blue-900/40">
                  <span className="w-5 h-5 rounded-full bg-[#F5A623] text-slate-900 font-black text-[11px] flex items-center justify-center shrink-0">4</span>
                  <p><strong>Lepas Satu Sisi Earphone:</strong> Pertahankan pendengaran sekitar agar Anda sadar jika ada langkah kaki atau kendaraan yang membuntuti.</p>
                </div>
                <div className="flex items-start space-x-2 bg-[#162a4d] p-2.5 rounded-xl border border-blue-900/40">
                  <span className="w-5 h-5 rounded-full bg-[#F5A623] text-slate-900 font-black text-[11px] flex items-center justify-center shrink-0">5</span>
                  <p><strong>Siapkan Tombol SOS di Genggaman:</strong> Buka aplikasi UTDI Care di ponsel dengan jari siap menekan tombol darurat merah.</p>
                </div>
              </div>
            </div>

            {/* Hal yang Harus Dihindari */}
            <div className="bg-red-950/30 border border-red-800/40 rounded-2xl p-4 space-y-2">
              <h4 className="text-xs font-black text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-red-400" /> Wajib Dihindari (Pantangan):
              </h4>
              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                <li>Melintasi gang gelap atau jalan pintas tanpa penerangan hanya untuk menghemat 2 menit.</li>
                <li>Menghitung uang tunai atau memakai perhiasan mencolok saat berjalan kaki di jalan sepi.</li>
                <li>Menolak bantuan satpam kampus jika merasa ada orang asing mencurigakan yang menunggu.</li>
              </ul>
            </div>

          </div>
        </DetailScreenWrapper>
      )}

      {/* ======================================================== */}
      {/* 4. DETAIL: SIMPAN NOMOR DARURAT & TRIK PANGGILAN CEPAT   */}
      {/* ======================================================== */}
      {currentView === 'simpan-darurat' && (
        <DetailScreenWrapper
          title="SIMPAN NOMOR DARURAT"
          characterImg="/assets/diko-guardian.jpg"
          characterName="Diko the UTDI Guardian"
          characterTag="Karakter Edukasi: Respon Darurat & Tombol SOS Cepat"
          onBack={() => setCurrentView('list')}
        >
          <div className="space-y-4">
            
            <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-4 text-justify">
              <h4 className="text-xs font-black text-[#F5A623] uppercase tracking-wider mb-2">
                Kecepatan adalah Kunci Keselamatan
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                Dalam situasi darurat, Anda hanya memiliki rata-rata 5 hingga 10 detik sebelum situasi memburuk. Menyimpan nomor darurat di daftar kontak ponsel adalah langkah awal yang menentukan kecepatan bala bantuan pos satpam UTDI dan pihak kepolisian.
              </p>
            </div>

            {/* Daftar Kontak Prioritas UTDI */}
            <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-4 space-y-2.5">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                📞 Nomor Kontak Wajib Tersimpan:
              </h4>
              <div className="space-y-2">
                {[
                  { name: "Pos Satpam Utama UTDI (Siaga 24 Jam)", phone: "0274-486664", role: "Respon Pos & Patroli Kampus" },
                  { name: "Satgas PPKPS UTDI (Hotline Konseling)", phone: "0811-2555-7788", role: "Konsultasi & Perlindungan Korban" },
                  { name: "Polsek Banguntapan Bantul (Terdekat)", phone: "0274-453000", role: "Aparat Keamanan Wilayah" },
                  { name: "UGD RS Bethesda / JIH Jogja", phone: "118 / 0274-586688", role: "Ambulans & Pertolongan Medis" }
                ].map((c, i) => (
                  <div key={i} className="bg-[#162a4d] p-3 rounded-xl border border-[#2b4c85] flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-white">{c.name}</h5>
                      <span className="text-[10px] text-blue-200/70">{c.role}</span>
                      <div className="text-xs font-black text-[#F5A623] mt-0.5">{c.phone}</div>
                    </div>
                    <a
                      href={`tel:${c.phone}`}
                      className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow transition active:scale-95"
                    >
                      <PhoneCall className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Trik Setting Smartphone */}
            <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-4 space-y-2">
              <h4 className="text-xs font-black text-[#F5A623] uppercase tracking-wider">
                ⚡ Trik Setting Shortcut Tombol Power SOS:
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                Di Android & iPhone, Anda dapat mengaktifkan fitur <strong>Emergency SOS</strong> (tekan tombol Power 5 kali cepat). HP akan otomatis membunyikan sirene atau diam-diam membagikan lokasi GPS dan rekaman suara darurat ke nomor satpam UTDI.
              </p>
            </div>

            <button
              onClick={onNavigateEmergency}
              className="w-full bg-[#162a4d] hover:bg-[#1a335c] border-2 border-[#F5A623] text-white font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition active:scale-98 shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-[#F5A623]" />
              <span>Buka Menu Kontak Darurat Lengkap</span>
            </button>

          </div>
        </DetailScreenWrapper>
      )}

      {/* ======================================================== */}
      {/* 5. DETAIL: CYBER SAFETY & ANTI-KBGO                      */}
      {/* ======================================================== */}
      {currentView === 'cyber-safety' && (
        <DetailScreenWrapper
          title="TIPS KEAMANAN DIGITAL & ANTI-KBGO"
          characterImg="/assets/sari-cyber-shield.jpg"
          characterName="Sari Cyber Shield"
          characterTag="Karakter Edukasi: Perlindungan Privasi & Keamanan Medsos"
          onBack={() => setCurrentView('list')}
        >
          <div className="space-y-4">
            
            <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-4 text-justify">
              <h4 className="text-xs font-black text-[#F5A623] uppercase tracking-wider mb-2">
                Apa itu KBGO (Kekerasan Berbasis Gender Online)?
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                KBGO adalah kejahatan berbasis digital yang mencakup cyberstalking (penguntitan di medsos), doxxing (penyebaran data pribadi secara liar), ancaman penyebaran foto intim (revenge porn/sextortion), dan pelecehan verbal di kolom komentar atau pesan instan (DM).
              </p>
            </div>

            {/* Tips & Trik Amankan Jejak Digital */}
            <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-4 space-y-2.5">
              <h4 className="text-xs font-black text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-cyan-400" /> 5 Langkah Konkret Amankan Akunmu:
              </h4>
              <div className="space-y-2 text-xs text-slate-200">
                <div className="flex items-start space-x-2 bg-[#162a4d] p-2.5 rounded-xl border border-blue-900/40">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p><strong>Aktifkan 2FA (Two-Factor Authentication):</strong> Gunakan Google Authenticator untuk akun email kampus @students.utdi.ac.id, WhatsApp, dan Instagram.</p>
                </div>
                <div className="flex items-start space-x-2 bg-[#162a4d] p-2.5 rounded-xl border border-blue-900/40">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p><strong>Amankan Bukti Digital (Trik Dokumentasi):</strong> Jangan buru-buru hapus chat! Ambil screenshot utuh yang memuat URL profil, tanggal, jam, dan nomor telepon pelaku.</p>
                </div>
                <div className="flex items-start space-x-2 bg-[#162a4d] p-2.5 rounded-xl border border-blue-900/40">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p><strong>Audit Pengaturan Privasi Medsos:</strong> Kunci akun jika ada akun misterius yang mencurigakan, dan batasi fitur siapa saja yang bisa menandai (tag) foto Anda.</p>
                </div>
                <div className="flex items-start space-x-2 bg-[#162a4d] p-2.5 rounded-xl border border-blue-900/40">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p><strong>Jangan Pernah Kirim Uang Tebusan:</strong> Pelaku pemerasan foto intim tidak akan berhenti jika diberi uang. Segera lapor ke Satgas PPKPS UTDI untuk take-down konten.</p>
                </div>
              </div>
            </div>

            {/* Sanksi Hukum UU ITE & UU TPKS */}
            <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-4 text-xs text-slate-200 space-y-1.5">
              <h4 className="text-xs font-black text-[#F5A623] uppercase tracking-wider">
                ⚖️ Payung Hukum untuk Korban:
              </h4>
              <p>
                Pasal 14 UU TPKS No. 12/2022 mengatur bahwa pelaku kekerasan seksual berbasis elektronik diancam pidana penjara paling lama 4 tahun dan/atau denda hingga Rp 200 juta.
              </p>
            </div>

          </div>
        </DetailScreenWrapper>
      )}

      {/* ======================================================== */}
      {/* 6. DETAIL: BYSTANDER INTERVENTION (TEKNIK 5D)            */}
      {/* ======================================================== */}
      {currentView === 'bystander-intervention' && (
        <DetailScreenWrapper
          title="BYSTANDER INTERVENTION: TEKNIK 5D"
          characterImg="/assets/bystander-heroes.jpg"
          characterName="Tim Bystander Heroes UTDI"
          characterTag="Karakter Edukasi: Gerakan Solidaritas & Anti-Bullying"
          onBack={() => setCurrentView('list')}
        >
          <div className="space-y-4">
            
            <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-4 text-justify">
              <h4 className="text-xs font-black text-[#F5A623] uppercase tracking-wider mb-2">
                Menjadi Saksi Aktif yang Berdaya
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                Seringkali kita menyaksikan teman atau orang lain dilecehkan secara verbal atau dirundung, namun kita ragu menolong karena takut terkena masalah. <strong>Metode 5D</strong> adalah panduan internasional yang terbukti efektif menolong korban tanpa menempatkan diri Anda dalam bahaya fisik.
              </p>
            </div>

            {/* Rincian Metode 5D */}
            <div className="space-y-2.5">
              {[
                {
                  code: "1. DISTRACT (Alihkan Perhatian)",
                  desc: "Pura-pura kenal korban, tanyakan arah ruang kuliah, tanyakan jam berapa sekarang, atau jatuhkan buku secara tidak sengaja untuk membuyarkan fokus pelaku.",
                  color: "border-amber-400/40 text-amber-300"
                },
                {
                  code: "2. DELEGATE (Minta Bantuan)",
                  desc: "Segera hampiri pihak yang memiliki otoritas terdekat: Satpam pos, dosen piket, ketua kelas, atau panggil teman lain untuk bersama-sama mendekati lokasi.",
                  color: "border-blue-400/40 text-blue-300"
                },
                {
                  code: "3. DOCUMENT (Dokumentasikan)",
                  desc: "Jika aman, rekam video/foto kejadian dari jarak wajar. Jangan langsung sebar ke medsos! Berikan rekaman tersebut kepada korban agar ia memiliki kendali atas bukti itu.",
                  color: "border-cyan-400/40 text-cyan-300"
                },
                {
                  code: "4. DIRECT (Tegur Langsung Secara Tenang)",
                  desc: "Jika situasi tidak mengarah ke kekerasan fisik senjata, katakan dengan tenang dan tegas: 'Tindakan Anda tidak pantas, tolong hentikan.' Lalu ajak korban menjauh.",
                  color: "border-emerald-400/40 text-emerald-300"
                },
                {
                  code: "5. DELAY (Dampingi Setelah Kejadian)",
                  desc: "Dekati korban setelah pelaku pergi. Katakan: 'Kamu tidak sendirian. Apakah kamu baik-baik saja? Mau aku temani lapor ke Satgas PPKS atau ke UKS?'",
                  color: "border-purple-400/40 text-purple-300"
                }
              ].map((d, i) => (
                <div key={i} className={`bg-[#112140] border ${d.color} rounded-2xl p-3.5 space-y-1`}>
                  <h5 className="text-xs font-black tracking-wide">{d.code}</h5>
                  <p className="text-xs text-slate-200 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </DetailScreenWrapper>
      )}

      {/* ======================================================== */}
      {/* 7. DETAIL: 21 BENTUK KEKERASAN SEKSUAL DI KAMPUS         */}
      {/* ======================================================== */}
      {currentView === 'bentuk-kekerasan' && (
        <DetailScreenWrapper
          title="21 BENTUK KEKERASAN SEKSUAL"
          characterImg="/assets/diko-mascot.jpg"
          characterName="Diko Maskot Edukasi"
          characterTag="Karakter Edukasi: Wawasan Kritis Mahasiswa"
          onBack={() => setCurrentView('list')}
        >
          <div className="space-y-4">
            
            <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-4 text-justify">
              <h4 className="text-xs font-black text-[#F5A623] uppercase tracking-wider mb-2">
                Amanat Permendikbudristek No. 30 Tahun 2021
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                Kekerasan seksual di perguruan tinggi tidak hanya sebatas kontak fisik brutal. Regulasi nasional secara tegas merumuskan 21 bentuk tindakan kekerasan seksual, baik verbal, non-fisik, fisik, maupun penyalahgunaan kekuasaan (relasi kuasa dosen-mahasiswa atau senior-junior).
              </p>
            </div>

            {/* Klasifikasi 4 Kategori Utama */}
            <div className="space-y-3">
              
              <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-3.5">
                <h5 className="text-xs font-black text-[#F5A623] mb-1.5">
                  1. Bentuk Verbal (Candaan vs Pelecehan)
                </h5>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Menyampaikan lelucon bernuansa seksualitas yang membuat risih, bersiul menggoda (*catcalling*), mengomentari bentuk tubuh rekan, atau menanyakan kehidupan seks pribadi seseorang tanpa persetujuan.
                </p>
              </div>

              <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-3.5">
                <h5 className="text-xs font-black text-cyan-300 mb-1.5">
                  2. Bentuk Non-Fisik & Isyarat
                </h5>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Menatap dengan nuansa seksual yang mengintimidasi, memperlihatkan alat kelamin atau konten porno secara sengaja, dan mengirim pesan ajakan intim yang tidak diinginkan.
                </p>
              </div>

              <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-3.5">
                <h5 className="text-xs font-black text-amber-300 mb-1.5">
                  3. Bentuk Fisik
                </h5>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Menyentuh, meraba, memegang, memeluk, mencium, atau menggesekkan bagian tubuh tanpa persetujuan (*consent*), pemaksaan hubungan seksual, dan kekerasan fisik pemaksaan.
                </p>
              </div>

              <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-3.5">
                <h5 className="text-xs font-black text-red-400 mb-1.5">
                  4. Penyalahgunaan Relasi Kuasa (Akademik)
                </h5>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Mengancam kelulusan, menahan nilai skripsi/mata kuliah, atau menjanjikan beasiswa/rekomendasi dengan syarat melakukan tindakan seksual atau kencan pribadi.
                </p>
              </div>

            </div>

          </div>
        </DetailScreenWrapper>
      )}

      {/* ======================================================== */}
      {/* 8. DETAIL: PERTOLONGAN PERTAMA PSIKOLOGIS & GROUNDING    */}
      {/* ======================================================== */}
      {currentView === 'pertolongan-psikologis' && (
        <DetailScreenWrapper
          title="PERTOLONGAN PERTAMA PSIKOLOGIS"
          characterImg="/assets/dewi-avatar.jpg"
          characterName="Dewi Rahmawati"
          characterTag="Karakter Edukasi: Duta Kesehatan Mental & Pemulihan"
          onBack={() => setCurrentView('list')}
        >
          <div className="space-y-4">
            
            <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-4 text-justify">
              <h4 className="text-xs font-black text-[#F5A623] uppercase tracking-wider mb-2">
                Menghadapi Serangan Cemas & Trauma
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                Saat seseorang baru saja mengalami insiden kekerasan atau perundungan, detak jantung mereka meningkat drastis, napas memburu, dan pikiran mengalami disosiasi (panik/linglung). Teknik Grounding 5-4-3-2-1 dirancang oleh psikolog klinis untuk mengembalikan kesadaran tubuh ke saat ini (here and now).
              </p>
            </div>

            {/* Rincian Teknik 5-4-3-2-1 */}
            <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-4 space-y-2.5">
              <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-emerald-400" /> Trik Grounding 5-4-3-2-1:
              </h4>
              <div className="space-y-2 text-xs text-slate-200">
                <div className="bg-[#162a4d] p-2.5 rounded-xl border border-blue-900/40">
                  <strong className="text-[#F5A623]">👀 5 Hal yang DILIHAT:</strong> Sebutkan 5 benda di sekitarmu (misal: meja, jam dinding, sepatu, jendela, tas).
                </div>
                <div className="bg-[#162a4d] p-2.5 rounded-xl border border-blue-900/40">
                  <strong className="text-[#F5A623]">✋ 4 Hal yang DIRABA:</strong> Sentuh 4 tekstur berbeda (kain baju, meja kayu, layar HP dingin, cincin jari).
                </div>
                <div className="bg-[#162a4d] p-2.5 rounded-xl border border-blue-900/40">
                  <strong className="text-[#F5A623]">👂 3 Hal yang DIDENGAR:</strong> Fokus pada 3 suara (angin AC, suara burung di luar, detak jam).
                </div>
                <div className="bg-[#162a4d] p-2.5 rounded-xl border border-blue-900/40">
                  <strong className="text-[#F5A623]">👃 2 Hal yang DICIUM:</strong> Kenali 2 aroma (aroma kopi, wangi minyak kayu putih, atau baju).
                </div>
                <div className="bg-[#162a4d] p-2.5 rounded-xl border border-blue-900/40">
                  <strong className="text-[#F5A623]">👅 1 Hal yang DIRASAKAN:</strong> Rasakan 1 rasa di lidah (minum seteguk air putih hangat).
                </div>
              </div>
            </div>

            <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-2xl p-3.5 text-xs text-slate-200">
              <span className="font-bold text-emerald-300 block mb-1">Butuh Teman Berbagi?</span>
              Satgas PPKS UTDI menyediakan konselor psikologis gratis tanpa dipungut biaya dan identitas dijamin anonim.
            </div>

          </div>
        </DetailScreenWrapper>
      )}

      {/* ======================================================== */}
      {/* 9. DETAIL: UNDANG-UNDANG TPKS & HUKUM PIDANA             */}
      {/* ======================================================== */}
      {currentView === 'undang-undang' && (
        <DetailScreenWrapper
          title="UNDANG-UNDANG TPKS & KUHP"
          characterImg="/assets/diko-guardian.jpg"
          characterName="Diko Guardian Hukum"
          characterTag="Karakter Edukasi: Regulasi Nasional & Perlindungan Korban"
          onBack={() => setCurrentView('list')}
        >
          <div className="space-y-4">
            
            {/* Section 1: Seksual */}
            <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-4 shadow-md">
              <h4 className="text-xs font-black text-[#F5A623] uppercase tracking-wider mb-1.5">
                1. Tindak Pidana Kekerasan Seksual (UU No. 12 Tahun 2022)
              </h4>
              <p className="text-[11px] text-slate-200 leading-relaxed text-justify">
                UU TPKS merupakan tonggak sejarah hukum Indonesia yang memprioritaskan hak korban atas penanganan, perlindungan, dan pemulihan psikis. UU ini mengatur 9 tindak pidana khusus termasuk pelecehan seksual fisik (Pasal 6, ancaman 4-12 tahun penjara), pelecehan nonfisik (Pasal 5), pemaksaan kontrasepsi, eksploitasi seksual, hingga kekerasan seksual berbasis elektronik.
              </p>
            </div>

            {/* Section 2: Fisik */}
            <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-4 shadow-md">
              <h4 className="text-xs font-black text-cyan-300 uppercase tracking-wider mb-1.5">
                2. Kekerasan Fisik & Penganiayaan (KUHP Pasal 351)
              </h4>
              <p className="text-[11px] text-slate-200 leading-relaxed text-justify">
                Kekerasan fisik diatur tegas dalam KUHP Pasal 351. Setiap perbuatan sengaja yang menyebabkan rasa sakit, memar, luka, atau rusaknya kesehatan orang lain dikenai ancaman hukuman penjara 2 tahun 8 bulan hingga 5 tahun bila mengakibatkan luka berat.
              </p>
            </div>

            {/* Section 3: Perundungan */}
            <div className="bg-[#112140] border border-[#2b4c85] rounded-2xl p-4 shadow-md">
              <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider mb-1.5">
                3. Perundungan / Bullying di Kampus
              </h4>
              <p className="text-[11px] text-slate-200 leading-relaxed text-justify">
                Segala tindakan intimidasi, pemaksaan ospek yang merendahkan martabat, perpeloncoan fisik, maupun perundungan verbal diatur dan dilarang keras. Pelaku perundungan di UTDI dapat dijatuhi sanksi administratif berupa skorsing hingga pemecatan status mahasiswa secara tidak hormat.
              </p>
            </div>

          </div>
        </DetailScreenWrapper>
      )}

    </div>
  );
}

// Reusable Detail Screen Layout Wrapper
function DetailScreenWrapper({ title, characterImg, characterName, characterTag, onBack, children }) {
  return (
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden">
      
      {/* Pinned Top Header */}
      <div className="px-5 pt-3 pb-3 flex items-center space-x-3 border-b border-[#2b4c85] shrink-0 relative z-30 bg-[#1E3866]">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] active:bg-[#254680] border border-[#2b4c85] flex items-center justify-center text-white transition-all active:scale-90 cursor-pointer shadow-md"
          title="Kembali ke Daftar Edukasi"
        >
          <ArrowLeft className="w-5 h-5 text-white stroke-[2.5]" />
        </button>
        <h2 className="text-xs sm:text-sm font-black text-[#F5A623] tracking-wide line-clamp-1 leading-tight">
          {title}
        </h2>
      </div>

      {/* Scrollable Content Body */}
      <div className="px-5 py-4 flex-1 overflow-y-auto min-h-0 space-y-4 pb-6">
        
        {/* Hero Character Card */}
        <div className="bg-gradient-to-b from-[#162a4d] to-[#112140] border border-[#2b4c85] rounded-3xl p-4 text-center shadow-xl relative overflow-hidden">
          
          {/* Subtle Ambient Back Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#F5A623]/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Large 3D Character Illustration */}
          <div className="relative w-32 h-32 rounded-3xl overflow-hidden mx-auto mb-3 shadow-2xl border-2 border-[#F5A623]/60 bg-[#0f1f3d]">
            <img 
              src={characterImg} 
              alt={characterName} 
              className="w-full h-full object-cover"
            />
          </div>

          <h3 className="text-sm sm:text-base font-black text-white tracking-wide">
            {characterName}
          </h3>
          <span className="text-[10px] text-[#F5A623] font-bold block mt-0.5">
            {characterTag}
          </span>
        </div>

        {/* Dynamic Detail Content */}
        {children}

      </div>
    </div>
  );
}
