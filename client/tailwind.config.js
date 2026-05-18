/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#090d16',
        surface: '#0f172a',
        primary: '#2563eb',     // Elegant Engineering Tech Blue
        secondary: '#64748b',   // Classy Slate Gray
        accent: '#0d9488',      // Professional Teal
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 10px rgba(37, 99, 235, 0.15)',
        'glow-slate': '0 0 10px rgba(100, 116, 139, 0.15)',
        'glow-teal': '0 0 10px rgba(13, 148, 136, 0.15)',
      }
    },
  },
  plugins: [],
}
