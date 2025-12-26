
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./constants.tsx",
    "./App.tsx"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5b13ec",
        background: "#0a090d",
        card: "#121118",
        border: "#1a1820",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
