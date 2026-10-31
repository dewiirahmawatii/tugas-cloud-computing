import React, { useState, useEffect } from 'react';
import DeviceFrame from './components/common/DeviceFrame';
import BottomNav from './components/common/BottomNav';
import SuccessModal from './components/common/SuccessModal';

// Screens
import SplashScreen from './components/screens/SplashScreen';
import OnboardingScreen from './components/screens/OnboardingScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import HomeScreen from './components/screens/HomeScreen';
import RiwayatScreen from './components/screens/RiwayatScreen';
import ProfilScreen from './components/screens/ProfilScreen';
import EditProfilScreen from './components/screens/EditProfilScreen';
import GantiPasswordScreen from './components/screens/GantiPasswordScreen';
import KontakDaruratScreen from './components/screens/KontakDaruratScreen';
import NomorDaruratScreen from './components/screens/NomorDaruratScreen';
import LaporDaruratScreen from './components/screens/LaporDaruratScreen';
import LiveSosTrackingScreen from './components/screens/LiveSosTrackingScreen';
import KonselorListScreen from './components/screens/KonselorListScreen';
import ChatRoomScreen from './components/screens/ChatRoomScreen';
import VoiceCallScreen from './components/screens/VoiceCallScreen';
import InformasiListScreen from './components/screens/InformasiListScreen';
import InformasiDetailScreen from './components/screens/InformasiDetailScreen';
import KonsultasiScreen from './components/screens/KonsultasiScreen';

import { api } from './services/api';
import { playSosSiren, stopSosSiren, playBeep } from './utils/audio';

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [deviceMode, setDeviceMode] = useState('iphone');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // App Data State
  const [user, setUser] = useState(null);
  const [activeSosReport, setActiveSosReport] = useState(null);
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Load Initial User on mount
  useEffect(() => {
    api.getMe().then((res) => {
      if (res && res.user) {
        setUser(res.user);
      }
    });
  }, []);

  // Screen Navigator
  const navigateTo = (screenId) => {
    if (soundEnabled) playBeep(900, 0.05);

    if (currentScreen === 'live-sos' && screenId !== 'live-sos') {
      stopSosSiren();
    }

    if (['home', 'riwayat', 'profil', 'pengaturan-akun', 'ganti-sandi', 'privasi-keamanan'].includes(screenId)) {
      if (['profil', 'pengaturan-akun', 'ganti-sandi', 'privasi-keamanan'].includes(screenId)) {
        setActiveTab('profil');
      } else {
        setActiveTab(screenId);
      }
    }
    setCurrentScreen(screenId);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentScreen(tabId);
  };

  // SOS Trigger Handler
  const handleTriggerSos = (sosData) => {
    if (soundEnabled) {
      playSosSiren();
    }
    api.triggerSos(sosData).then((res) => {
      if (res && res.report) {
        setActiveSosReport(res.report);
      } else {
        setActiveSosReport({
          id: "SOS-" + Math.floor(100000 + Math.random() * 900000),
          title: "Sinyal Darurat " + (sosData.type || "SOS"),
          location: sosData.location || "Kampus UTDI - Gedung Utama",
          status: "Petugas Menuju Lokasi",
          etaMinutes: 3,
          officer: "Bripka Bambang & Danru Security UTDI"
        });
      }
      setCurrentScreen('live-sos');
    });
  };

  const handleCancelSos = () => {
    stopSosSiren();
    if (activeSosReport?.id) {
      api.cancelSos(activeSosReport.id);
    }
    setActiveSosReport(null);
    setCurrentScreen('home');
  };

  const handleResolveSos = () => {
    stopSosSiren();
    setSuccessMessage("Laporan sinyal darurat telah diselesaikan oleh Satgas & petugas pos keamanan UTDI.");
    setActiveSosReport(null);
    setCurrentScreen('riwayat');
  };

  const handleStartCall = (counselor) => {
    setSelectedCounselor(counselor);
    setCurrentScreen('voice-call');
  };

  const handleEndCall = () => {
    setCurrentScreen('chat-room');
  };

  // Check if current screen shows bottom nav bar
  const showBottomNav = [
    'home', 
    'riwayat', 
    'profil', 
    'pengaturan-akun', 
    'ganti-sandi', 
    'privasi-keamanan',
    'konsultasi'
  ].includes(currentScreen);

  return (
    <DeviceFrame
      currentScreen={currentScreen}
      onNavigate={navigateTo}
      soundEnabled={soundEnabled}
      onToggleSound={() => {
        if (soundEnabled) stopSosSiren();
        setSoundEnabled(!soundEnabled);
      }}
      deviceMode={deviceMode}
      onSetDeviceMode={setDeviceMode}
    >
      {/* Dynamic Screen View */}
      <div className="flex-1 flex flex-col min-h-full bg-[#1E3866]">
        
        {/* Screen 1: On Boarding 1 (Logo UTDI) */}
        {currentScreen === 'splash' && (
          <SplashScreen
            onStart={() => navigateTo('onboarding2')}
          />
        )}

        {/* Screen 2: On Boarding 2 (Teks SATGAS PPKPS) */}
        {currentScreen === 'onboarding2' && (
          <OnboardingScreen
            initialStep={2}
            onNextStep={() => navigateTo('onboarding3')}
          />
        )}

        {/* Screen 3: On Boarding 3 (Logo Satgas PPKS + Teks SATGAS PPKPS) */}
        {currentScreen === 'onboarding3' && (
          <OnboardingScreen
            initialStep={3}
            onComplete={() => navigateTo('login')}
          />
        )}

        {/* Screen 4: Login ("Masuk") */}
        {currentScreen === 'login' && (
          <LoginScreen
            onLoginSuccess={() => navigateTo('home')}
            onGoToRegister={() => navigateTo('register')}
          />
        )}

        {/* Screen 5: Register ("Buat Akun") */}
        {currentScreen === 'register' && (
          <RegisterScreen
            onRegisterSuccess={() => {
              setSuccessMessage("Akun mahasiswa berhasil didaftarkan! Silakan masuk.");
              navigateTo('login');
            }}
            onBackToLogin={() => navigateTo('login')}
          />
        )}

        {/* Screen 6: Home */}
        {currentScreen === 'home' && (
          <HomeScreen
            user={user}
            onNavigate={navigateTo}
            onTriggerSos={handleTriggerSos}
            soundEnabled={soundEnabled}
          />
        )}

        {/* Screen 7: Riwayat Pelaporan */}
        {currentScreen === 'riwayat' && (
          <RiwayatScreen
            onBack={() => navigateTo('home')}
            onSelectReport={(report) => {
              setActiveSosReport(report);
            }}
          />
        )}

        {/* Screen 8: Profil (Dewi - Main) */}
        {currentScreen === 'profil' && (
          <ProfilScreen
            user={user}
            initialView="main"
            onLogout={() => {
              stopSosSiren();
              navigateTo('login');
            }}
          />
        )}

        {/* Screen 9: Pengaturan Akun */}
        {currentScreen === 'pengaturan-akun' && (
          <ProfilScreen
            user={user}
            initialView="pengaturan"
            onLogout={() => {
              stopSosSiren();
              navigateTo('login');
            }}
          />
        )}

        {/* Screen 10: Ubah Kata Sandi (ganti sandi) */}
        {currentScreen === 'ganti-sandi' && (
          <ProfilScreen
            user={user}
            initialView="ganti-sandi"
            onLogout={() => {
              stopSosSiren();
              navigateTo('login');
            }}
          />
        )}

        {/* Screen 11: Privasi dan Keamanan */}
        {currentScreen === 'privasi-keamanan' && (
          <ProfilScreen
            user={user}
            initialView="privasi"
            onLogout={() => {
              stopSosSiren();
              navigateTo('login');
            }}
          />
        )}

        {/* Legacy Profile Sub-screens */}
        {currentScreen === 'edit-profil' && (
          <EditProfilScreen
            user={user}
            onBack={() => navigateTo('profil')}
            onSaveSuccess={(msg) => {
              setSuccessMessage(msg);
              navigateTo('profil');
            }}
          />
        )}

        {currentScreen === 'ganti-password' && (
          <GantiPasswordScreen
            onBack={() => navigateTo('profil')}
            onSaveSuccess={(msg) => {
              setSuccessMessage(msg);
              navigateTo('profil');
            }}
          />
        )}

        {currentScreen === 'kontak-darurat' && (
          <KontakDaruratScreen
            user={user}
            onBack={() => navigateTo('profil')}
            onSaveSuccess={(msg) => {
              setSuccessMessage(msg);
            }}
          />
        )}

        {/* Screen 12: Konsultasi / Curhat (Chat Bot) */}
        {currentScreen === 'konsultasi' && (
          <KonsultasiScreen
            onBack={() => navigateTo('home')}
            onStartVoiceCall={(satgas) => {
              setSelectedCounselor({
                name: satgas.name,
                title: satgas.role,
                avatar: '/assets/satgas-ppks.jpg'
              });
              navigateTo('voice-call');
            }}
          />
        )}

        {/* Features Sub-screens */}
        {currentScreen === 'nomor-darurat' && (
          <NomorDaruratScreen
            onBack={() => navigateTo('home')}
          />
        )}

        {currentScreen === 'lapor-darurat' && (
          <LaporDaruratScreen
            onBack={() => navigateTo('home')}
            onSubmitSos={handleTriggerSos}
          />
        )}

        {currentScreen === 'live-sos' && (
          <LiveSosTrackingScreen
            report={activeSosReport}
            onCancel={handleCancelSos}
            onResolve={handleResolveSos}
          />
        )}

        {currentScreen === 'konselor-list' && (
          <KonselorListScreen
            onBack={() => navigateTo('home')}
            onSelectCounselor={(c) => {
              setSelectedCounselor(c);
              navigateTo('chat-room');
            }}
            onStartCall={handleStartCall}
          />
        )}

        {currentScreen === 'chat-room' && (
          <ChatRoomScreen
            counselor={selectedCounselor}
            onBack={() => navigateTo('konselor-list')}
            onStartCall={handleStartCall}
          />
        )}

        {currentScreen === 'voice-call' && (
          <VoiceCallScreen
            counselor={selectedCounselor}
            onEndCall={handleEndCall}
            soundEnabled={soundEnabled}
          />
        )}

        {currentScreen === 'informasi-list' && (
          <InformasiListScreen
            onBack={() => navigateTo('home')}
            onSelectArticle={(art) => {
              setSelectedArticle(art);
              navigateTo('informasi-detail');
            }}
          />
        )}

        {currentScreen === 'informasi-detail' && (
          <InformasiDetailScreen
            article={selectedArticle}
            onBack={() => navigateTo('informasi-list')}
            onOpenEmergency={() => navigateTo('lapor-darurat')}
          />
        )}
      </div>

      {/* Main Bottom Navigation Bar */}
      {showBottomNav && (
        <BottomNav
          activeTab={activeTab}
          onSelectTab={handleTabChange}
        />
      )}

      {/* Confirmation & Success Modal */}
      <SuccessModal
        message={successMessage}
        onClose={() => setSuccessMessage(null)}
      />
    </DeviceFrame>
  );
}
