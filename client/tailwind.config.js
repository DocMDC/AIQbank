/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00beac',
        secondary: '#f9fafb',
        alternative: '#0b2033',
        highlight: '#009989'
      },
    },
  },
  plugins: [],
}