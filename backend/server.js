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
import { syncAllDataToBiznetGio } from './sync.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env'), override: true });
dotenv.config();

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
    phone: "0823-1778-9406",
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
      phone: "0823-1778-9406",
      whatsapp: "082317789406",
      description: "Pencegahan & Penanganan Kekerasan Seksual (Satgas Dewi - Siaga 24 Jam).",
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
      phone: "0823-1778-9406",
      whatsapp: "082317789406",
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
  const { name, nim, email, phone, prodi, emergencyContacts } = req.body;
  const db = getDb();
  const newUser = {
    ...db.user,
    id: "usr_" + Date.now(),
    name: name || db.user.name,
    fullName: name || db.user.fullName,
    nim: nim || db.user.nim,
    email: email || db.user.email,
    phone: phone || db.user.phone,
    prodi: prodi || db.user.prodi,
    emergencyContacts: (emergencyContacts && emergencyContacts.length > 0) 
      ? emergencyContacts 
      : db.user.emergencyContacts
  };
  db.user = newUser;
  saveDb(db);
  syncAllDataToBiznetGio().catch(err => console.warn('[Biznet GIO] Sync failed:', err.message));
  res.json({
    success: true,
    message: "Akun mahasiswa beserta kontak darurat orang tua berhasil didaftarkan!",
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
  // Auto-sync updated profile, email, and photo to Biznet GIO NEO Object Storage
  syncAllDataToBiznetGio().catch(err => console.warn('[Biznet GIO] Sync failed:', err.message));

  res.json({
    success: true,
    message: "Profil mahasiswa berhasil diperbarui di database & Biznet GIO!",
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
  syncAllDataToBiznetGio().catch(err => console.warn('[Biznet GIO] Sync failed:', err.message));
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
  syncAllDataToBiznetGio().catch(err => console.warn('[Biznet GIO] Sync failed:', err.message));
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
  syncAllDataToBiznetGio().catch(err => console.warn('[Biznet GIO] Sync failed:', err.message));

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
    "Perasaanmu valid. Dewi siap mendampingi proses mediasi atau bimbingan konseling jika kamu menginginkannya❤️",
    "Dewi ada di sini menemani kamu. Apapun yang terjadi di kampus, kamu punya hak untuk merasa aman dan terlindungi."
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

/**
 * Intelligent Multi-Satgas Complaint Analyzer & Natural Context Engine
 * Menganalisis pengaduan mahasiswa (pelecehan fisik, verbal, online, penguntitan, relasi kuasa dosen/kating, dsb)
 * dan memberikan respon langsung yang akurat sesuai peran Satgas yang dipilih (Dewi, Pusat, Abel, Putra)
 */
function generateContextualReply(room, userText, lastReplyText) {
  const text = (userText || '').toLowerCase().trim();

  // Ekstraksi Entitas dari Teks Mahasiswa
  const isPhysical = /pegang|raba|sentuh|cium|peluk|tarik|paksa|grepe|tindih|remas|baju|paha|dada|fisik/i.test(text);
  const isVerbal = /omongan|ngomong|mesum|catcall|godain|seksis|kata.*kotor|candaan|cabul|pembicaraan/i.test(text);
  const isCyber = /sebar|foto|video|vcs|pap|telanjang|syur|screenshot|ss.*chat|doxxing|wa|telegram|medsos|ig/i.test(text);
  const isStalking = /ikutin|ngikutin|buntuti|ngeliatin|mengawasi|dicurigai|intai|pantau/i.test(text);
  const isDosen = /dosen|pembimbing|kaprodi|penguji|skripsi|nilai|matkul|ruang.*dosen/i.test(text);
  const isKating = /kakak.*tingkat|kating|senior|ormawa|bem|hima|kak.*kelas/i.test(text);
  const isPacar = /pacar|mantan|gebetan|hubungan.*intim|maksa.*tidur/i.test(text);
  const isEmosional = /takut|gemetar|nangis|syok|trauma|malu|cemas|panik|pusing|gak.*berani/i.test(text);

  // Deteksi Lokasi Kampus
  let lokasi = '';
  if (/lab/i.test(text)) lokasi = 'area Laboratorium';
  else if (/parkir/i.test(text)) lokasi = 'area Parkiran Kampus';
  else if (/perpus/i.test(text)) lokasi = 'area Perpustakaan';
  else if (/gedung.*[1-3]|gedung.*kuliah/i.test(text)) lokasi = 'Gedung Kuliah Terpadu';
  else if (/lorong|koridor/i.test(text)) lokasi = 'lorong kampus';
  else if (/kantin/i.test(text)) lokasi = 'area Kantin';
  else if (/kost/i.test(text)) lokasi = 'lingkungan sekitar kost';

  // 1. PENANGANAN SPESIFIK: SATGAS DEWI (Divisi Advokasi & Pendampingan Korban)
  if (room === 'satgas-dewi') {
    if (isPhysical) {
      return `Ya ampun, Dewi ikut prihatin dan menegaskan bahwa kamu sama sekali tidak bersalah atas kejadian ini. Tindakan memegang atau memaksamu ${lokasi ? `di ${lokasi} ` : ''}adalah bentuk kekerasan seksual berat! Dewi siap mendampingi kamu membuat laporan resmi, mengamankan bukti, dan meminta perlindungan kampus agar pelaku tidak mendekatimu lagi. Apakah kamu sekarang berada di tempat yang aman? Boleh ceritakan detail kejadiannya pelan-pelan ke Dewi ya ❤️`;
    }
    if (isCyber) {
      return `Penting banget: tolong jangan turuti ancamannya dan jangan hapus pesan chat atau file apapun! Screenshot semua bukti ancaman dan profil pelaku sekarang. Ancaman penyebaran konten pribadi adalah tindak pidana KBGO & UU ITE. Dewi dan tim advokasi Satgas PPKS UTDI akan mendampingi kamu menindak tegas pelakunya secara hukum dengan jaminan kerahasiaan identitas 100%. Ceritakan siapa pelakunya ke Dewi ya.`;
    }
    if (isDosen) {
      return `Dewi pastikan: kamu berhak mendapat perlindungan akademik penuh dari Rektorat! Satgas PPKS UTDI punya wewenang resmi memfasilitasi perlindungan agar nilai mata kuliah atau bimbingan skripsimu tidak boleh diintervensi oleh terlapor. Tindakan dosen tersebut adalah pelanggaran relasi kuasa berat. Kamu sangat berani sudah bersuara ke Dewi. Ceritakan kronologinya, kami lindungi status akademikmu sepenuhnya.`;
    }
    if (isStalking) {
      return `Bahaya banget kalau kamu merasa dibuntuti ${lokasi ? `di ${lokasi}` : 'di kampus'}! Dewi langsung siagakan tim pengamanan pos satpam. Sekarang posisi kamu persisnya ada di mana? Mau Dewi minta petugas satpam temani dan kawal kamu sampai ke tempat aman atau kendaraanmu sekarang?`;
    }
    if (isVerbal) {
      return `Duh, perkataan seperti itu sangat merendahkan dan sama sekali tidak bisa dibiarkan di lingkungan kampus UTDI. Jangan anggap sepele ya, kamu berhak merasa aman dan dihormati. Dewi siap membantu proses mediasi atau pemanggilan terlapor oleh tim Satgas PPKS secara tertutup tanpa menyebutkan identitasmu. Ceritakan siapa yang mengatakannya ya.`;
    }
    if (isKating || isPacar) {
      return `Kamu tidak sendirian. Status sebagai ${isKating ? 'kakak tingkat' : 'pasangan/teman'} sama sekali tidak memberi hak bagi siapapun untuk berbuat tidak senonoh atau memaksa kamu. Dewi ada di sini siap mendampingi setiap langkahmu. Boleh ceritakan bagaimana awal peristiwanya?`;
    }
    if (isEmosional) {
      return `Tarik napas perlahan ya... Kamu aman bercerita ke Dewi sekarang. Wajar sekali merasa syok atau takut setelah mengalami hal itu. Dewi tidak akan mendesak, ceritakan pelan-pelan kapanpun kamu merasa siap. Ruang ini rahasia dan aman buat kamu ❤️`;
    }
    // Percakapan santai ke Dewi
    if (/tau\s*ga+|tau\s*gk|tau\s*nggak/i.test(text)) {
      const replies = [
        "Iya, kenapa tuh? Cerita dong, Dewi dengerin di sini kok! Ada kejadian apa barusan di kampus?",
        "Eh ada apa tuh? Cerita aja pelan-pelan ke Dewi, jangan dipendam sendiri ya!",
        "Iya kenapa? Boleh banget diceritain ke Dewi, ada hal yang bikin risih atau mengganjal?"
      ];
      return replies.find(r => r !== lastReplyText) || replies[0];
    }
    if (/^i+h+|kesel|sebel|jengkel|gemes|badmood|bete/i.test(text)) {
      return "Lho kenapa kok bilang 'ihh'? Ada yang bikin kamu risih, takut, atau kesel di kampus? Boleh banget cerita pelan-pelan ya ke Dewi.";
    }
    if (/^(halo|hai|hey|hei|p\b|assalamu|pagi|siang|sore|malam)/i.test(text)) {
      return "Halo! Satgas Dewi siaga di sini. Jangan ragu ya, kamu aman bercerita. Ada apa atau ada yang bisa Dewi bantu?";
    }
  }

  // 2. PENANGANAN SPESIFIK: SATGAS PUTRA (Tim Investigasi & Patroli Keamanan)
  if (room === 'satgas-putra') {
    if (isStalking || isPhysical || lokasi) {
      return `Satgas Putra monitor. Terkait laporan ${lokasi ? `di ${lokasi}` : 'tersebut'}, tim investigasi lapangan segera memeriksa rekaman CCTV kampus di titik lokasi kejadian. Pos Satpam Utama juga kami siagakan untuk patroli pengamanan. Tolong berikan ciri-ciri terlapor atau pakaian yang dikenakan jika Anda sempat melihatnya.`;
    }
    return `Halo, Satgas Putra menerima laporan Anda. Kami memprioritaskan keamanan fisik mahasiswa di seluruh area kampus UTDI. Jangan ragu memberikan titik koordinat atau lokasi kejadian agar tim investigasi bisa menindaklanjuti.`;
  }

  // 3. PENANGANAN SPESIFIK: SATGAS ABEL (Konselor Psikologis & Trauma Healing)
  if (room === 'satgas-abel') {
    if (isEmosional || isPhysical || isVerbal) {
      return `Halo, Abel di sini. Ambil napas dalam-dalam... hembuskan perlahan. Rasa cemas, takut, atau gemetar yang kamu rasakan adalah reaksi wajar dari tubuhmu setelah menghadapi kejadian tidak menyenangkan. Kamu sangat berani sudah menghubungi kami. Abel siap memfasilitasi sesi konseling pemulihan psikologis secara privat dan nyaman.`;
    }
    return `Halo, Abel mendengarkan dengan penuh empati. Luapkan apapun perasaan atau kekhawatiran yang sedang kamu alami, tidak ada penghakiman di ruang ini. Kesehatan mental dan ketenanganmu adalah hal yang paling berharga.`;
  }

  // 4. PENANGANAN SPESIFIK: SATGAS PUSAT (Hotline Resmi PPKS UTDI)
  if (room === 'satgas-pusat') {
    return `Satgas Pusat PPKS UTDI telah mencatat laporan Anda dalam buku register aduan. Sesuai Permendikbudristek No. 30 Tahun 2021, identitas Anda dilindungi secara anonim dan terjamin dari segala bentuk ancaman maupun intimidasi. Tim pemeriksa resmi siap memproses penanganan kasus ini. Mohon lengkapi kronologi kejadian atau perkiraan waktu insiden.`;
  }

  // 5. CHATBOT / ASISTEN VIRTUAL
  if (room === 'chatbot') {
    if (isPhysical || isCyber || isDosen || isStalking) {
      return `Laporan Anda terindikasi sebagai dugaan pelanggaran kekerasan seksual / PPKS. Kami sangat menyarankan Anda terhubung langsung dengan Satgas Dewi (Divisi Pendampingan) atau Satgas Pusat di menu di atas agar segera ditangani dengan perlindungan hukum penuh.`;
    }
    return `Halo! Saya asisten virtual UTDI Care. Anda dapat langsung memilih Satgas Dewi untuk curhat & pendampingan korban, Satgas Abel untuk konseling psikologis, atau Satgas Putra untuk bantuan keamanan lapangan.`;
  }

  // Fallback Umum Cerdas
  return `Pesan Anda telah kami terima dengan kerahasiaan 100%. Tim Satgas PPKS UTDI siap mendampingi dan menindaklanjuti aduan ini. Apakah ada hal mendesak yang Anda butuhkan saat ini?`;
}

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

  // Ambil pesan reply terakhir untuk mencegah repetisi
  const previousReplies = db.counselingRooms[room].filter(m => m.sender === 'satgas' || m.sender === 'bot');
  const lastReplyText = previousReplies.length > 0 ? previousReplies[previousReplies.length - 1].text : '';

  // Buat balasan kontekstual dan natural
  const contextualReply = generateContextualReply(room, text, lastReplyText);

  const replyMessage = {
    id: 'reply_' + (Date.now() + 1),
    sender: room === 'chatbot' ? 'bot' : 'satgas',
    officerName: room === 'satgas-dewi' ? 'Satgas Dewi' : (room === 'satgas-abel' ? 'Satgas Abel' : (room === 'satgas-putra' ? 'Satgas Putra' : 'Satgas Pusat')),
    text: contextualReply,
    timestamp: timeStr,
    createdAt: new Date(Date.now() + 600).toISOString()
  };

  db.counselingRooms[room].push(replyMessage);
  saveDb(db);
  syncAllDataToBiznetGio().catch(err => console.warn('[Biznet GIO] Sync failed:', err.message));

  res.json({
    success: true,
    userMessage,
    replyMessage
  });
});

/**
 * ========================================================
 * 5.1 ADMIN / PENGELOLA SATGAS PORTAL ENDPOINTS
 * ========================================================
 */

/**
 * GET /api/admin/rooms
 * Mengambil daftar seluruh room chat beserta pesan terakhir dan status mahasiswa
 */
app.get('/api/admin/rooms', (req, res) => {
  const db = getDb();
  const rooms = db.counselingRooms || {};
  const roomList = [
    { id: 'satgas-dewi', name: 'Satgas Dewi', role: 'Divisi Advokasi & Pendampingan Korban', phone: '0823-1778-9406' },
    { id: 'satgas-pusat', name: 'Satgas Pusat', role: 'Hotline Layanan Utama PPKS UTDI', phone: '0823-1778-9406' },
    { id: 'satgas-abel', name: 'Satgas Abel', role: 'Konselor Psikologis & Trauma Healing', phone: '0813-9876-5432' },
    { id: 'satgas-putra', name: 'Satgas Putra', role: 'Tim Investigasi & Pengamanan Lapangan', phone: '0878-1122-3344' },
    { id: 'chatbot', name: 'Chat Bot Virtual', role: 'Asisten Otomatis Panduan Awal', phone: '-' }
  ].map(meta => {
    const msgs = rooms[meta.id] || [];
    const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : null;
    const userMsgs = msgs.filter(m => m.sender === 'user');
    const isAnonymous = userMsgs.length > 0 ? userMsgs[userMsgs.length - 1].isAnonymous : true;
    const hasUnread = lastMsg && lastMsg.sender === 'user';
    return {
      ...meta,
      totalMessages: msgs.length,
      lastMessage: lastMsg,
      isAnonymous,
      studentName: isAnonymous ? 'Mahasiswa (Anonim)' : (db.user?.fullName || 'Dewi Rahmawati'),
      studentNim: isAnonymous ? 'Privasi Terlindungi' : (db.user?.nim || '245410024'),
      hasUnread
    };
  });

  res.json({ success: true, rooms: roomList });
});

/**
 * POST /api/counseling/chat/:room/admin
 * Admin/Petugas Satgas membalas pesan secara manual langsung dari portal pengelola
 */
app.post('/api/counseling/chat/:room/admin', (req, res) => {
  const { room } = req.params;
  const { text, officerName = 'Satgas Dewi' } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ success: false, message: 'Pesan balasan petugas tidak boleh kosong' });
  }

  const db = getDb();
  if (!db.counselingRooms) db.counselingRooms = {};
  if (!db.counselingRooms[room]) db.counselingRooms[room] = [];

  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB";

  const adminMsg = {
    id: 'officer_' + Date.now(),
    sender: 'satgas',
    officerName: officerName,
    text: text.trim(),
    isAdminReply: true,
    timestamp: timeStr,
    createdAt: now.toISOString()
  };

  db.counselingRooms[room].push(adminMsg);
  saveDb(db);
  syncAllDataToBiznetGio().catch(err => console.warn('[Biznet GIO] Sync failed:', err.message));

  res.json({
    success: true,
    message: 'Balasan Petugas Satgas berhasil dikirim ke mahasiswa!',
    replyMessage: adminMsg
  });
});

/**
 * PUT /api/admin/reports/:id/status
 * Admin mengubah status laporan darurat SOS
 */
app.put('/api/admin/reports/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, note, officer } = req.body;
  const db = getDb();
  const report = db.sosReports.find(r => r.id === id);
  if (!report) {
    return res.status(404).json({ success: false, message: 'Laporan tidak ditemukan' });
  }

  if (status) {
    report.status = status;
    if (status === 'Selesai') report.statusColor = 'bg-emerald-500';
    else if (status === 'Sedang Ditangani') report.statusColor = 'bg-amber-500';
    else if (status === 'Petugas Menuju Lokasi') report.statusColor = 'bg-red-500';
    else if (status === 'Dibatalkan') report.statusColor = 'bg-slate-500';
  }
  if (note) report.officerNote = note;
  if (officer) report.officer = officer;

  saveDb(db);
  syncAllDataToBiznetGio().catch(err => console.warn('[Biznet GIO] Sync failed:', err.message));

  res.json({
    success: true,
    message: `Status laporan ${id} berhasil diperbarui menjadi "${status}"`,
    report
  });
});

/**
 * POST /api/admin/sync
 * Admin memicu sinkronisasi manual ke Biznet GIO
 */
app.post('/api/admin/sync', async (req, res) => {
  try {
    const result = await syncAllDataToBiznetGio();
    res.json({
      success: true,
      message: 'Semua database, foto, dan laporan berhasil disinkronkan ke Biznet GIO!',
      result
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Gagal sync ke Biznet GIO: ' + err.message });
  }
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
  syncAllDataToBiznetGio().catch(err => console.warn('[Biznet GIO] Initial sync error:', err.message));
});
