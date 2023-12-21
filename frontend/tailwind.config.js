/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      'logo-blue': '#0d7ff1',
      'logo-blue-hover': '#2c8dee',
      'logo-red': '#ca391e',
      'logo-red-hover': '#f05032',
      'logo-purple': '#332294',
      'logo-purple-hover': '#453891', 
      'gray-400': '#9ca3af',
      'gray-500': '#64748b',
      'gray-800': '#1f2937',
      'gray-900': '#111827',
      'green-100': '#dcfce7',
      'green-600': '#16a34a',
      'green-400': '#4ade80',
      'red-500': '#ef4444',
      'red-300': '#fda4af',
      'white': '#fff',
      'black': '#000000',
      'transparent': 'transparent',
    },
    extend: {},
  },
  plugins: [],
}

