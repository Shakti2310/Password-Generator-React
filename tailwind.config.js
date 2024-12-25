/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      spacing: {
        128: "32rem",
      },
      colors: {
        "lite-purple": "#785987",
        "dark-purple": "#541F64",
        "btn-color": "#ce5fff",
        "board-blue": "#0d0a31",
        "board-input": "#201d41",
        "board-text": "#536185",
      },
    },
    fontFamily: {
      poppins: ["Poppins"],
    },
  },
  plugins: [],
};
