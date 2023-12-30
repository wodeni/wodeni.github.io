/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#C559F4",
      // primary: "#2C1EF1",
      icon: "#999",
      icontext: "#1E1E1E",
    },
  },
  plugins: [],
  fontFamily: {
    fontFamily: {
      sans: ['"Open Sans"'],
    },
  },
};
