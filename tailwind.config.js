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
          400: "#847ecc",
          500: "#7872B8",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
