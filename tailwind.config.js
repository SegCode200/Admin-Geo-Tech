/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        sans: ["Urbanist", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: '#2563EB',
        secondary: '#1366D9',
        textSmall: '#858D9D',
        textMedium: '#383E49',
      }
    },
  },
  plugins: [],
}