# UTDI Mobile Care & Emergency System 🛡️
> **Aplikasi Mobile Terpadu Keamanan Kampus & Layanan Mahasiswa**  
> Dibuat persis dan identik sesuai arsitektur diagram prototipe Figma (**Flow 1**), lengkap dengan **Frontend** dan **Backend**.  
> **Universitas Teknologi Digital Indonesia (UTDI)** — *Digital • Global • Integrity*.

---

## 📱 Ringkasan Proyek & Pemetaan Alur Figma (Flow 1)

Aplikasi ini mengimplementasikan seluruh 18+ layar dan alur interaktif (*noodle connection*) yang terdapat pada tangkapan layar prototipe Figma tanpa ada perubahan atau bagian yang terlewat:

```
                                  [ ON BOARDING ]                 [ LOGIN ]
                                 on...  on...  on...            Lo...   Bu...
                                   │      │      │                │       │
                                   └──────┴──────┴───────────────►┴───────┘
                                                  │
                                                  ▼
                          ┌───────────────────────┴───────────────────────┐
                          │                     [ HOME ]                  │
                          │                       ho...                   │
                          │                         │                     │
                          │   ┌─────────────────────┼─────────────────┐   │
                          │   ▼                     ▼                 ▼   │
                          │ [ RIWAYAT ]         [ PROFIL ]       [ FITUR ]│
                          │   riw...              profil                  │
                          │                         │                     │
                          │             ┌─────┬─────┼─────┐               │
                          │             ▼     ▼     ▼     ▼               │
                          │            Pe... ga... Ko... acc...           │
                          │                                               │
                          └───────────────────────────────────────────────┘
                                                    │
                                                    ▼
                     ┌──────────────────┬───────────┴──────────┬──────────────────┐
                     ▼                  ▼                      ▼                  ▼
             [ NOMOR DARURAT ]   [ PETA & LAPOR ]      [ KONSULTASI CHAT ]   [ PANDUAN EDUKASI ]
                  nor...            Da...  Dar...        kon...  Voice Call        Inf...
```

---

## 🗂️ Pemetaan Lengkap 18 Layar Prototipe Figma

| No | Label di Figma | Nama Layar & Fitur | Deskripsi & Fungsionalitas |
|:---|:---|:---|:---|
| 1 | `on...` (1) | **Splash Screen** | Lambang kompas UTDI bercahaya dengan radar berputar, slogan *Digital - Global - Integrity*, navigasi otomatis / tombol mulai. |
| 2 | `on...` (2) | **Onboarding 1** | Ilustrasi perisai keamanan tanggap darurat, penjelasan sistem respons Satpam & Tim Reaksi Cepat kampus. |
| 3 | `on...` (3) | **Onboarding 2** | Ilustrasi pendampingan konseling mahasiswa & Satgas PPKS, jaminan kerahasiaan 100%, tombol "Mulai Sekarang" ke Login. |
| 4 | `Lo...` | **Login Akun Mahasiswa** | Form masuk dengan NIM/Email Mahasiswa, kata sandi, opsi *Ingat Saya*, *Lupa Sandi*, serta tombol *Login Instan Demo*. |
| 5 | `Bu...` | **Buat Akun (Register)** | Registrasi lengkap: Nama, NIM, Program Studi (Informatika, SI, RPL, TI), No HP WhatsApp, Password, dan persetujuan privasi. |
| 6 | `ho...` | **Beranda (Home Dashboard)** | **Tombol Darurat (SOS) Merah Menyala** berdenyut, status GPS Lab 3 UTDI (Aman), grid 6 menu layanan, banner edukasi, dan riwayat terkini. |
| 7 | `riw...` | **Riwayat Pelaporan** | Filter tab (*Semua, Darurat SOS, Konseling*), status tiket (*Selesai, Diproses*), tanggal kejadian, petugas penangan, dan modal detail tiket. |
| 8 | `profil` | **Profil Mahasiswa** | Kartu identitas mahasiswa (KTM Digital), NIM 215410089, Prodi Informatika, status terverifikasi, pengaturan nada alarm, dan menu akun. |
| 9 | `Pe...` | **Ubah Profil (Edit)** | Form perbarui Nama, No WhatsApp, Email, dan Alamat domisili kos di Yogyakarta. |
| 10 | `ga...` | **Ganti Kata Sandi** | Form ubah password lama ke password baru dengan validasi keamanan. |
| 11 | `Ko...` | **Kontak Darurat Kerabat** | Daftar kontak darurat pribadi (Ayah, Ibu, Teman Kos), form tambah kontak baru, serta tombol hapus dan panggil cepat. |
| 12 | `acc...` | **Modal Sukses (Confirmed)** | Dialog konfirmasi modern dengan ikon centang animasi hijau (*Data Berhasil Diperbarui*). |
| 13 | `nor...` | **Nomor Darurat Kampus** | Direktori kontak siaga: Satpam UTDI Pos 1 & 2 (24 Jam), Satgas PPKS, Poliklinik, Polsek Banguntapan, IGD 118, Damkar 113. |
| 14 | `Da...` | **Peta & Lapor SOS** | Peta interaktif koordinat kampus UTDI (-7.7942, 110.4079), pilihan kategori darurat (Medis, Kejahatan, PPKS, Bencana), input catatan, dan tombol besar kirim sinyal. |
| 15 | `Dar...` | **Live SOS Dispatch Tracking** | Peta tracking real-time dengan animasi mobil patroli bergerak menuju titik mahasiswa, kalkulasi ETA (2-3 menit), rincian petugas, dan tombol telepon petugas. |
| 16 | `kon...` | **Daftar Konselor** | Direktori konselor BK, Satgas PPKS, dan Dosen Karir dengan foto avatar, status online hijau, rating bintang, jumlah ulasan, dan tombol chat. |
| 17 | `kon...` (Chat) | **Ruang Chat Konseling** | Chat interaktif dengan konselor, pesan sambutan, saran cepat (*quick chips*), input pesan, dan sistem balasan otomatis cerdas dari backend. |
| 18 | `Voice Call` | **Panggilan Suara Konselor** | Tampilan panggilan audio layar penuh bertema dark navy sesuai Figma, gelombang visualizer suara berdenyut, live timer durasi, tombol Mute, Speaker, dan End Call. |
| 19 | `Inf...` | **Panduan Edukasi Kampus** | Kumpulan SOP keselamatan resmi: Evakuasi gempa & 3 titik kumpul UTDI, Prosedur lapor PPKS, Tips atasi burnout coding, dan denah APAR/P3K. |

---

## 🛠️ Arsitektur Teknologi

### Frontend
- **React 18** + **Vite 6** (Cepat, ringan, dan responsif).
- **Tailwind CSS 3** (Warna Midnight Dark Blue UTDI `#0b162c`, Navy Card `#122347`, Accent Blue `#2563eb`, dan Danger SOS `#ef4444`).
- **Lucide React Icons** (Ikonografi modern dan presisi).
- **Web Audio API Synthesizer** (Menghasilkan efek suara sirene darurat SOS dan nada panggilan telepon langsung tanpa dependensi file eksternal).
- **Interactive Device Mockup Frame** (Fitur preview simulator iPhone 16 Pro, bingkai Android, atau Fullscreen, lengkap dengan dropdown navigasi instan ke seluruh 18 layar).

### Backend
- **Node.js** + **Express.js**.
- **RESTful API** dengan endpoints:
  - Auth: `/api/auth/login`, `/api/auth/register`, `/api/auth/profile`, `/api/auth/password`, `/api/auth/emergency-contacts`
  - Emergency SOS: `/api/emergency/sos`, `/api/emergency/sos/active`, `/api/emergency/contacts`
  - Konseling & Chat: `/api/counselors`, `/api/counselors/:id/messages` (GET & POST)
  - Riwayat: `/api/history`
  - Panduan: `/api/articles`
- **Database JSON Tersimpan Otomatis**: Disimpan persisten di `backend/data/db.json` dengan data awal civitas kampus UTDI.
- **Static SPA Hosting**: Backend otomatis melayani file frontend `frontend/dist` sehingga dapat berjalan terintegrasi dalam 1 port.

---

## 🚀 Panduan Menjalankan Aplikasi

### Opsi 1: Menjalankan Full-Stack (Frontend + Backend Terpadu)

Cukup jalankan satu perintah dari folder utama:

```powershell
npm start
```
Buka browser di:
👉 **`http://localhost:5000`**

---

### Opsi 2: Mode Pengembangan (Live Hot-Reload)

Jika Anda ingin mengedit kode frontend atau backend secara langsung dengan auto-refresh:

1. **Jalankan Backend Server (Terminal 1):**
   ```powershell
   node backend/server.js
   ```
   *(Berjalan di port 5000)*

2. **Jalankan Frontend Dev Server (Terminal 2):**
   ```powershell
   npm run frontend
   ```
   *(Berjalan di `http://localhost:5173` dengan reverse proxy otomatis ke backend)*

---

## 💡 Fitur Keren yang Disertakan

1. **Audio Synthesis Darurat**:
   - Menekan tombol SOS memicu sirene darurat audio melalui browser Web Audio API.
   - Panggilan suara konselor dilengkapi visualizer dan simulasi dering.
   - Tersedia tombol *Audio Aktif / Mute* di bilah kontrol atas.

2. **Pengalih Tampilan Layar (Screen Navigator)**:
   - Terdapat dropdown navigasi di bagian atas untuk melompat langsung ke layar manapun dari alur Flow 1 Figma tanpa harus mengklik langkah demi langkah.

3. **Simulasi Pelacakan Petugas (Live SOS Dispatch)**:
   - Begitu sinyal darurat dikirim, ikon mobil patroli satpam kampus akan bergerak secara mulus di peta mendekati pin koordinat mahasiswa dengan pembaruan status waktu tiba (ETA).

4. **Bot Konselor Empatis**:
   - Mengirim pesan pada ruang chat konseling akan langsung mendapatkan balasan empatik dari konselor dalam 1 detik.

