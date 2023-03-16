/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        exo2: '"Exo 2", sans-serif',
      },
      colors: {
        primary: "#ffffff",
        secondary: "#efefef",
        accnet: "#000000",
        background: "#F1F8FF",
      },
      textColor: {
        primary: "#0b0b0b",
        secondary: "#545454",
      },
      gridTemplateColumns: {
        main: `minmax(auto, 1200px)`,
        nav: `1fr max-content 1fr`,
      },
    },
  },
  plugins: [],
};
