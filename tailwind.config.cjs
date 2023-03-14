/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        exo2: '"Exo 2", sans-serif',
      },
      colors: {
        primary: "white",
        background: "#F1F8FF",
      },
      gridTemplateColumns: {
        main: `minmax(auto, 1200px)`,
        nav: `1fr max-content 1fr`,
      },
    },
  },
  plugins: [],
};
