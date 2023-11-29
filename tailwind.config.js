/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "rgb(46, 3, 87)",
        white: "rgb(241, 238, 238)",
        red: "rgb(255, 15, 15)",
      }
    },
  },
  plugins: [],
}

