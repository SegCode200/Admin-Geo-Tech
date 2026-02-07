/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        sans: ["Urbanist", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: '#2563EB',
        primaryDark: '#1366D9',
        accent: '#7C3AED',
        muted: '#F3F6F9',
        textSmall: '#858D9D',
        textMedium: '#383E49',
        cardBg: '#FFFFFF'
      },
      boxShadow: {
        'card': '0 6px 18px rgba(38, 65, 142, 0.08)'
      },
      borderRadius: {
        xl: '12px'
      }
    },
  },
  plugins: [],
}