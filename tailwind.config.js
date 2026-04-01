/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        card: 'var(--card)',
        textMain: 'var(--text-main)',
        textMuted: 'var(--text-muted)',
        borderBase: 'var(--border-base)',
      }
    },
  },
  plugins: [],
}
