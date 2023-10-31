/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
      "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4936D2",
        secondary: "#1D212D",
        background: "#181824",
        text: "#FFFFFF",
      },
    },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      }
  },
  plugins: [
      require("flowbite/plugin")({
        charts: true,
      })
  ],
};
