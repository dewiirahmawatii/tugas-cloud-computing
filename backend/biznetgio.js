/**
 * Biznet GIO NEO Object Storage (NOS) Integration Module
 * Layanan Cloud Storage Indonesia (S3-Compatible)
 * Website: https://www.biznetgio.com
 * Portal: https://portal.biznetgio.com
 */

import { S3Client, PutObjectCommand, HeadBucketCommand, ListBucketsCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from backend directory and workspace root
dotenv.config({ path: path.join(__dirname, '.env'), override: true });
dotenv.config({ path: path.join(process.cwd(), '.env'), override: true });

// Dynamic configuration object with getters
export const biznetConfig = {
  get endpoint() {
    return process.env.BIZNET_GIO_ENDPOINT || 'https://nos.jkt-1.neo.id';
  },
  get region() {
    return process.env.BIZNET_GIO_REGION || 'jkt-1';
  },
  get accessKeyId() {
    return process.env.BIZNET_GIO_ACCESS_KEY || '';
  },
  get secretAccessKey() {
    return process.env.BIZNET_GIO_SECRET_KEY || '';
  },
  get bucket() {
    return process.env.BIZNET_GIO_BUCKET || 'utdi-care-storage';
  },
  get isConfigured() {
    const key = this.accessKeyId.trim();
    const secret = this.secretAccessKey.trim();
    return Boolean(
      key && 
      secret && 
      key !== 'MASUKKAN_ACCESS_KEY_BIZNET_GIO_DISINI' &&
      !key.includes('MASUKKAN')
    );
  }
};

let cachedS3Client = null;
let lastAccessKey = '';
let lastSecretKey = '';

export function getBiznetS3Client() {
  if (!biznetConfig.isConfigured) return null;

  // Re-create client if credentials changed
  if (!cachedS3Client || lastAccessKey !== biznetConfig.accessKeyId || lastSecretKey !== biznetConfig.secretAccessKey) {
    lastAccessKey = biznetConfig.accessKeyId;
    lastSecretKey = biznetConfig.secretAccessKey;

    cachedS3Client = new S3Client({
      region: biznetConfig.region,
      endpoint: biznetConfig.endpoint,
      credentials: {
        accessKeyId: biznetConfig.accessKeyId,
        secretAccessKey: biznetConfig.secretAccessKey,
      },
      forcePathStyle: true, // Wajib true untuk Ceph/NEO Object Storage Biznet GIO
    });
  }
  return cachedS3Client;
}

/**
 * Upload Buffer langsung ke Biznet GIO NEO Object Storage
 */
export async function uploadToBiznetGio(fileBuffer, filename, contentType = 'image/jpeg') {
  const client = getBiznetS3Client();
  if (!client) {
    throw new Error('Kredensial Biznet GIO belum lengkap di file .env');
  }

  const cleanFilename = `utdi-uploads/${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  const command = new PutObjectCommand({
    Bucket: biznetConfig.bucket,
    Key: cleanFilename,
    Body: fileBuffer,
    ContentType: contentType,
    ACL: 'public-read', // Public read agar gambar dapat dimuat di browser & aplikasi mobile APK
  });

  await client.send(command);

  // Format URL publik Biznet GIO NEO Object Storage
  const endpointBase = biznetConfig.endpoint.replace(/\/+$/, '');
  const publicUrl = `${endpointBase}/${biznetConfig.bucket}/${cleanFilename}`;

  return {
    success: true,
    provider: 'biznet-gio',
    url: publicUrl,
    filename: cleanFilename,
    bucket: biznetConfig.bucket,
    uploadedAt: new Date().toISOString()
  };
}

/**
 * Tes koneksi ke Biznet GIO
 */
export async function testBiznetConnection() {
  // Re-read .env in case user updated it
  dotenv.config({ path: path.join(__dirname, '.env'), override: true });

  if (!biznetConfig.isConfigured) {
    return {
      connected: false,
      configured: false,
      message: 'Kredensial Biznet GIO belum diisi di .env. Menggunakan Local Storage fallback.'
    };
  }

  try {
    const client = getBiznetS3Client();
    await client.send(new HeadBucketCommand({ Bucket: biznetConfig.bucket }));
    return {
      connected: true,
      configured: true,
      bucket: biznetConfig.bucket,
      endpoint: biznetConfig.endpoint,
      message: 'Terhubung sukses ke Biznet GIO NEO Object Storage!'
    };
  } catch (err) {
    return {
      connected: false,
      configured: true,
      error: err.message,
      message: 'Kredensial ada tetapi gagal mengakses bucket Biznet GIO: ' + err.message
    };
  }
}
