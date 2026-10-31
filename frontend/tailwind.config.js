/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        utdi: {
          bg: '#1E3866',
          dark: '#1E3866',
          navy: '#1E3866',
          card: '#182f57',
          cardHover: '#234177',
          border: '#2c4e8a',
          gold: '#F5A623',
          yellow: '#F5A623',
          sos: '#ef4444',
          sosHover: '#dc2626',
        }
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'radar': 'radar 3s linear infinite',
      },
      keyframes: {
        radar: {
          '0%': { transform: 'scale(0.8)', opacity: '0.8' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
