/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-cyan": {
          light: "#57ceee",
          DEFAULT: "#44c8ec",
          dark: "#3db4d4",
        },
        "my-blue": {
          light: "#8298f9",
          DEFAULT: "#748cf8",
          dark: "#687edf",
        },
        "my-navy": {
          light: "#247186",
          DEFAULT: "#0c6178",
          dark: "#0b576c",
        },
        "my-brown": {
          light: "#aa8f76",
          DEFAULT: "#a18267",
          dark: "#91755d",
        },
        "my-gray": {
          light: "#bbc8d3",
          DEFAULT: "#b3c2ce",
          dark: "#a1afb9",
        },
        "my-dark": {
          light: "#5d5b5e",
          DEFAULT: "#4b494c",
          dark: "#444244",
          "very-dark": "#2d2c2e",
          "very-very-dark": "#1e1d1e",
        },
      },
      fontFamily: {
        roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
        josefins: ["Josefin Sans", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
