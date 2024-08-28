/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        redMid: "#f56464",
        accentblue: "#3273f5",
        blueLight: "##d2e6fa",
        blueMid: "#5596f5",
        secondary: "#ebf0f5",
      },
    },
  },
  plugins: [],
};
