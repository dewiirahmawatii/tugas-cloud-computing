/**
 * UTDI Mobile Care & Emergency - Storage Service Module
 * 
 * Modul ini menyediakan abstraksi penyimpanan media/foto multi-provider:
 * 1. Provider Utama Cloud: BIZNET GIO NEO Object Storage (https://www.biznetgio.com)
 * 2. Provider Default / Fallback: Local Storage (/uploads/)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { biznetConfig, uploadToBiznetGio, testBiznetConnection } from './biznetgio.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/**
 * Simpan Berkas (Otomatis ke Biznet GIO jika kredensial ada, atau Local Storage jika belum)
 */
export async function saveUploadedFile({ buffer, originalname, mimetype }) {
  // Jika kredensial Biznet GIO aktif
  if (biznetConfig.isConfigured) {
    try {
      console.log(`[Storage] Mengunggah ${originalname} ke Biznet GIO NEO Object Storage...`);
      const result = await uploadToBiznetGio(buffer, originalname, mimetype);
      console.log(`[Storage] Sukses diunggah ke Biznet GIO: ${result.url}`);
      return result;
    } catch (err) {
      console.warn(`[Storage] Gagal upload ke Biznet GIO (${err.message}), fallback ke Local Storage.`);
    }
  }

  // Fallback: Local Server Disk Storage
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const ext = path.extname(originalname) || '.jpg';
  const savedFilename = `photo-${uniqueSuffix}${ext}`;
  const targetPath = path.join(uploadsDir, savedFilename);

  fs.writeFileSync(targetPath, buffer);

  return {
    success: true,
    provider: 'local',
    url: `/uploads/${savedFilename}`,
    filename: savedFilename,
    originalName: originalname,
    size: buffer.length,
    mimetype,
    uploadedAt: new Date().toISOString()
  };
}

/**
 * Simpan data Base64
 */
export async function saveBase64Image(base64Data, preferredName = 'photo') {
  const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  let buffer;
  let ext = '.jpg';
  let mimetype = 'image/jpeg';
  
  if (matches && matches.length === 3) {
    mimetype = matches[1];
    if (mimetype.includes('png')) ext = '.png';
    else if (mimetype.includes('webp')) ext = '.webp';
    buffer = Buffer.from(matches[2], 'base64');
  } else {
    buffer = Buffer.from(base64Data, 'base64');
  }

  const filename = `${preferredName}-${Date.now()}${ext}`;

  if (biznetConfig.isConfigured) {
    try {
      return await uploadToBiznetGio(buffer, filename, mimetype);
    } catch (err) {
      console.warn(`[Storage] Gagal upload base64 ke Biznet GIO, simpan lokal: ${err.message}`);
    }
  }

  const uniqueId = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const savedFilename = `${preferredName}-${uniqueId}${ext}`;
  const targetPath = path.join(uploadsDir, savedFilename);
  
  fs.writeFileSync(targetPath, buffer);

  return {
    success: true,
    provider: 'local',
    filename: savedFilename,
    url: `/uploads/${savedFilename}`,
    size: buffer.length
  };
}

export { biznetConfig, testBiznetConnection };
