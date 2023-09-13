/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        public: {
          100: '#f9fafb', /* secondary gray/white */
          200: '#00beac', /* primary green */
          300: '#009989', /* highlight green */
          400: '#0b2033', /* alternative dark */
        },
        primary: '#00beac',
        secondary: '#f9fafb',
        alternative: '#0b2033',
        highlight: '#009989',
        qbank: {
          bg: {
            100: '#ffffff',
            200: '#f3f3f4',
            300: '#2296f3',
            400: '#2f4051',
            500: '#27384a',
          },
          text: {
            100: '#ffffff',
            200: '#a7b1c2',
            300: '#c4c4c5',
            400: '#2296f3',
            500: '#212529'
          }
        }
      },
    },
  },
  plugins: [],
}