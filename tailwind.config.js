/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Ubuntu", "sans-serif"],
        body: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          main: "#F85339",
          dark: "#d5381f",
          light: "#ef9c8f",
        },
        secondary: {
          main: "red",
          light: "#00B9BE",
          dark: "",
        },
        background: {
          main: "#E3E3E3",
          light: "#F2F1ED",
          dark: "",
        },
      },
    },
  },
  plugins: [],
};
