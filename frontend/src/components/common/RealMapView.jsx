import React, { useState } from 'react';
import { 
  MapPin, Navigation, Layers, Compass, Plus, Minus, 
  Shield, Crosshair, ExternalLink, School, AlertCircle
} from 'lucide-react';

export default function RealMapView({ 
  height = 'h-52', 
  showPatrolRoute = false,
  carProgress = 20,
  emergencyLocation = 'Kampus UTDI - Lab Terpadu Lt. 2',
  officerName = 'Patroli Security UTDI',
  onRecenter
}) {
  const [mapMode, setMapMode] = useState('street'); // 'street' | 'satellite' | 'hybrid'
  const [zoomLevel, setZoomLevel] = useState(17);
  const [isCentered, setIsCentered] = useState(true);

  // UTDI Coordinates: Jl. Raya Janti No. 143, Banguntapan, Bantul
  const utdiCoords = { lat: -7.7942, lng: 110.4079 };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 19));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 14));
  };

  const handleRecenter = () => {
    setIsCentered(true);
    if (onRecenter) onRecenter();
  };

  // OpenStreetMap embed URL centered precisely on UTDI Campus Yogyakarta
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=110.4042%2C-7.7968%2C110.4116%2C-7.7915&layer=mapnik&marker=-7.7942%2C110.4079`;

  return (
    <div className={`relative w-full ${height} overflow-hidden border-b border-blue-900/60 shadow-xl select-none font-sans bg-[#e5e3df]`}>
      
      {/* ======================================================== */}
      {/* 1. REAL OPENSTREETMAP TILE LAYER (ONLINE EMBED)          */}
      {/* ======================================================== */}
      {mapMode === 'street' ? (
        <iframe
          title="Peta Kampus UTDI"
          src={osmEmbedUrl}
          className="absolute inset-0 w-full h-full border-0 pointer-events-auto filter saturate-[1.1] contrast-[1.05]"
          loading="lazy"
        />
      ) : (
        /* Satellite View Mode */
        <div className="absolute inset-0 w-full h-full bg-[#12231b] overflow-hidden">
          {/* Satellite terrain texture & satellite aerial roads */}
          <div className="absolute inset-0 opacity-80 bg-[radial-gradient(#2d5a3f_1px,transparent_1px)] [background-size:12px_12px]"></div>
          
          {/* Satellite Road Network Grid */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            {/* Jl. Raya Janti Arterial */}
            <line x1="80" y1="0" x2="160" y2="400" stroke="#fcd34d" strokeWidth="8" strokeOpacity="0.8" />
            <line x1="80" y1="0" x2="160" y2="400" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="6 6" />
            
            {/* Flyover Janti Ringroad */}
            <line x1="0" y1="120" x2="450" y2="170" stroke="#f59e0b" strokeWidth="12" strokeOpacity="0.7" />
            <line x1="0" y1="120" x2="450" y2="170" stroke="#ffffff" strokeWidth="2" />
            
            {/* Campus Gangways */}
            <line x1="130" y1="200" x2="350" y2="200" stroke="#94a3b8" strokeWidth="6" strokeOpacity="0.6" />
            <line x1="240" y1="130" x2="240" y2="300" stroke="#94a3b8" strokeWidth="5" strokeOpacity="0.6" />
            
            {/* Buildings footprint (Satellite polygon) */}
            <rect x="180" y="70" width="85" height="55" fill="#334155" stroke="#475569" strokeWidth="1" opacity="0.8" />
            <rect x="280" y="75" width="70" height="50" fill="#334155" stroke="#475569" strokeWidth="1" opacity="0.8" />
            <rect x="180" y="215" width="95" height="60" fill="#1e293b" stroke="#334155" strokeWidth="1" opacity="0.8" />
          </svg>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. REALISTIC MAP OVERLAYS: ROADS & LABELS                */}
      {/* ======================================================== */}
      
      {/* Street Name Signs on Map */}
      <div className="absolute top-2 left-2 z-20 pointer-events-none flex flex-col gap-1">
        <div className="bg-white/95 text-slate-900 border border-slate-300 rounded-lg px-2 py-1 shadow-md backdrop-blur-sm flex items-center space-x-1.5 max-w-[220px]">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></div>
          <div>
            <span className="text-[10px] font-black tracking-wide leading-tight block text-slate-900">
              Jl. Raya Janti No. 143
            </span>
            <span className="text-[8px] text-slate-500 block leading-none font-semibold">
              Komp. Kampus UTDI Yogyakarta
            </span>
          </div>
        </div>
      </div>

      {/* Campus Landmark Tags */}
      <div className="absolute top-14 left-16 z-10 pointer-events-none hidden sm:flex items-center space-x-1 bg-blue-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow border border-blue-400/50">
        <School className="w-3 h-3 text-amber-400" />
        <span>Rektorat UTDI</span>
      </div>

      {/* Security Post Pin (Campus Gate) */}
      <div className="absolute top-[35%] left-[24%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center">
        <div className="w-6 h-6 rounded-full bg-blue-700 border-2 border-white flex items-center justify-center text-white shadow-lg">
          <Shield className="w-3.5 h-3.5" />
        </div>
        <span className="text-[8px] font-black bg-blue-950/90 text-white px-1.5 py-0.2 rounded mt-0.5 border border-blue-400/40 shadow">
          Pos Satpam
        </span>
      </div>

      {/* ======================================================== */}
      {/* 3. USER EMERGENCY LOCATION PIN (PULSING RADAR PIN)       */}
      {/* ======================================================== */}
      {!showPatrolRoute ? (
        <div className="absolute top-[52%] left-[62%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center">
          {/* Animated GPS Radar Circles */}
          <div className="relative flex items-center justify-center">
            <span className="w-14 h-14 rounded-full bg-red-500/25 animate-ping absolute"></span>
            <span className="w-9 h-9 rounded-full bg-red-500/35 animate-pulse absolute"></span>
            <div className="w-7 h-7 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-white shadow-xl shadow-red-600/50">
              <MapPin className="w-4 h-4 fill-white text-red-600" />
            </div>
          </div>
          {/* Accurate GPS Tag */}
          <div className="bg-slate-900/95 text-white border border-red-500/60 px-2 py-0.5 rounded-full mt-1 shadow-lg flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-[9px] font-black">Lokasi Anda (Akurat ±3m)</span>
          </div>
        </div>
      ) : (
        /* Live Tracking Route for Patrol Screen */
        <>
          {/* Dynamic Route Polyline SVG */}
          <svg className="absolute inset-0 w-full h-full z-15 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 90 85 Q 150 95, 190 125 T 255 135"
              fill="none"
              stroke="#2563eb"
              strokeWidth="6"
              strokeLinecap="round"
              strokeOpacity="0.8"
            />
            <path
              d="M 90 85 Q 150 95, 190 125 T 255 135"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="animate-pulse"
            />
          </svg>

          {/* Security Patrol Vehicle moving */}
          <div 
            className="absolute transition-all duration-1000 flex flex-col items-center z-25 pointer-events-none"
            style={{
              left: `${24 + (carProgress * 0.44)}%`,
              top: `${35 + (carProgress * 0.22)}%`
            }}
          >
            <div className="w-7 h-7 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-slate-950 shadow-xl animate-bounce">
              <Navigation className="w-4 h-4 fill-slate-950 rotate-45" />
            </div>
            <span className="text-[8px] font-black bg-slate-900 text-amber-300 px-1.5 rounded border border-amber-400/50 shadow">
              {officerName}
            </span>
          </div>

          {/* Victim Target Pin */}
          <div className="absolute top-[58%] left-[68%] -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <span className="w-12 h-12 rounded-full bg-red-500/30 animate-ping absolute"></span>
              <div className="w-7 h-7 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-white shadow-xl">
                <MapPin className="w-4 h-4 fill-white" />
              </div>
            </div>
            <span className="text-[8px] font-black bg-red-600 text-white px-2 py-0.2 rounded-full mt-0.5 shadow">
              Titik Korban
            </span>
          </div>
        </>
      )}

      {/* ======================================================== */}
      {/* 4. REAL MAP UI CONTROLS (ZOOM, LAYERS, COMPASS)          */}
      {/* ======================================================== */}
      <div className="absolute top-2 right-2 z-30 flex flex-col gap-1.5">
        
        {/* Layer Switcher (Peta Jalan vs Satelit) */}
        <button
          type="button"
          onClick={() => setMapMode(mapMode === 'street' ? 'satellite' : 'street')}
          className="bg-white/95 hover:bg-white text-slate-800 p-1.5 rounded-xl shadow-md border border-slate-300 transition active:scale-95 cursor-pointer"
          title={mapMode === 'street' ? "Beralih ke Citra Satelit" : "Beralih ke Peta Jalan"}
        >
          <Layers className="w-4 h-4 text-blue-600" />
        </button>

        {/* Compass Indicator */}
        <div 
          className="w-7 h-7 rounded-xl bg-white/95 border border-slate-300 flex items-center justify-center text-red-600 shadow-md"
          title="Arah Utara"
        >
          <Compass className="w-4 h-4 animate-spin-slow" />
        </div>

        {/* Zoom In Button */}
        <button
          type="button"
          onClick={handleZoomIn}
          className="bg-white/95 hover:bg-white text-slate-800 p-1.5 rounded-xl shadow-md border border-slate-300 transition active:scale-95 cursor-pointer"
          title="Perbesar Peta"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* Zoom Out Button */}
        <button
          type="button"
          onClick={handleZoomOut}
          className="bg-white/95 hover:bg-white text-slate-800 p-1.5 rounded-xl shadow-md border border-slate-300 transition active:scale-95 cursor-pointer"
          title="Perkecil Peta"
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* Recenter GPS Button */}
        <button
          type="button"
          onClick={handleRecenter}
          className="bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-xl shadow-md border border-blue-400 transition active:scale-95 cursor-pointer"
          title="Pusatkan ke Kampus UTDI"
        >
          <Crosshair className="w-4 h-4" />
        </button>

      </div>

      {/* ======================================================== */}
      {/* 5. BOTTOM MAP ATTRIBUTION & ACCURACY STATUS              */}
      {/* ======================================================== */}
      <div className="absolute bottom-1.5 left-2 right-2 z-20 pointer-events-none flex items-center justify-between">
        
        {/* Coordinates Pill */}
        <div className="bg-slate-900/85 backdrop-blur-sm text-[9px] text-blue-200 px-2 py-0.5 rounded-md border border-blue-900/60 font-mono">
          <span>Lat: -7.794200, Lng: 110.407900</span>
        </div>

        {/* Map Source attribution */}
        <div className="bg-white/90 text-[8px] text-slate-600 px-1.5 py-0.2 rounded shadow font-semibold">
          © OpenStreetMap • UTDI
        </div>

      </div>

    </div>
  );
}

