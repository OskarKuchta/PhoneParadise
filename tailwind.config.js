/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xl: "1600px"
      },
      fontFamily: {
        'trocchi': ['Trocchi', 'serif'],
      },
      colors: {
        purple: "rgb(46, 3, 87)",
        red: "rgb(255, 15, 15)",
        hoverPurple: "rgb(110, 3, 117)",
        contactHover: "rgb(174, 1, 255)",
        lightGray: "rgb(241, 238, 238)",
      }
    },
  },
  plugins: [],
}

