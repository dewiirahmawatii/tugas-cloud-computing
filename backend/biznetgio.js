/**
 * Biznet GIO NEO Object Storage (NOS) Integration Module
 * Layanan Cloud Storage Indonesia (S3-Compatible)
 * Website: https://www.biznetgio.com
 * Portal: https://portal.biznetgio.com
 */

import { S3Client, PutObjectCommand, HeadBucketCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Konfigurasi Biznet GIO NEO Object Storage
export const biznetConfig = {
  endpoint: process.env.BIZNET_GIO_ENDPOINT || 'https://nos.jkt-1.neo.id',
  region: process.env.BIZNET_GIO_REGION || 'jkt-1',
  accessKeyId: process.env.BIZNET_GIO_ACCESS_KEY || '',
  secretAccessKey: process.env.BIZNET_GIO_SECRET_KEY || '',
  bucket: process.env.BIZNET_GIO_BUCKET || 'utdi-care',
  // Flag apakah kredensial sudah diisi oleh mahasiswa
  get isConfigured() {
    return Boolean(
      this.accessKeyId && 
      this.secretAccessKey && 
      this.accessKeyId !== 'MASUKKAN_ACCESS_KEY_BIZNET_GIO_DISINI'
    );
  }
};

let s3Client = null;

export function getBiznetS3Client() {
  if (!biznetConfig.isConfigured) return null;

  if (!s3Client) {
    s3Client = new S3Client({
      region: biznetConfig.region,
      endpoint: biznetConfig.endpoint,
      credentials: {
        accessKeyId: biznetConfig.accessKeyId,
        secretAccessKey: biznetConfig.secretAccessKey,
      },
      forcePathStyle: true, // Wajib bernilai true untuk kompatibilitas Ceph/NEO Object Storage Biznet GIO
    });
  }
  return s3Client;
}

/**
 * Upload Buffer / File langsung ke Biznet GIO NEO Object Storage
 * @param {Buffer} fileBuffer
 * @param {string} filename
 * @param {string} contentType
 * @returns {Promise<{success: boolean, url: string, provider: string, filename: string}>}
 */
export async function uploadToBiznetGio(fileBuffer, filename, contentType = 'image/jpeg') {
  const client = getBiznetS3Client();
  if (!client) {
    throw new Error('Kredensial Biznet GIO belum dikonfigurasi di file .env');
  }

  const cleanFilename = `utdi-uploads/${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

  const command = new PutObjectCommand({
    Bucket: biznetConfig.bucket,
    Key: cleanFilename,
    Body: fileBuffer,
    ContentType: contentType,
    ACL: 'public-read', // Agar file foto/laporan dapat diakses langsung oleh aplikasi mobile
  });

  await client.send(command);

  // Format URL publik Biznet GIO NEO Object Storage:
  // https://nos.jkt-1.neo.id/<bucket-name>/<object-key>
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
      message: 'Kredensial ada tetapi gagal mengakses bucket Biznet GIO. Periksa nama bucket dan permission.'
    };
  }
}
