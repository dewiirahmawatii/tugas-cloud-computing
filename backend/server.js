import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ensure data folder exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'db.json');

// Initial seed data
const initialData = {
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
  },
  emergencyNumbers: [
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
      description: "Pertolongan pertama pada kecelakaan (P3K) dan rawat jalan darurat mahasiswa.",
      badge: "08:00 - 16:00",
      isPrimary: false
    },
    {
      id: "en_4",
      category: "medis",
      title: "Layanan Bimbingan Konseling UTDI",
      phone: "0812-2900-5522",
      whatsapp: "081229005522",
      description: "Dukungan konseling psikologis dan pendampingan mental mahasiswa.",
      badge: "Gratis",
      isPrimary: false
    },
    {
      id: "en_5",
      category: "polisi",
      title: "Polsek Banguntapan Bantul",
      phone: "0274-452110",
      whatsapp: "0857110110",
      description: "Kantor Polisi terdekat dari area kampus UTDI (Jl. Raya Janti).",
      badge: "Polri 110",
      isPrimary: true
    },
    {
      id: "en_6",
      category: "medis",
      title: "IGD RS Bethesda Yogyakarta",
      phone: "0274-521251",
      whatsapp: "",
      description: "Instalasi Gawat Darurat & Ambulans rujukan utama wilayah Kota/Bantul.",
      badge: "IGD 118",
      isPrimary: true
    },
    {
      id: "en_7",
      category: "damkar",
      title: "Damkar Kab. Bantul & DIY",
      phone: "0274-367490",
      whatsapp: "",
      description: "Penanggulangan kebakaran, evakuasi reptil/hewan berbahaya, dan bencana.",
      badge: "Damkar 113",
      isPrimary: false
    },
    {
      id: "en_8",
      category: "medis",
      title: "PMI (Palang Merah) DIY",
      phone: "0274-372176",
      whatsapp: "",
      description: "Bank darah dan armada ambulans darurat bencana.",
      badge: "PMI",
      isPrimary: false
    }
  ],
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
      specialties: ["Kesehatan Mental", "Anxiety & Stres Kuliah", "Manajemen Emosi", "Hubungan Sosial"],
      bio: "Berpengalaman mendampingi mahasiswa dalam mengelola tekanan akademik, kecemasan skripsi, serta pemulihan dari trauma pribadi secara empatik dan solutif.",
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
      specialties: ["Bimbingan Skripsi & Tugas Akhir", "Kendala Pemrograman", "Perencanaan Karir Tech"],
      bio: "Dosen dan konselor pendamping untuk membantu mahasiswa mengatasi hambatan belajar logika komputasi, adaptasi perkuliahan IT, dan persiapan dunia kerja.",
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
      specialties: ["Pendampingan Korban PPKS", "Konsultasi Hukum & Privasi", "Pemulihan Psikososial"],
      bio: "Fasilitator resmi Satgas PPKS UTDI yang siap mendengarkan laporan dan keluhan tindak kekerasan seksual dengan jaminan identitas anonim dan perlindungan penuh.",
      jadwal: "Setiap Hari (Siaga 24 Jam via Aplikasi)"
    },
    {
      id: "c_4",
      name: "Dr. Maya Anggraini, Sp.KJ",
      title: "Spesialis Kedokteran Jiwa (Psikiatri)",
      category: "medis",
      status: "offline",
      rating: 4.9,
      reviewsCount: 112,
      experience: "12 Tahun",
      almamater: "Universitas Indonesia",
      avatar: "https://images.unsplash.com/photo-1594824813626-d352ce79860f?auto=format&fit=crop&w=300&q=80",
      specialties: ["Gangguan Tidur / Insomnia Akut", "Depresi & Burnout Parah", "Terapi Farmakoterapi"],
      bio: "Memberikan diagnosis medis dan konsultasi penanganan lanjutan bagi civitas akademika yang membutuhkan intervensi klinis.",
      jadwal: "Rabu & Sabtu, 10:00 - 15:00 WIB"
    }
  ],
  chatMessages: [
    {
      id: "msg_1",
      counselorId: "c_1",
      sender: "counselor",
      text: "Halo Ahmad Fauzi! Selamat datang di layanan konseling UTDI Care. Ada yang sedang terasa berat atau ingin kamu ceritakan hari ini? Semua pembicaraan kita di sini bersifat rahasia dan aman.",
      timestamp: "10:30 WIB",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    },
    {
      id: "msg_2",
      counselorId: "c_1",
      sender: "user",
      text: "Halo Bu Rina, terima kasih. Akhir-akhir ini saya merasa sangat overwhelmed dengan tugas akhir dan deadline proyek kuliah. Rasanya sulit fokus dan sering cemas saat malam hari.",
      timestamp: "10:32 WIB",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 120).toISOString()
    },
    {
      id: "msg_3",
      counselorId: "c_1",
      sender: "counselor",
      text: "Terima kasih sudah berani mengungkapkan ini, Ahmad. Perasaan cemas menjelang deadline tugas akhir adalah reaksi wajar tubuh saat berada di bawah tekanan tinggi. Kita bisa susun langkah kecil yang realistis bersama ya. Apakah malam ini kamu sudah sempat beristirahat cukup?",
      timestamp: "10:35 WIB",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 300).toISOString()
    }
  ],
  sosReports: [
    {
      id: "SOS-20261031-01",
      userId: "usr_utdi_215410089",
      type: "Medis",
      title: "Pertolongan Pertama - Mahasiswa Pusing di Lab 3",
      location: "Gedung Lab Terpadu Lt. 2, Sayap Barat UTDI",
      coordinates: { lat: -7.7942, lng: 110.4079 },
      note: "Teman satu meja mendadak pusing dan lemas saat praktikum jaringan.",
      status: "Selesai",
      date: "31 Okt 2026, 14:15 WIB",
      officer: "Bripka Agus & Danru Security UTDI",
      rating: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
    },
    {
      id: "SOS-20261025-02",
      userId: "usr_utdi_215410089",
      type: "Konseling",
      title: "Sesi Konseling Online Reguler",
      location: "Daring (UTDI Mobile Chat)",
      note: "Sesi bimbingan mindfulness dan manajemen waktu belajar.",
      status: "Selesai",
      date: "25 Okt 2026, 10:30 WIB",
      officer: "Dr. Rina Wulandari, M.Psi.",
      rating: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString()
    },
    {
      id: "SOS-20261018-03",
      userId: "usr_utdi_215410089",
      type: "Keamanan",
      title: "Laporan Kunci Tertinggal di Area Parkir Timur",
      location: "Parkir Mahasiswa Timur UTDI",
      coordinates: { lat: -7.7945, lng: 110.4082 },
      note: "Kunci kontak motor tertinggal, dibantu diamankan oleh pos satpam.",
      status: "Selesai",
      date: "18 Okt 2026, 17:40 WIB",
      officer: "Pak Bambang (Satpam Pos 2)",
      rating: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 13).toISOString()
    }
  ],
  articles: [
    {
      id: "art_1",
      title: "Panduan Evakuasi Gempa Bumi & Titik Kumpul (Assembly Point) UTDI",
      category: "Keselamatan Kampus",
      readTime: "3 Menit Baca",
      date: "28 Okt 2026",
      author: "Pusat Keselamatan & Sarpras UTDI",
      image: "https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80",
      summary: "Ketahui jalur evakuasi resmi, tangga darurat setiap gedung kuliah, dan lokasi 3 titik kumpul aman UTDI.",
      content: `
### Prosedur Tanggap Darurat Gempa di Kampus UTDI

Universitas Teknologi Digital Indonesia (UTDI) telah melengkapi setiap gedung perkuliahan dengan standar keselamatan gempa. Saat merasakan guncangan:

1. **JANGAN PANIK & TUNDUK LINDUNGI KEPALA (Drop, Cover, Hold On)**
   Segera berlindung di bawah meja praktikum yang kokoh atau lindungi kepala dengan tas ransel. Jauhi jendela kaca dan rak buku tinggi.

2. **JANGAN GUNAKAN LIFT**
   Gunakan selalu tangga darurat yang telah bertanda hijau "EXIT EMERGENSI". Tetap tenang dan jangan saling mendorong di tangga.

3. **MENUJU TITIK KUMPUL (ASSEMBLY POINT)**
   Kampus UTDI memiliki 3 Titik Kumpul Resmi:
   - **Titik Kumpul A:** Lapangan Olahraga / Parkir Depan Rektorat
   - **Titik Kumpul B:** Area Terbuka Gazebo Barat
   - **Titik Kumpul C:** Lapangan Upacara / Halaman Gedung Kuliah Bersama

4. **LAPORKAN KONDISI MELALUI APLIKASI**
   Buka fitur **SOS / Lapor Darurat** pada aplikasi UTDI Mobile Care ini untuk memberitahukan posisi Anda jika ada rekan yang terluka atau terperangkap.
      `
    },
    {
      id: "art_2",
      title: "Mekanisme Pengaduan & Perlindungan Korban oleh Satgas PPKS UTDI",
      category: "Layanan PPKS",
      readTime: "4 Menit Baca",
      date: "25 Okt 2026",
      author: "Satgas PPKS Universitas Teknologi Digital Indonesia",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80",
      summary: "Komitmen nol toleransi kekerasan seksual. Kerahasiaan pelapor dijamin 100% dan mendapat pendampingan hukum serta psikologis.",
      content: `
### Kampus Bebas Kekerasan Seksual (PPKS UTDI)

Satgas Pencegahan dan Penanganan Kekerasan Seksual (PPKS) UTDI dibentuk berdasarkan Permendikbudristek No. 30 Tahun 2021 untuk memastikan seluruh civitas akademika belajar dan berkarya secara aman.

#### Hak-Hak Korban dan Pelapor:
1. **Jaminan Kerahasiaan Identitas (Anonimitas Penuh)**
   Data pelapor dan korban tidak akan dibocorkan ke pihak manapun tanpa persetujuan eksplisit.
2. **Pendampingan Psikologis Gratis**
   Disediakan sesi terapi dengan psikolog klinis kampus hingga pemulihan optimal.
3. **Pendampingan Hukum & Akademik**
   Jaminan keamanan nilai, pembimbingan akademik, serta advokasi hukum jika diperlukan.

#### Cara Melapor di Aplikasi:
- Tekan menu **Konsultasi** -> Pilih **Ibu Siti Rahmawati, S.H. (Satgas PPKS)**
- Atau hubungi hotline darurat PPKS langsung: **0811-2555-7788**
      `
    },
    {
      id: "art_3",
      title: "5 Tips Ampuh Mengatasi Burnout & Tekanan Coding Mahasiswa IT",
      category: "Kesehatan Mental",
      readTime: "3 Menit Baca",
      date: "20 Okt 2026",
      author: "Unit Konseling Mahasiswa UTDI",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
      summary: "Teknik 20-20-20, manajemen pomodoro, serta latihan pernapasan box breathing untuk mahasiswa rumpun informatika.",
      content: `
### Menjaga Kesehatan Mental Calon Digital Innovator

Kuliah di rumpun teknologi seringkali menuntut waktu berjam-jam di depan layar kode program, debugging rumit, dan deadline tugas yang padat. Berikut kiat menjaga kewarasan dan performa akademik:

1. **Aturan 20-20-20 untuk Mata & Otak**
   Setiap 20 menit coding, pandanglah objek sejauh 20 kaki (6 meter) selama minimal 20 detik. Ini menurunkan ketegangan saraf optik dan otak.
2. **Pisahkan Ruang Belajar dan Istirahat**
   Jangan membuka laptop di atas tempat tidur agar pola tidur Anda tidak terganggu oleh sinyal 'siaga kerja'.
3. **Teknik 'Rubber Duck Debugging' Bersama Teman**
   Jika merasa buntu pada kode program, bicarakan alur logika pada rekan atau konselor daripada menyalahkan diri sendiri.
4. **Gunakan Layanan Konseling UTDI**
   Jangan ragu untuk berbincang dengan Konselor di aplikasi UTDI Mobile Care kapanpun Anda merasa lelah berlebih.
      `
    },
    {
      id: "art_4",
      title: "Lokasi Kotak P3K, Tabung Pemadam APAR, dan Pos Satpam UTDI",
      category: "Fasilitas Kampus",
      readTime: "2 Menit Baca",
      date: "14 Okt 2026",
      author: "Biro Umum & Keamanan Kampus",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
      summary: "Peta titik strategis peralatan keselamatan di Gedung Kuliah, Laboratorium Komputer, dan Rektorat.",
      content: `
### Lokasi Fasilitas Darurat di Lingkungan Kampus

- **Kotak P3K Lengkap:** Tersedia di Ruang TU Fakultas, Setiap Laboratorium Komputer (Lab 1 - Lab 6), dan Pos Satpam Utama.
- **Tabung APAR (Pemadam Api Ringan):** Berada di setiap bordes tangga lantai 1, 2, 3, lorong server lab jaringan, dan kantin kampus.
- **Defibrilator / Ruang Istirahat Medis:** Poliklinik UTDI Gedung Sayap Barat, Buka Senin - Jumat.
      `
    }
  ]
};

// Initialize or load db
function getDb() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  try {
    const raw = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
    return initialData;
  }
}

function saveDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// Routes

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'UTDI Mobile Campus Care & Emergency API',
    institution: 'Universitas Teknologi Digital Indonesia',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// 2. Auth & User Profile
app.get('/api/auth/me', (req, res) => {
  const db = getDb();
  res.json({ success: true, user: db.user });
});

app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body;
  const db = getDb();
  // Allow login with student NIM or any credentials for demo convenience
  res.json({
    success: true,
    message: "Login berhasil! Selamat datang di UTDI Mobile.",
    token: "utdi_jwt_token_sample_" + Date.now(),
    user: db.user
  });
});

app.post('/api/auth/register', (req, res) => {
  const { name, nim, email, phone, prodi } = req.body;
  const db = getDb();
  const newUser = {
    ...db.user,
    id: "usr_" + Date.now(),
    name: name || db.user.name,
    nim: nim || db.user.nim,
    email: email || db.user.email,
    phone: phone || db.user.phone,
    prodi: prodi || db.user.prodi
  };
  db.user = newUser;
  saveDb(db);
  res.json({
    success: true,
    message: "Akun mahasiswa berhasil didaftarkan!",
    user: newUser
  });
});

app.put('/api/auth/profile', (req, res) => {
  const { name, phone, email, alamat, prodi } = req.body;
  const db = getDb();
  db.user = {
    ...db.user,
    name: name || db.user.name,
    phone: phone || db.user.phone,
    email: email || db.user.email,
    alamat: alamat || db.user.alamat,
    prodi: prodi || db.user.prodi
  };
  saveDb(db);
  res.json({
    success: true,
    message: "Profil mahasiswa berhasil diperbarui!",
    user: db.user
  });
});

app.put('/api/auth/password', (req, res) => {
  const { oldPassword, newPassword } = req.body;
  res.json({
    success: true,
    message: "Kata sandi akun UTDI berhasil diubah!"
  });
});

// Emergency contacts management for student
app.get('/api/auth/emergency-contacts', (req, res) => {
  const db = getDb();
  res.json({ success: true, contacts: db.user.emergencyContacts });
});

app.post('/api/auth/emergency-contacts', (req, res) => {
  const { name, relationship, phone } = req.body;
  const db = getDb();
  const newContact = {
    id: "ec_" + Date.now(),
    name,
    relationship: relationship || "Keluarga",
    phone
  };
  db.user.emergencyContacts.push(newContact);
  saveDb(db);
  res.json({
    success: true,
    message: "Kontak darurat kerabat berhasil ditambahkan!",
    contacts: db.user.emergencyContacts
  });
});

app.delete('/api/auth/emergency-contacts/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  db.user.emergencyContacts = db.user.emergencyContacts.filter(c => c.id !== id);
  saveDb(db);
  res.json({
    success: true,
    message: "Kontak darurat berhasil dihapus",
    contacts: db.user.emergencyContacts
  });
});

// 3. Official Emergency Numbers Directory
app.get('/api/emergency/contacts', (req, res) => {
  const db = getDb();
  res.json({ success: true, contacts: db.emergencyNumbers });
});

// 4. SOS Emergency Reports
let activeSos = null; // in-memory tracking of ongoing SOS

app.post('/api/emergency/sos', (req, res) => {
  const { type, location, note, coordinates } = req.body;
  const db = getDb();
  const reportId = "SOS-" + Date.now().toString().slice(-6);
  
  const newReport = {
    id: reportId,
    userId: db.user.id,
    type: type || "Darurat Umum",
    title: `Sinyal Darurat ${type || 'SOS'} - ${location || 'Kampus UTDI'}`,
    location: location || "Gedung Kuliah Terpadu UTDI",
    coordinates: coordinates || { lat: -7.7942, lng: 110.4079 },
    note: note || "Panggilan darurat seketika melalui tombol SOS aplikasi.",
    status: "Petugas Menuju Lokasi",
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + " WIB",
    officer: "Bripka Bambang & Tim Tanggap Keamanan Kampus",
    etaMinutes: 3,
    createdAt: new Date().toISOString()
  };

  db.sosReports.unshift(newReport);
  saveDb(db);

  activeSos = newReport;

  res.json({
    success: true,
    message: "Sinyal darurat SOS berhasil dipancarkan ke Pos Keamanan UTDI!",
    report: newReport
  });
});

app.get('/api/emergency/sos/active', (req, res) => {
  res.json({
    success: true,
    activeSos: activeSos
  });
});

app.put('/api/emergency/sos/:id/cancel', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const report = db.sosReports.find(r => r.id === id);
  if (report) {
    report.status = "Dibatalkan Pengguna";
    saveDb(db);
  }
  if (activeSos && activeSos.id === id) {
    activeSos = null;
  }
  res.json({
    success: true,
    message: "Sinyal darurat telah dibatalkan."
  });
});

app.put('/api/emergency/sos/:id/resolve', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const report = db.sosReports.find(r => r.id === id);
  if (report) {
    report.status = "Selesai";
    saveDb(db);
  }
  if (activeSos && activeSos.id === id) {
    activeSos = null;
  }
  res.json({
    success: true,
    message: "Laporan penanganan darurat telah selesai dan ditutup."
  });
});

// 5. Riwayat (History)
app.get('/api/history', (req, res) => {
  const db = getDb();
  res.json({
    success: true,
    history: db.sosReports
  });
});

// 6. Counselors
app.get('/api/counselors', (req, res) => {
  const db = getDb();
  res.json({ success: true, counselors: db.counselors });
});

app.get('/api/counselors/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const counselor = db.counselors.find(c => c.id === id);
  if (!counselor) {
    return res.status(404).json({ success: false, message: "Konselor tidak ditemukan" });
  }
  res.json({ success: true, counselor });
});

// Chat Messages with counselor
app.get('/api/counselors/:id/messages', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const messages = db.chatMessages.filter(m => m.counselorId === id);
  res.json({ success: true, messages });
});

// Counselor smart responses bank
const automatedReplies = [
  "Terima kasih atas keterbukaannya. Saya sangat menghargai ceritamu. Setiap langkah kecil dalam menghadapi kendala perkuliahan dan tekanan mental sangat berarti.",
  "Saya mengerti situasi ini tidak mudah untukmu. Apakah kamu merasakan ketegangan fisik seperti sesak atau sulit konsentrasi saat memikirkan hal tersebut?",
  "Mari kita fokus pada hal-hal yang berada di bawah kendalimu hari ini. Boleh diceritakan bagian mana dari tugas atau masalah ini yang paling menyita energimu?",
  "Kamu tidak sendirian. Satgas dan Unit Konseling UTDI selalu ada di sini untuk mendampingi sampai kamu merasa lebih tenang dan aman.",
  "Saran saya untuk sejenak: tarik napas perlahan selama 4 detik, tahan 4 detik, lalu hembuskan perlahan 6 detik. Setelah rileks, kita lanjutkan pembicaraan ini ya."
];

app.post('/api/counselors/:id/messages', (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const db = getDb();

  const counselor = db.counselors.find(c => c.id === id) || { name: "Konselor UTDI" };

  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB";

  const userMsg = {
    id: "msg_" + Date.now(),
    counselorId: id,
    sender: "user",
    text,
    timestamp: timeStr,
    createdAt: now.toISOString()
  };

  db.chatMessages.push(userMsg);

  // Generate automated reply from counselor
  const randomReply = automatedReplies[Math.floor(Math.random() * automatedReplies.length)];
  const counselorReply = {
    id: "msg_" + (Date.now() + 1),
    counselorId: id,
    sender: "counselor",
    text: randomReply,
    timestamp: timeStr,
    createdAt: new Date(Date.now() + 500).toISOString()
  };

  db.chatMessages.push(counselorReply);
  saveDb(db);

  res.json({
    success: true,
    userMessage: userMsg,
    counselorReply: counselorReply
  });
});

// 7. Articles & Guides
app.get('/api/articles', (req, res) => {
  const db = getDb();
  res.json({ success: true, articles: db.articles });
});

app.get('/api/articles/:id', (req, res) => {
  const { id } = req.params;
  const db = getDb();
  const article = db.articles.find(a => a.id === id);
  if (!article) {
    return res.status(404).json({ success: false, message: "Artikel tidak ditemukan" });
  }
  res.json({ success: true, article });
});

// 8. Serve Frontend Static Build
const distPath = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 UTDI CARE & EMERGENCY SYSTEM FULL-STACK RUNNING`);
  console.log(`📍 Web URL: http://localhost:${PORT}`);
  console.log(`🏫 Universitas Teknologi Digital Indonesia (STMIK AKAKOM)`);
  console.log(`📱 Frontend + Backend API Ready`);
  console.log(`===============================================`);
});
