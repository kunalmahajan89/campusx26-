/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0f',
        surface: '#111827',
        primary: '#3b82f6',     // Accent Blue
        secondary: '#a855f7',   // Neon Purple
        accent: '#10b981',      // Neon Green
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 15px rgba(59, 130, 246, 0.4)',
        'glow-purple': '0 0 15px rgba(168, 85, 247, 0.4)',
        'glow-green': '0 0 15px rgba(16, 185, 129, 0.4)',
      }
    },
  },
  plugins: [],
}
