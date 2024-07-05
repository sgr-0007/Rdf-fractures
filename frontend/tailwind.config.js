/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      colors: {
        gradientStart: '#679CF6',
        gradientEnd: '#4072EE',
      },
  },
  },
  plugins: [require("daisyui")],
}

