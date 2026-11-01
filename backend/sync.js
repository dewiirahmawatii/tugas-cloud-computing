/**
 * Auto-Sync Service to Biznet GIO NEO Object Storage
 * Uploads student data (name, email, phone, etc.), emergency reports, and profile pictures
 * directly to the root of the Biznet GIO bucket so they appear directly in S3 Browser / CS Browser!
 */

import { PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getBiznetS3Client, biznetConfig } from './biznetgio.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'data', 'db.json');

/**
 * Sync entire student profile, email, phone, and emergency data to Biznet GIO
 */
export async function syncAllDataToBiznetGio() {
  if (!biznetConfig.isConfigured) return;

  const client = getBiznetS3Client();
  if (!client) return;

  try {
    let db = {};
    if (fs.existsSync(dbPath)) {
      db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    }

    // 1. Upload data-mahasiswa.json (Nama, Email, NIM, Phone, Alamat, etc.)
    if (db.user) {
      const studentData = {
        judul: "DATA PROFIL MAHASISWA UTDI",
        nim: db.user.nim || "245410024",
        namaLengkap: db.user.fullName || db.user.name || "Dewi Rahmawati",
        namaPanggilan: db.user.name || "Dewi",
        email: db.user.email || "dewi.rahmawati24@students.utdi.ac.id",
        nomorTelepon: db.user.phone || "0812-2456-7890",
        programStudi: db.user.prodi || "S1 Informatika",
        fakultas: db.user.fakultas || "Fakultas Teknologi Informasi",
        angkatan: db.user.angkatan || "2024",
        alamatDomisili: db.user.alamat || "Jl. Raya Janti No. 143, Banguntapan, Bantul, DIY",
        fotoProfilCloudUrl: db.user.avatar,
        kontakDaruratKerabat: db.user.emergencyContacts || [],
        pengaturanPrivasi: db.user.privacySettings || {},
        terakhirDiperbarui: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }) + " WIB"
      };

      await client.send(new PutObjectCommand({
        Bucket: biznetConfig.bucket,
        Key: 'data-mahasiswa.json',
        Body: Buffer.from(JSON.stringify(studentData, null, 2)),
        ContentType: 'application/json',
        ACL: 'public-read'
      }));
      console.log('[Biznet GIO] data-mahasiswa.json tersimpan di root bucket!');
    }

    // 2. Upload laporan-darurat.json (Riwayat SOS & Laporan)
    if (db.sosReports) {
      await client.send(new PutObjectCommand({
        Bucket: biznetConfig.bucket,
        Key: 'laporan-darurat.json',
        Body: Buffer.from(JSON.stringify(db.sosReports, null, 2)),
        ContentType: 'application/json',
        ACL: 'public-read'
      }));
      console.log('[Biznet GIO] laporan-darurat.json tersimpan di root bucket!');
    }

    // 3. Upload database-utdi.json (Full backup)
    await client.send(new PutObjectCommand({
      Bucket: biznetConfig.bucket,
      Key: 'database-utdi.json',
      Body: Buffer.from(JSON.stringify(db, null, 2)),
      ContentType: 'application/json',
      ACL: 'public-read'
    }));
    console.log('[Biznet GIO] database-utdi.json tersimpan di root bucket!');

    // 4. Save a direct copy of latest avatar as 'foto-profil-dewi.jpg' at root of bucket!
    if (db.user && db.user.avatar) {
      if (db.user.avatar.startsWith('http')) {
        try {
          const res = await fetch(db.user.avatar);
          if (res.ok) {
            const buf = Buffer.from(await res.arrayBuffer());
            await client.send(new PutObjectCommand({
              Bucket: biznetConfig.bucket,
              Key: 'foto-profil-dewi.jpg',
              Body: buf,
              ContentType: 'image/jpeg',
              ACL: 'public-read'
            }));
            console.log('[Biznet GIO] foto-profil-dewi.jpg tersimpan di root bucket!');
          }
        } catch (e) {
          console.warn('[Biznet GIO] Could not copy avatar to root:', e.message);
        }
      }
    }
  } catch (err) {
    console.error('[Biznet GIO] Gagal sinkronisasi data ke cloud:', err.message);
  }
}

