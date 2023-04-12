// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image-edge",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "nuxt-swiper",
  ],
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  css: ["@/assets/css/reset.css", "@/assets/css/main.css"],

  googleFonts: {
    families: {
      Inter: [400, 700],
    },
  },

  runtimeConfig: {
    public: {
      apiPhProvinces: process.env.API_PH_PROVINCES,
      apiPhCity: process.env.API_PH_CITY,
      apiBarangay: process.env.API_PH_BARANGAY,
    },
  },
});
