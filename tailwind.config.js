/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        'brand-black': '#000000',
        'brand-dark': '#1e1e1e',
        'brand-medium': '#2d2d2d',
        'brand-light': '#3d3d3d',
        'brand-red': '#ff0000',
        'brand-accent': '#ff5252',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
