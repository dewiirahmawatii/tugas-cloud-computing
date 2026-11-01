// API Service for UTDI Mobile Care & Emergency System
// Connects frontend screens to Express backend & Storage Service

const API_BASE = '/api';

export const api = {
  // ========================================================
  // 1. Storage & Media Upload Service
  // ========================================================

  /**
   * Upload file multipart (File objek dari input file/kamera)
   * Mengembalikan { success: true, url: "/uploads/...", filename: "..." }
   */
  async uploadFile(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error('Upload failed');
      return await res.json();
    } catch (e) {
      console.warn('API Upload Fallback:', e);
      // Fallback object URL jika offline
      return {
        success: true,
        url: URL.createObjectURL(file),
        filename: file.name
      };
    }
  },

  /**
   * Upload gambar format Base64 (dari kamera canvas / cropping)
   */
  async uploadBase64(base64Data, filename = 'photo') {
    try {
      const res = await fetch(`${API_BASE}/upload/base64`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: base64Data, filename })
      });
      if (!res.ok) throw new Error('Upload base64 failed');
      return await res.json();
    } catch (e) {
      console.warn('API Upload Base64 Fallback:', e);
      return {
        success: true,
        url: base64Data,
        filename: `${filename}.jpg`
      };
    }
  },

  // ========================================================
  // 2. Auth & Student Profile
  // ========================================================
  async getMe() {
    try {
      const res = await fetch(`${API_BASE}/auth/me`);
      if (!res.ok) throw new Error('Failed to fetch user');
      return await res.json();
    } catch (e) {
      return {
        success: true,
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
          privacySettings: { anonim: true, hideEmail: true, confirmSos: true }
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
      return { success: true, message: "Profil Diperbarui!", user: data };
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

  async getPrivacy() {
    try {
      const res = await fetch(`${API_BASE}/auth/privacy`);
      return await res.json();
    } catch (e) {
      return { success: true, privacy: { anonim: true, hideEmail: true, confirmSos: true } };
    }
  },

  async updatePrivacy(data) {
    try {
      const res = await fetch(`${API_BASE}/auth/privacy`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      return { success: true, privacy: data };
    }
  },

  // Emergency Contacts
  async getEmergencyContacts() {
    try {
      const res = await fetch(`${API_BASE}/auth/emergency-contacts`);
      return await res.json();
    } catch (e) {
      return { success: true, contacts: [] };
    }
  },

  async addEmergencyContact(data) {
    try {
      const res = await fetch(`${API_BASE}/auth/emergency-contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      return { success: true, contacts: [] };
    }
  },

  async deleteEmergencyContact(id) {
    try {
      const res = await fetch(`${API_BASE}/auth/emergency-contacts/${id}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (e) {
      return { success: true };
    }
  },

  // Directory of Emergency Numbers
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
          }
        ]
      };
    }
  },

  // ========================================================
  // 3. SOS Trigger & History
  // ========================================================
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
          id: "REP-" + Math.floor(100000 + Math.random() * 900000),
          title: "Sinyal Darurat " + (data.type || "SOS"),
          location: data.location || "Kampus UTDI - Gedung Utama",
          status: "Petugas Menuju Lokasi",
          statusColor: "bg-red-500",
          etaMinutes: 3,
          officer: "Bripka Bambang & Danru Security UTDI",
          date: "Hari Ini, Baru Saja",
          note: data.note || "Panggilan darurat seketika melalui tombol SOS aplikasi.",
          photoUrl: data.photoUrl || null
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

  async resolveSos(id) {
    try {
      const res = await fetch(`${API_BASE}/emergency/sos/${id}/resolve`, { method: 'PUT' });
      return await res.json();
    } catch (e) {
      return { success: true };
    }
  },

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
            id: "REP-280526-01",
            title: "Laporan Darurat",
            location: "Jl. Pemuda No. 17",
            status: "Selesai",
            statusColor: "bg-emerald-500",
            date: "28 Mei 2026, 10:15",
            officer: "Tim Reaksi Cepat Satgas & Satpam",
            note: "Pencegahan insiden dan pendampingan di lokasi."
          }
        ]
      };
    }
  },

  // ========================================================
  // 4. Consultation & Satgas Chat Rooms
  // ========================================================
  async getRoomMessages(room) {
    try {
      const res = await fetch(`${API_BASE}/counseling/chat/${room}`);
      if (!res.ok) throw new Error('Failed');
      return await res.json();
    } catch (e) {
      return { success: false, messages: [] };
    }
  },

  async sendRoomMessage(room, { text, isAnonymous, attachmentUrl }) {
    try {
      const res = await fetch(`${API_BASE}/counseling/chat/${room}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, isAnonymous, attachmentUrl })
      });
      return await res.json();
    } catch (e) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB";
      return {
        success: true,
        userMessage: {
          id: 'msg_' + Date.now(),
          sender: 'user',
          text,
          attachmentUrl,
          timestamp: timeStr
        },
        replyMessage: {
          id: 'reply_' + (Date.now() + 1),
          sender: room === 'chatbot' ? 'bot' : 'satgas',
          text: 'Pesan telah diterima. Tim konseling siaga mendampingi Anda.',
          timestamp: timeStr
        }
      };
    }
  },

  async getCounselors() {
    try {
      const res = await fetch(`${API_BASE}/counselors`);
      if (!res.ok) throw new Error('Failed');
      return await res.json();
    } catch (e) {
      return { success: true, counselors: [] };
    }
  },

  // ========================================================
  // 5. Articles & Guides
  // ========================================================
  async getArticles() {
    try {
      const res = await fetch(`${API_BASE}/articles`);
      if (!res.ok) throw new Error('Failed');
      return await res.json();
    } catch (e) {
      return { success: true, articles: [] };
    }
  },

  // ========================================================
  // 6. Admin / Petugas Satgas Portal Services
  // ========================================================
  async getAdminRooms() {
    try {
      const res = await fetch(`${API_BASE}/admin/rooms`);
      if (!res.ok) throw new Error('Failed to fetch admin rooms');
      return await res.json();
    } catch (e) {
      return { success: false, rooms: [] };
    }
  },

  async sendAdminMessage(room, { text, officerName = 'Satgas Dewi' }) {
    try {
      const res = await fetch(`${API_BASE}/counseling/chat/${room}/admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, officerName })
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: e.message };
    }
  },

  async updateReportStatus(id, { status, note, officer }) {
    try {
      const res = await fetch(`${API_BASE}/admin/reports/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, note, officer })
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: e.message };
    }
  },

  async syncBiznetManual() {
    try {
      const res = await fetch(`${API_BASE}/admin/sync`, {
        method: 'POST'
      });
      return await res.json();
    } catch (e) {
      return { success: false, message: e.message };
    }
  }
};
