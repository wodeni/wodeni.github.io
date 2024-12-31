const plugin = require("tailwindcss/plugin");

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
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        // Base styles for .note-content wrapper (optional)
        ".note-content": {
          // Nested h1
          h1: {
            "@apply text-3xl font-bold mt-0 mb-4": {},
          },
          // Nested h2
          h2: {
            "@apply text-2xl font-semibold mt-8 mb-3": {},
          },
          // Nested h3
          h3: {
            "@apply text-xl font-semibold mt-6 mb-2": {},
          },
          // Nested h4
          h4: {
            "@apply text-lg font-semibold mt-4 mb-2": {},
          },
          // Nested a
          a: {
            "@apply text-primary hover:opacity-70 ease-in-out duration-100": {},
          },
          // Nested a.new
          "a.new": {
            "@apply text-gray-500 dark:text-gray-400 no-underline pointer-events-none":
              {},
          },
          // Nested p
          p: {
            "@apply mt-0 mb-4 text-wrap break-words": {},
          },
          // Nested blockquote
          blockquote: {
            "@apply border-l-4 border-blue-500 pl-4 italic": {},
          },
          ul: {
            "@apply list-disc ml-6 my-4": {},
          },
          ol: {
            "@apply list-decimal ml-6 my-4": {},
          },
          img: {
            "@apply rounded": {},
          },
          blockquote: {
            "@apply border-l-4 border-gray-500 dark:border-gray-400 pl-4 italic":
              {},
          },
          // table formatting
          table: {
            "@apply border-collapse border dark:border-gray-300 text-left text-sm my-8":
              {},
          },
          thead: {
            "@apply bg-gray-100 dark:bg-zinc-700 uppercase font-medium": {},
          },
          th: {
            "@apply border border-gray-300 px-4 py-2": {},
          },
          td: {
            "@apply border border-gray-300 px-4 py-2": {},
          },
          "tbody tr:nth-child(even)": {
            "@apply bg-zinc-50 dark:bg-zinc-700": {},
          },
          iframe: {
            "@apply max-w-full rounded py-4": {},
          },
          // If you wanted code/pre fences, you could add them too:
          // "pre, code": {
          //   "@apply rounded bg-gray-100 text-sm": {},
          // },
        },
      });
    }),
  ],
  fontFamily: {
    fontFamily: {
      sans: ['"Open Sans"'],
    },
  },
};
