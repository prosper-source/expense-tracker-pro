/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        primary: {
          DEFAULT: '#BD00FF',
          glow: '#D600FF',
        },
        secondary: {
          DEFAULT: '#00D1FF',
          glow: '#00F0FF',
        },
        accent: '#FF00E5',
        surface: {
          DEFAULT: '#121212',
          light: '#1A1A1A',
          glass: 'rgba(255, 255, 255, 0.05)',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(189, 0, 255, 0.2), 0 0 10px rgba(189, 0, 255, 0.2)' },
          '100%': { boxShadow: '0 0 10px rgba(189, 0, 255, 0.5), 0 0 20px rgba(189, 0, 255, 0.3)' },
        }
      }
    },
  },
  plugins: [],
}
