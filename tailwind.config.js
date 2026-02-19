/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#77B103",
        secondary: "#88E8E5",
        accent: "#0A9396",
      },
    },
  },
  plugins: [],
};
