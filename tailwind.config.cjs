/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        pubg: {
          gold: '#F2A900',
          dark: '#1A1A1A',
          blue: '#1E3A8A',
          red: '#991B1B'
        }
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}