/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      colors: {
        'h_white': '#1a202c',
        'hoverInlineTool': '#f3f3f3',
        'CornflowerBlue': '#6488ea',
        'darkMode': '#1a202c',
        'darkModeHover': '#262e3c',
      },
    },
  },
  plugins: [],
}
