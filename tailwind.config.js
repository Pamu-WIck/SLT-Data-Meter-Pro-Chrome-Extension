/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary : "#4936D2",
        secondary : "#1D212D",
        background : "#181824",
        text : "#FFFFFF",
      }
    },
  },
  plugins: [],
};
