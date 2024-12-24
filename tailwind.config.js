/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scale: {
        400: "40",
      },
      colors: {
        primary: "#C559F4",
        // primary: "#2C1EF1",
        icon: "#999",
        "icon-dark": "#bbb",
        icontext: "#1E1E1E",
        "icontext-dark": "#fff",
      },
    },
  },
  plugins: [],
  fontFamily: {
    fontFamily: {
      sans: ['"Open Sans"'],
    },
  },
};
