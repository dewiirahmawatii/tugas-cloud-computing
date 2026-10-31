import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import dotenv from 'dotenv';
import { 
  uploadsDir, 
  saveUploadedFile, 
  saveBase64Image, 
  biznetConfig, 
  testBiznetConnection 
} from './storage.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// Ensure data folder exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Static route for uploaded files (Accessible via http://localhost:5000/uploads/<filename>)
app.use('/uploads', express.static(uploadsDir));

// Multer in-memory storage for high-speed streaming to Biznet GIO or Local Disk
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
});

const dbPath = path.join(dataDir, 'db.json');

// Initial seed data
const initialData = {
  user: {
    id: "usr_utdi_24001",
    name: "Dewi",
    fullName: "Dewi Rahmawati",
    nim: "245410024",
    prodi: "S1 Informatika",
    fakultas: "Fakultas Teknologi Informasi",
    angkatan: "2024",
    email: "dewi.rahmawati24@students.utdi.ac.id",
    phone: "0812-2456-7890",
    alamat: "Jl. Raya Janti No. 143, Banguntapan, Bantul, DIY",
    avatar: "/assets/dewi-avatar.jpg",
    emergencyContacts: [
      { id: "ec_1", name: "Bambang Suharsono (Ayah)", relationship: "Orang Tua", phone: "0813-9988-7766" },
      { id: "ec_2", name: "Sri Wahyuni (Ibu)", relationship: "Orang Tua", phone: "0812-7766-5544" },
      { id: "ec_3", name: "Rizky Dwi (Teman Kost)", relationship: "Sahabat", phone: "0878-1234-5678" }
    ],
    privacySettings: {
      anonim: true,
      hideEmail: true,
      confirmSos: true
    }
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
    }
  ],
  sosReports: [
    {
      id: "REP-280526-01",
      userId: "usr_utdi_24001",
      type: "Laporan Darurat",
      title: "Laporan Darurat",
      location: "Jl. Pemuda No. 17",
      coordinates: { lat: -7.7942, lng: 110.4079 },
      note: "Pencegahan insiden dan pendampingan di lokasi bersama tim reaksi cepat.",
      status: "Selesai",
      statusColor: "bg-emerald-500",
      date: "28 Mei 2026, 10:15 WIB",
      officer: "Tim Reaksi Cepat Satgas & Satpam",
      rating: 5,
      photoUrl: null,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
    },
    {
      id: "REP-200526-02",
      userId: "usr_utdi_24001",
      type: "Konsultasi",
      title: "Konsultasi",
      location: "Chat dengan Satgas Dewi",
      coordinates: null,
      note: "Sesi konseling pendampingan mahasiswa dan konsultasi privasi.",
      status: "Selesai",
      statusColor: "bg-amber-500",
      date: "20 Mei 2026, 13:40 WIB",
      officer: "Satgas PPKS Dewi Rahmawati",
      rating: 5,
      photoUrl: null,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11).toISOString()
    },
    {
      id: "REP-150526-03",
      userId: "usr_utdi_24001",
      type: "Laporan Darurat",
      title: "Laporan Darurat",
      location: "Parkiran Kampus",
      coordinates: { lat: -7.7945, lng: 110.4082 },
      note: "Patroli pengamanan area parkir timur dan pemeriksaan kendaraan.",
      status: "Selesai",
      statusColor: "bg-emerald-500",
      date: "15 Mei 2026, 16:45 WIB",
      officer: "Danru Pos Satpam UTDI",
      rating: 5,
      photoUrl: null,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 16).toISOString()
    }
  ],
  counselingRooms: {
    chatbot: [
      {
        id: 'bot_1',
        sender: 'bot',
        text: 'Halo, ada yang bisa kami bantu?',
        timestamp: '10:00 WIB'
      }
    ],
    'satgas-pusat': [
      {
        id: 'pusat_1',
        sender: 'satgas',
        text: 'Halo, ada yang bisa kami bantu? Layanan Satgas Pusat PPKPS UTDI siap melayani 24 jam.',
        timestamp: '10:05 WIB'
      }
    ],
    'satgas-dewi': [
      {
        id: 'dewi_1',
        sender: 'satgas',
        text: 'Hai Hari ini Satgas Dewi di sini! Jangan ragu buat tanya apapun atau minta bantuan ya❤️',
        timestamp: '10:10 WIB'
      }
    ],
    'satgas-abel': [
      {
        id: 'abel_1',
        sender: 'satgas',
        text: 'Hai Hari ini Satgas Abel di sini! Jangan ragu buat tanya apapun atau minta bantuan ya❤️',
        timestamp: '10:12 WIB'
      }
    ],
    'satgas-putra': [
      {
        id: 'putra_1',
        sender: 'satgas',
        text: 'Halo, Satgas Putra di sini. Tim keamanan & investigasi siap mendampingi Anda di kampus.',
        timestamp: '10:15 WIB'
      }
    ]
  },
  articles: [
    {
      id: "art_1",
      title: "Panduan Evakuasi Gempa Bumi & Titik Kumpul (Assembly Point) UTDI",
      category: "Keselamatan Kampus",
      readTime: "3 Menit Baca",
      date: "28 Okt 2026",
      author: "Pusat Keselamatan & Sarpras UTDI",
      image: "/assets/maya-safety-walk.jpg",
      summary: "Ketahui jalur evakuasi resmi, tangga darurat setiap gedung kuliah, dan lokasi 3 titik kumpul aman UTDI."
    },
    {
      id: "art_2",
      title: "Mekanisme Pengaduan & Perlindungan Korban oleh Satgas PPKS UTDI",
      category: "Layanan PPKS",
      readTime: "4 Menit Baca",
      date: "25 Okt 2026",
      author: "Satgas PPKS Universitas Teknologi Digital Indonesia",
      image: "/assets/sari-cyber-shield.jpg",
      summary: "Komitmen nol toleransi kekerasan seksual. Kerahasiaan pelapor dijamin 100% dan mendapat pendampingan hukum serta psikologis."
    },
    {
      id: "art_3",
      title: "5 Tips Ampuh Mengatasi Burnout & Tekanan Coding Mahasiswa IT",
      category: "Kesehatan Mental",
      readTime: "3 Menit Baca",
      date: "20 Okt 2026",
      author: "Unit Konseling Mahasiswa UTDI",
      image: "/assets/diko-mascot.jpg",
      summary: "Teknik 20-20-20, manajemen pomodoro, serta latihan pernapasan box breathing untuk mahasiswa rumpun informatika."
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
    const parsed = JSON.parse(raw);
    if (!parsed.user) parsed.user = initialData.user;
    if (!parsed.sosReports) parsed.sosReports = initialData.sosReports;
    if (!parsed.counselingRooms) parsed.counselingRooms = initialData.counselingRooms;
    if (!parsed.user.privacySettings) parsed.user.privacySettings = initialData.user.privacySettings;
    return parsed;
  } catch (err) {
    fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
    return initialData;
  }
}

function saveDb(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

getDb();

let activeSos = null;

// ========================================================
// 1. STORAGE ENDPOINTS (Biznet GIO NEO Object Storage / Local)
// ========================================================

/**
 * GET /api/storage/status
 * Cek status layanan cloud storage (Biznet GIO vs Local)
 */
app.get('/api/storage/status', async (req, res) => {
  const biznetStatus = await testBiznetConnection();
  res.json({
    success: true,
    activeProvider: biznetConfig.isConfigured ? 'biznet-gio' : 'local-storage',
    biznetGio: {
      provider: 'Biznet GIO NEO Object Storage (https://www.biznetgio.com)',
      endpoint: biznetConfig.endpoint,
      bucket: biznetConfig.bucket,
      configured: biznetConfig.isConfigured,
      connection: biznetStatus
    },
    localStorage: {
      urlPrefix: '/uploads/',
      folder: uploadsDir
    }
  });
});

/**
 * POST /api/upload
 * Endpoint upload file multipart (foto profil, bukti laporan SOS, attachment chat)
 */
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Tidak ada file yang diunggah. Pastikan field berformat multipart bernama "file".' 
      });
    }

    const savedFile = await saveUploadedFile({
      buffer: req.file.buffer,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype
    });

    res.json({
      success: true,
      message: savedFile.provider === 'biznet-gio' 
        ? 'Foto/Berkas berhasil disimpan ke Biznet GIO NEO Object Storage!' 
        : 'Foto/Berkas berhasil disimpan ke storage lokal server!',
      ...savedFile
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal mengunggah berkas: ' + err.message });
  }
});

/**
 * POST /api/upload/base64
 * Endpoint upload gambar base64 langsung dari client (Webcam / Mobile Canvas)
 */
app.post('/api/upload/base64', async (req, res) => {
  try {
    const { data, filename = 'capture' } = req.body;
    if (!data) {
      return res.status(400).json({ success: false, message: 'Data base64 tidak valid.' });
    }

    const result = await saveBase64Image(data, filename);
    res.json({
      success: true,
      message: result.provider === 'biznet-gio'
        ? 'Foto base64 berhasil disimpan ke Biznet GIO NEO Object Storage!'
        : 'Foto base64 berhasil disimpan ke storage lokal!',
      ...result
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal memproses base64: ' + err.message });
  }
});

/**
 * GET /api/uploads
 * List semua file yang tersimpan di server storage lokal
 */
app.get('/api/uploads', (req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir).map(file => {
      const stats = fs.statSync(path.join(uploadsDir, file));
      return {
        filename: file,
        url: `/uploads/${file}`,
        size: stats.size,
        createdAt: stats.birthtime
      };
    });
    res.json({ success: true, count: files.length, files });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ========================================================
// 2. AUTH & USER PROFILE ENDPOINTS
// ========================================================

app.get('/api/auth/me', (req, res) => {
  const db = getDb();
  res.json({ success: true, user: db.user });
});

app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body;
  const db = getDb();
  res.json({
    success: true,
    message: "Login berhasil! Selamat datang di UTDI Mobile.",
    token: "utdi_jwt_token_" + Date.now(),
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
    fullName: name || db.user.fullName,
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
  const { name, fullName, phone, email, alamat, prodi, avatar } = req.body;
  const db = getDb();
  db.user = {
    ...db.user,
    name: name !== undefined ? name : db.user.name,
    fullName: fullName !== undefined ? fullName : db.user.fullName,
    phone: phone !== undefined ? phone : db.user.phone,
    email: email !== undefined ? email : db.user.email,
    alamat: alamat !== undefined ? alamat : db.user.alamat,
    prodi: prodi !== undefined ? prodi : db.user.prodi,
    avatar: avatar !== undefined ? avatar : db.user.avatar
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

// Privacy Settings
app.get('/api/auth/privacy', (req, res) => {
  const db = getDb();
  res.json({ success: true, privacy: db.user.privacySettings });
});

app.put('/api/auth/privacy', (req, res) => {
  const { anonim, hideEmail, confirmSos } = req.body;
  const db = getDb();
  db.user.privacySettings = {
    anonim: anonim !== undefined ? anonim : db.user.privacySettings.anonim,
    hideEmail: hideEmail !== undefined ? hideEmail : db.user.privacySettings.hideEmail,
    confirmSos: confirmSos !== undefined ? confirmSos : db.user.privacySettings.confirmSos
  };
  saveDb(db);
  res.json({
    success: true,
    message: "Pengaturan privasi & keamanan diperbarui!",
    privacy: db.user.privacySettings
  });
});

// Emergency Contacts
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

// ========================================================
// 3. EMERGENCY NUMBERS DIRECTORY
// ========================================================

app.get('/api/emergency/contacts', (req, res) => {
  const db = getDb();
  res.json({ success: true, contacts: db.emergencyNumbers });
});

// ========================================================
// 4. SOS EMERGENCY REPORTING & HISTORY
// ========================================================

app.post('/api/emergency/sos', (req, res) => {
  const { type, location, note, coordinates, photoUrl } = req.body;
  const db = getDb();
  const reportId = "REP-" + Date.now().toString().slice(-6);
  
  const now = new Date();
  const formattedDate = now.toLocaleDateString('id-ID', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  }) + ", " + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB";

  const newReport = {
    id: reportId,
    userId: db.user.id,
    type: type || "Laporan Darurat",
    title: type ? `Laporan ${type}` : "Sinyal Darurat SOS",
    location: location || "Gedung Kuliah Terpadu UTDI",
    coordinates: coordinates || { lat: -7.7942, lng: 110.4079 },
    note: note || "Panggilan darurat seketika melalui tombol SOS aplikasi.",
    status: "Petugas Menuju Lokasi",
    statusColor: "bg-red-500",
    date: formattedDate,
    officer: "Bripka Agus & Danru Security Pos Utama UTDI",
    photoUrl: photoUrl || null,
    etaMinutes: 3,
    createdAt: now.toISOString()
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
    report.statusColor = "bg-slate-500";
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
    report.statusColor = "bg-emerald-500";
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

// History endpoints
app.get('/api/history', (req, res) => {
  const db = getDb();
  res.json({
    success: true,
    history: db.sosReports
  });
});

app.get('/api/emergency/sos/history', (req, res) => {
  const db = getDb();
  res.json({
    success: true,
    history: db.sosReports
  });
});

// ========================================================
// 5. CONSULTATION & SATGAS CHAT
// ========================================================

app.get('/api/counseling/chat/:room', (req, res) => {
  const { room } = req.params;
  const db = getDb();
  const messages = db.counselingRooms?.[room] || [];
  res.json({ success: true, messages });
});

const satgasResponses = {
  chatbot: [
    "Halo! Saya asisten virtual UTDI Care. Apakah ada kendala atau informasi satgas yang bisa saya bantu arahkan?",
    "Untuk bantuan darurat cepat, Anda bisa menekan tombol SOS atau memilih hotline Satgas PPKS di menu layanan.",
    "Semua sesi konsultasi di UTDI Care terjamin kerahasiaannya dengan perlindungan hukum kampus penuh."
  ],
  'satgas-pusat': [
    "Terima kasih telah menghubungi Satgas Pusat PPKPS UTDI. Kami menerima aduan Anda dengan kerahasiaan 100%. Boleh diceritakan waktu dan tempat kejadiannya?",
    "Posko Satgas Pusat di Gedung Rektorat Sayap Barat selalu siaga. Anda berhak mendapatkan pendampingan hukum dan psikologis."
  ],
  'satgas-dewi': [
    "Hai! Terima kasih sudah berani bercerita ke Dewi. Kamu sangat berani dan tidak sendiri. Ceritakan pelan-pelan ya, aku mendengarkan.",
    "Perasaanmu valid. Dewi siap mendampingi proses mediasi atau bimbingan konseling jika kamu menginginkannya❤️"
  ],
  'satgas-abel': [
    "Halo, Abel mendengarkan. Ambil napas sejenak, kita bicarakan perlahan. Kesehatan mental dan rasa amanmu adalah prioritas utama.",
    "Kamu bisa bercerita secara anonim kapanpun kamu merasa nyaman. Kami di sini untuk mendukung pemulihanmu."
  ],
  'satgas-putra': [
    "Halo, Satgas Putra di sini. Jika Anda membutuhkan pengawalan fisik atau patroli keamanan di area kampus, segera beri tahu kami titik lokasi Anda.",
    "Laporan Anda segera kami koordinasikan dengan tim patroli pos satpam utama UTDI."
  ]
};

app.post('/api/counseling/chat/:room', (req, res) => {
  const { room } = req.params;
  const { text, isAnonymous, attachmentUrl } = req.body;
  const db = getDb();

  if (!db.counselingRooms) db.counselingRooms = {};
  if (!db.counselingRooms[room]) db.counselingRooms[room] = [];

  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB";

  const userMessage = {
    id: 'msg_' + Date.now(),
    sender: 'user',
    text: text || '',
    isAnonymous: !!isAnonymous,
    attachmentUrl: attachmentUrl || null,
    timestamp: timeStr,
    createdAt: now.toISOString()
  };

  db.counselingRooms[room].push(userMessage);

  const replies = satgasResponses[room] || satgasResponses.chatbot;
  const randomReply = replies[Math.floor(Math.random() * replies.length)];

  const replyMessage = {
    id: 'reply_' + (Date.now() + 1),
    sender: room === 'chatbot' ? 'bot' : 'satgas',
    text: randomReply,
    timestamp: timeStr,
    createdAt: new Date(Date.now() + 600).toISOString()
  };

  db.counselingRooms[room].push(replyMessage);
  saveDb(db);

  res.json({
    success: true,
    userMessage,
    replyMessage
  });
});

app.get('/api/counselors', (req, res) => {
  const db = getDb();
  res.json({ success: true, counselors: db.counselors });
});

// ========================================================
// 6. ARTICLES & EDUCATIONAL CONTENT
// ========================================================

app.get('/api/articles', (req, res) => {
  const db = getDb();
  res.json({ success: true, articles: db.articles });
});

// ========================================================
// 7. SERVE FRONTEND STATIC BUILD
// ========================================================

const distPath = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 UTDI MOBILE CARE & EMERGENCY SYSTEM API RUNNING`);
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`🌐 Storage Provider: ${biznetConfig.isConfigured ? 'Biznet GIO NEO Object Storage' : 'Local Disk Storage (/uploads/)'}`);
  console.log(`☁️ Biznet GIO Endpoint: ${biznetConfig.endpoint}`);
  console.log(`📦 Biznet GIO Bucket: ${biznetConfig.bucket}`);
  console.log(`🏫 Universitas Teknologi Digital Indonesia (STMIK AKAKOM)`);
  console.log(`💾 Live DB: ${dbPath}`);
  console.log(`=======================================================`);
});
