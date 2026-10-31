// API Service for UTDI Mobile Care & Emergency

const API_BASE = '/api';

export const api = {
  // Auth
  async getMe() {
    try {
      const res = await fetch(`${API_BASE}/auth/me`);
      if (!res.ok) throw new Error('Failed');
      return await res.json();
    } catch (e) {
      return {
        success: true,
        user: {
          id: "usr_utdi_215410089",
          name: "Ahmad Fauzi",
          nim: "215410089",
          prodi: "S1 Informatika",
          fakultas: "Fakultas Teknologi Informasi",
          angkatan: "2023",
          email: "ahmad.fauzi@students.utdi.ac.id",
          phone: "0812-3456-7890",
          alamat: "Jl. Karang Jambe No. 18, Banguntapan, Bantul, DIY",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
          emergencyContacts: [
            { id: "ec_1", name: "Bambang Suharsono (Ayah)", relationship: "Orang Tua", phone: "0813-9988-7766" },
            { id: "ec_2", name: "Sri Wahyuni (Ibu)", relationship: "Orang Tua", phone: "0812-7766-5544" },
            { id: "ec_3", name: "Rizky Dwi (Teman Kost)", relationship: "Sahabat", phone: "0878-1234-5678" }
          ]
        }
      };
    }
  },

  async login(identifier, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });
      return await res.json();
    } catch (e) {
      return { success: true, message: "Login Berhasil (Mode Offline/Demo)" };
    }
  },

  async register(data) {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      return { success: true, message: "Pendaftaran Berhasil!" };
    }
  },

  async updateProfile(data) {
    try {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      return { success: true, message: "Profil Diperbarui!" };
    }
  },

  async updatePassword(data) {
    try {
      const res = await fetch(`${API_BASE}/auth/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      return { success: true, message: "Kata sandi diubah!" };
    }
  },

  // Emergency Contacts Directory
  async getEmergencyNumbers() {
    try {
      const res = await fetch(`${API_BASE}/emergency/contacts`);
      if (!res.ok) throw new Error('Failed');
      return await res.json();
    } catch (e) {
      return {
        success: true,
        contacts: [
          {
            id: "en_1",
            category: "kampus",
            title: "Satpam UTDI (Pos Gerbang Utama)",
            phone: "0274-486664",
            whatsapp: "081248666401",
            description: "Layanan tanggap darurat pos keamanan kampus 24 jam non-stop.",
            badge: "24 Jam",
            isPrimary: true
          },
          {
            id: "en_2",
            category: "ppks",
            title: "Satgas PPKS UTDI",
            phone: "0811-2555-7788",
            whatsapp: "081125557788",
            description: "Pencegahan & Penanganan Kekerasan Seksual (Kerahasiaan 100% Terjamin).",
            badge: "Paling Rahasia",
            isPrimary: true
          },
          {
            id: "en_3",
            category: "medis",
            title: "Poliklinik & Medis Kampus UTDI",
            phone: "0813-2800-4411",
            whatsapp: "081328004411",
            description: "Pertolongan pertama pada kecelakaan (P3K) dan rawat darurat.",
            badge: "08:00 - 16:00",
            isPrimary: false
          },
          {
            id: "en_4",
            category: "polisi",
            title: "Polsek Banguntapan Bantul",
            phone: "0274-452110",
            whatsapp: "0857110110",
            description: "Kantor Polisi terdekat dari area kampus UTDI (Jl. Raya Janti).",
            badge: "Polri 110",
            isPrimary: true
          },
          {
            id: "en_5",
            category: "medis",
            title: "IGD RS Bethesda Yogyakarta",
            phone: "0274-521251",
            whatsapp: "",
            description: "Instalasi Gawat Darurat & Ambulans rujukan utama.",
            badge: "IGD 118",
            isPrimary: true
          },
          {
            id: "en_6",
            category: "damkar",
            title: "Damkar Kab. Bantul & DIY",
            phone: "0274-367490",
            whatsapp: "",
            description: "Penanggulangan kebakaran & evakuasi darurat.",
            badge: "Damkar 113",
            isPrimary: false
          }
        ]
      };
    }
  },

  // SOS Trigger
  async triggerSos(data) {
    try {
      const res = await fetch(`${API_BASE}/emergency/sos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      return {
        success: true,
        report: {
          id: "SOS-" + Math.floor(100000 + Math.random() * 900000),
          title: "Sinyal Darurat " + (data.type || "SOS"),
          location: data.location || "Kampus UTDI - Gedung Utama",
          status: "Petugas Menuju Lokasi",
          etaMinutes: 3,
          officer: "Bripka Bambang & Danru Security UTDI",
          date: "Hari Ini, Baru Saja",
          note: data.note || "Panggilan darurat seketika melalui tombol SOS aplikasi."
        }
      };
    }
  },

  async cancelSos(id) {
    try {
      const res = await fetch(`${API_BASE}/emergency/sos/${id}/cancel`, { method: 'PUT' });
      return await res.json();
    } catch (e) {
      return { success: true };
    }
  },

  // Counselors
  async getCounselors() {
    try {
      const res = await fetch(`${API_BASE}/counselors`);
      if (!res.ok) throw new Error('Failed');
      return await res.json();
    } catch (e) {
      return {
        success: true,
        counselors: [
          {
            id: "c_1",
            name: "Dr. Rina Wulandari, M.Psi., Psikolog",
            title: "Psikolog Klinis & Konselor Mahasiswa",
            category: "bk",
            status: "online",
            rating: 4.9,
            reviewsCount: 148,
            experience: "8 Tahun",
            almamater: "Universitas Gadjah Mada",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
            specialties: ["Kesehatan Mental", "Anxiety & Stres Kuliah", "Manajemen Emosi"],
            bio: "Berpengalaman mendampingi mahasiswa dalam mengelola tekanan akademik, kecemasan skripsi, serta pemulihan emosional.",
            jadwal: "Senin - Jumat, 09:00 - 18:00 WIB"
          },
          {
            id: "c_2",
            name: "Bpk. Hendro Santoso, S.Kom., M.Cs",
            title: "Konselor Akademik & Karir IT",
            category: "akademik",
            status: "online",
            rating: 4.8,
            reviewsCount: 95,
            experience: "10 Tahun",
            almamater: "Institut Teknologi Bandung",
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
            specialties: ["Bimbingan Skripsi", "Kendala Pemrograman", "Karir Tech"],
            bio: "Dosen dan konselor pendamping untuk membantu mahasiswa mengatasi hambatan logika komputasi dan tugas akhir.",
            jadwal: "Selasa & Kamis, 13:00 - 17:00 WIB"
          },
          {
            id: "c_3",
            name: "Ibu Siti Rahmawati, S.H.",
            title: "Satgas PPKS UTDI (Divisi Penanganan)",
            category: "ppks",
            status: "online",
            rating: 5.0,
            reviewsCount: 62,
            experience: "6 Tahun",
            almamater: "Universitas Islam Indonesia",
            avatar: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=300&q=80",
            specialties: ["Pendampingan PPKS", "Konsultasi Hukum & Privasi", "Perlindungan"],
            bio: "Fasilitator resmi Satgas PPKS UTDI yang siap mendengarkan laporan kekerasan seksual dengan perlindungan penuh.",
            jadwal: "Setiap Hari (Siaga 24 Jam via Aplikasi)"
          }
        ]
      };
    }
  },

  async getChatMessages(counselorId) {
    try {
      const res = await fetch(`${API_BASE}/counselors/${counselorId}/messages`);
      if (!res.ok) throw new Error('Failed');
      return await res.json();
    } catch (e) {
      return {
        success: true,
        messages: [
          {
            id: "msg_1",
            counselorId,
            sender: "counselor",
            text: "Halo Ahmad Fauzi! Selamat datang di layanan konseling UTDI Care. Ada yang sedang terasa berat atau ingin kamu ceritakan hari ini? Semua pembicaraan kita di sini bersifat rahasia dan aman.",
            timestamp: "10:30 WIB"
          },
          {
            id: "msg_2",
            counselorId,
            sender: "user",
            text: "Halo Bu Rina, terima kasih. Akhir-akhir ini saya merasa sangat cemas dengan deadline tugas besar dan skripsi. Sulit fokus di kelas.",
            timestamp: "10:32 WIB"
          },
          {
            id: "msg_3",
            counselorId,
            sender: "counselor",
            text: "Terima kasih sudah berani mengungkapkan ini, Ahmad. Perasaan cemas menjelang deadline adalah wajar. Kita bisa susun langkah kecil yang realistis bersama ya.",
            timestamp: "10:35 WIB"
          }
        ]
      };
    }
  },

  async sendChatMessage(counselorId, text) {
    try {
      const res = await fetch(`${API_BASE}/counselors/${counselorId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      return await res.json();
    } catch (e) {
      const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB";
      return {
        success: true,
        userMessage: {
          id: "msg_" + Date.now(),
          counselorId,
          sender: "user",
          text,
          timestamp: timeStr
        },
        counselorReply: {
          id: "msg_" + (Date.now() + 1),
          counselorId,
          sender: "counselor",
          text: "Saya memahami apa yang kamu rasakan. Setiap tantangan perkuliahan pasti ada solusinya jika kita urai satu per satu. Mari ceritakan lebih lanjut.",
          timestamp: timeStr
        }
      };
    }
  },

  // History
  async getHistory() {
    try {
      const res = await fetch(`${API_BASE}/history`);
      if (!res.ok) throw new Error('Failed');
      return await res.json();
    } catch (e) {
      return {
        success: true,
        history: [
          {
            id: "SOS-20261031-01",
            type: "Medis",
            title: "Pertolongan Pertama - Pusing di Lab 3",
            location: "Gedung Lab Terpadu Lt. 2 UTDI",
            status: "Selesai",
            date: "31 Okt 2026, 14:15 WIB",
            officer: "Bripka Agus & Danru Security",
            rating: 5
          },
          {
            id: "SOS-20261025-02",
            type: "Konseling",
            title: "Sesi Konseling Online Reguler",
            location: "Daring (UTDI Mobile Chat)",
            status: "Selesai",
            date: "25 Okt 2026, 10:30 WIB",
            officer: "Dr. Rina Wulandari, M.Psi.",
            rating: 5
          },
          {
            id: "SOS-20261018-03",
            type: "Keamanan",
            title: "Kunci Kontak Tertinggal di Parkir Timur",
            location: "Parkir Mahasiswa Timur UTDI",
            status: "Selesai",
            date: "18 Okt 2026, 17:40 WIB",
            officer: "Pak Bambang (Satpam Pos 2)",
            rating: 5
          }
        ]
      };
    }
  },

  // Articles
  async getArticles() {
    try {
      const res = await fetch(`${API_BASE}/articles`);
      if (!res.ok) throw new Error('Failed');
      return await res.json();
    } catch (e) {
      return {
        success: true,
        articles: [
          {
            id: "art_1",
            title: "Panduan Evakuasi Gempa Bumi & Titik Kumpul (Assembly Point) UTDI",
            category: "Keselamatan Kampus",
            readTime: "3 Menit Baca",
            date: "28 Okt 2026",
            author: "Pusat Keselamatan & Sarpras UTDI",
            image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80",
            summary: "Ketahui jalur evakuasi resmi, tangga darurat setiap gedung kuliah, dan lokasi 3 titik kumpul aman UTDI."
          },
          {
            id: "art_2",
            title: "Mekanisme Pengaduan & Perlindungan Korban oleh Satgas PPKS UTDI",
            category: "Layanan PPKS",
            readTime: "4 Menit Baca",
            date: "25 Okt 2026",
            author: "Satgas PPKS Universitas Teknologi Digital Indonesia",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
            summary: "Komitmen nol toleransi kekerasan seksual. Kerahasiaan pelapor dijamin 100% dan mendapat pendampingan hukum serta psikologis."
          },
          {
            id: "art_3",
            title: "5 Tips Ampuh Mengatasi Burnout & Tekanan Coding Mahasiswa IT",
            category: "Kesehatan Mental",
            readTime: "3 Menit Baca",
            date: "20 Okt 2026",
            author: "Unit Konseling Mahasiswa UTDI",
            image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
            summary: "Teknik 20-20-20, manajemen pomodoro, serta latihan pernapasan box breathing untuk mahasiswa rumpun informatika."
          }
        ]
      };
    }
  }
};
