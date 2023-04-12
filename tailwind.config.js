/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        gunmetal: {
          300: "#3E4147",
          400: "#2B2D32",
        },
        lavander: {
          400: "#7a71e0",
          500: "#6D65CA",
          disabled: "#7a71e07d",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
