import React, { useState } from 'react';
import { ArrowLeft, ChevronRight, MapPin, Clock, ShieldCheck, PhoneCall } from 'lucide-react';

export default function InformasiListScreen({ onBack, onNavigateEmergency }) {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'profil-satgas', 'hindari-sendiri', 'simpan-darurat', 'undang-undang'

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#1E3866] text-white select-none pb-4">
      
      {/* ======================================================== */}
      {/* 1. MAIN INFORMASI MENU (Informasi)                       */}
      {/* ======================================================== */}
      {currentView === 'list' && (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="px-5 pt-3 pb-3 flex items-center space-x-3 border-b border-[#2b4c85]">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] border border-[#2b4c85] flex items-center justify-center text-blue-200 transition active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h2 className="text-base sm:text-lg font-black text-[#F5A623] tracking-wide">
              Informasi
            </h2>
          </div>

          {/* 4 Information Menu Cards */}
          <div className="px-5 py-4 space-y-3.5 flex-1 overflow-y-auto">
            
            {/* Card 1: PROFIL SATGAS */}
            <div
              onClick={() => setCurrentView('profil-satgas')}
              className="bg-[#162a4d] hover:bg-[#1c3561] border border-[#2b4c85] rounded-2xl p-4 flex items-center justify-between cursor-pointer transition active:scale-98 shadow-md group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white p-0.5 flex items-center justify-center shrink-0 shadow">
                  <img src="/assets/satgas-ppks.jpg" alt="Satgas" className="w-full h-full object-contain rounded-full" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider group-hover:text-[#F5A623] transition">
                  PROFIL SATGAS
                </h3>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#F5A623] transition" />
            </div>

            {/* Card 2: Hindari Berjalan Sendiri */}
            <div
              onClick={() => setCurrentView('hindari-sendiri')}
              className="bg-[#162a4d] hover:bg-[#1c3561] border border-[#2b4c85] rounded-2xl p-4 flex items-center justify-between cursor-pointer transition active:scale-98 shadow-md group"
            >
              <div className="pr-2">
                <h3 className="text-xs sm:text-sm font-black text-white tracking-wide group-hover:text-[#F5A623] transition">
                  Hindari Berjalan Sendiri
                </h3>
                <p className="text-[10px] text-blue-200/80 mt-1 leading-snug">
                  Pilih jalan yang ramai dan terang, Jangan menggunakan headset dll sampai sepi.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#F5A623] transition shrink-0" />
            </div>

            {/* Card 3: Simpan Nomor Darurat */}
            <div
              onClick={() => setCurrentView('simpan-darurat')}
              className="bg-[#162a4d] hover:bg-[#1c3561] border border-[#2b4c85] rounded-2xl p-4 flex items-center justify-between cursor-pointer transition active:scale-98 shadow-md group"
            >
              <div className="pr-2">
                <h3 className="text-xs sm:text-sm font-black text-white tracking-wide group-hover:text-[#F5A623] transition">
                  Simpan Nomor Darurat
                </h3>
                <p className="text-[10px] text-blue-200/80 mt-1 leading-snug">
                  Pastikan nomor satgas dan keluarga mudah diakses di layar handphone anda.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#F5A623] transition shrink-0" />
            </div>

            {/* Card 4: Undang-Undang tentang kekerasan fisik... */}
            <div
              onClick={() => setCurrentView('undang-undang')}
              className="bg-[#162a4d] hover:bg-[#1c3561] border border-[#2b4c85] rounded-2xl p-4 flex items-center justify-between cursor-pointer transition active:scale-98 shadow-md group"
            >
              <div className="pr-2">
                <h3 className="text-xs sm:text-sm font-black text-white tracking-wide group-hover:text-[#F5A623] transition leading-snug">
                  Undang-Undang tentang kekerasan fisik, perundungan, dan seksual
                </h3>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#F5A623] transition shrink-0" />
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. DETAIL: PROFIL SATGAS (Informasi 3)                   */}
      {/* ======================================================== */}
      {currentView === 'profil-satgas' && (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="px-5 pt-3 pb-3 flex items-center space-x-3 border-b border-[#2b4c85]">
            <button
              onClick={() => setCurrentView('list')}
              className="w-9 h-9 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] border border-[#2b4c85] flex items-center justify-center text-blue-200 transition active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h2 className="text-base sm:text-lg font-black text-[#F5A623] tracking-wide">
              PROFIL SATGAS
            </h2>
          </div>

          <div className="px-5 py-4 flex-1 overflow-y-auto space-y-4">
            
            {/* Card Content */}
            <div className="bg-[#162a4d] border border-[#2b4c85] rounded-2xl p-5 text-center shadow-lg">
              
              {/* Logo in Center */}
              <div className="w-24 h-24 rounded-full bg-white p-1 mx-auto mb-3 shadow-md flex items-center justify-center">
                <img src="/assets/satgas-ppks.jpg" alt="Satgas PPKS" className="w-full h-full object-contain rounded-full" />
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-black text-white tracking-wide uppercase mb-3">
                Satgas PPKPS
              </h3>

              {/* Description from Figma screenshot */}
              <p className="text-xs text-slate-200 leading-relaxed text-justify mb-4">
                Satgas PPKPS (Satuan Pencegahan dan Penanganan Kekerasan di Lingkungan Perguruan Tinggi) adalah unit khusus di UTDI yang dibentuk untuk memastikan lingkungan kampus yang aman, inklusif, dan bebas dari segala bentuk kekerasan, baik fisik, psikis, perundungan maupun kekerasan seksual.
              </p>

              {/* Location Badge */}
              <div className="bg-[#112140] border border-[#2b4c85] rounded-xl px-3.5 py-2.5 flex items-center space-x-2 text-xs text-white mb-2">
                <MapPin className="w-4 h-4 text-[#F5A623] shrink-0" />
                <span className="font-semibold">Gedung Utara, Lt. 1</span>
              </div>

              {/* Operating Hours Badge */}
              <div className="bg-[#112140] border border-[#2b4c85] rounded-xl px-3.5 py-2.5 flex items-center space-x-2 text-xs text-white">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold">24 Jam Siaga Melayani</span>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. DETAIL: Hindari Berjalan Sendiri (Informasi 4)         */}
      {/* ======================================================== */}
      {currentView === 'hindari-sendiri' && (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="px-5 pt-3 pb-3 flex items-center space-x-3 border-b border-[#2b4c85]">
            <button
              onClick={() => setCurrentView('list')}
              className="w-9 h-9 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] border border-[#2b4c85] flex items-center justify-center text-blue-200 transition active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h2 className="text-base sm:text-lg font-black text-[#F5A623] tracking-wide">
              Hindari Berjalan Sendiri
            </h2>
          </div>

          <div className="px-5 py-4 flex-1 overflow-y-auto">
            <div className="bg-[#162a4d] border border-[#2b4c85] rounded-2xl p-5 shadow-lg">
              <h3 className="text-sm font-black text-white mb-3">
                Hindari Berjalan Sendiri
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed text-justify">
                Hindari berjalan sendiri merupakan salah satu langkah pencegahan keamanan di lingkungan perguruan tinggi dengan cara mengurangi risiko menjadi sasaran tindakan kejahatan, perundungan, maupun kekerasan fisik, terutama saat berada di area yang sepi, kurang penerangan, atau pada malam hari. Mahasiswa disarankan untuk bepergian bersama teman, menggunakan jalur yang ramai dan aman, serta memberi tahu orang terdekat mengenai tujuan dan waktu perjalanan. Selain itu fungsi sebagai upaya pencegahan, keberadaan teman atau kelompok juga dapat membantu memberikan pertolongan, menjadi saksi, dan mempercepat respons pertolongan apabila terjadi insiden keamanan.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. DETAIL: Simpan Nomor Darurat (Informasi 5)             */}
      {/* ======================================================== */}
      {currentView === 'simpan-darurat' && (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="px-5 pt-3 pb-3 flex items-center space-x-3 border-b border-[#2b4c85]">
            <button
              onClick={() => setCurrentView('list')}
              className="w-9 h-9 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] border border-[#2b4c85] flex items-center justify-center text-blue-200 transition active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h2 className="text-base sm:text-lg font-black text-[#F5A623] tracking-wide">
              Simpan Nomor Darurat
            </h2>
          </div>

          <div className="px-5 py-4 flex-1 overflow-y-auto space-y-4">
            <div className="bg-[#162a4d] border border-[#2b4c85] rounded-2xl p-5 shadow-lg">
              <h3 className="text-sm font-black text-white mb-3">
                Simpan Nomor Darurat
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed text-justify">
                Simpan nomor darurat merupakan langkah penting dalam pencegahan dan penanganan kekerasan di lingkungan perguruan tinggi karena memungkinkan mahasiswa, dosen, maupun tenaga kependidikan untuk segera menghubungi pihak yang dapat memberikan bantuan saat terjadi situasi darurat. Nomor yang perlu disimpan antara lain layanan keamanan kampus, Satuan Pencegahan dan Penanganan Kekerasan (Satgas PPKS), pusat layanan kesehatan, kepolisian, serta layanan bantuan psikologis. Dengan akses cepat terhadap kontak darurat, korban atau saksi dapat segera melaporkan kejadian, memperoleh perlindungan, mendapatkan pendampingan, dan mengurangi risiko terjadinya dampak yang lebih serius akibat tindakan kekerasan.
              </p>
            </div>

            {/* Quick Button to Nomor Darurat */}
            <button
              onClick={onNavigateEmergency}
              className="w-full bg-[#162a4d] hover:bg-[#1a335c] border-2 border-[#F5A623] text-white font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition active:scale-98 shadow-md"
            >
              <PhoneCall className="w-4 h-4 text-[#F5A623]" />
              <span>Buka Daftar Nomor Darurat Kampus</span>
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. DETAIL: Undang-Undang... (Informasi 2)                */}
      {/* ======================================================== */}
      {currentView === 'undang-undang' && (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="px-5 pt-3 pb-3 flex items-center space-x-3 border-b border-[#2b4c85]">
            <button
              onClick={() => setCurrentView('list')}
              className="w-9 h-9 rounded-full bg-[#162a4d] hover:bg-[#1f3a69] border border-[#2b4c85] flex items-center justify-center text-blue-200 transition active:scale-95 shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h2 className="text-xs sm:text-sm font-black text-[#F5A623] tracking-wide leading-tight">
              Undang-Undang Tentang Kekerasan Fisik, Perundungan, dan Seksual
            </h2>
          </div>

          <div className="px-5 py-4 flex-1 overflow-y-auto space-y-3.5">
            
            {/* Section 1: Seksual */}
            <div className="bg-[#162a4d] border border-[#2b4c85] rounded-2xl p-4 shadow-md">
              <h4 className="text-xs font-black text-[#F5A623] uppercase tracking-wider mb-1.5">
                Seksual
              </h4>
              <p className="text-[11px] text-slate-200 leading-relaxed text-justify">
                Undang-Undang Nomor 12 Tahun 2022 tentang Tindak Pidana Kekerasan Seksual (UU TPKS) merupakan landasan hukum di Indonesia yang mengatur pencegahan, penanganan, perlindungan, dan pemulihan korban kekerasan seksual serta pemberian sanksi kepada pelaku. UU ini mencakup berbagai bentuk kekerasan seksual, seperti pelecehan seksual fisik dan nonfisik, pemaksaan kontrasepsi, eksploitasi seksual, perbudakan seksual, penyiksaan seksual, serta kekerasan seksual berbasis elektronik, dengan fokus memberikan perlindungan yang lebih komprehensif bagi korban dan menjamin penegakan hukum yang adil.
              </p>
            </div>

            {/* Section 2: Fisik */}
            <div className="bg-[#162a4d] border border-[#2b4c85] rounded-2xl p-4 shadow-md">
              <h4 className="text-xs font-black text-[#F5A623] uppercase tracking-wider mb-1.5">
                Fisik
              </h4>
              <p className="text-[11px] text-slate-200 leading-relaxed text-justify">
                Kekerasan fisik di Indonesia diatur dalam Kitab Undang-Undang Hukum Pidana (KUHP), khususnya Pasal 351 tentang penganiayaan, yang mengatur bahwa setiap tindakan yang sengaja menyebabkan rasa sakit, luka, atau kerusakan kesehatan terhadap orang lain dapat dikenai sanksi pidana berupa penjara atau denda.
              </p>
            </div>

            {/* Section 3: Perundungan */}
            <div className="bg-[#162a4d] border border-[#2b4c85] rounded-2xl p-4 shadow-md">
              <h4 className="text-xs font-black text-[#F5A623] uppercase tracking-wider mb-1.5">
                Perundungan
              </h4>
              <p className="text-[11px] text-slate-200 leading-relaxed text-justify">
                Perundungan atau bullying di Indonesia diatur dalam Undang-Undang Nomor 35 Tahun 2014 tentang Perlindungan Anak serta Kitab Undang-Undang Hukum Pidana (KUHP). Dalam Pasal 76C UU Perlindungan Anak disebutkan bahwa setiap orang dilarang melakukan kekerasan terhadap anak, termasuk tindakan perundungan fisik, verbal, maupun psikologis, dan pelakunya dapat dikenai pidana penjara serta denda seperti yang diatur dalam undang-undang.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
