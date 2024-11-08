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
          main: "#BB877A",
          dark: "#9c685c",
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
