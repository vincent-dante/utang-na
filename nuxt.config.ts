// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image-edge",
    "nuxt-icon",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
  ],
  css: ["@/assets/css/reset.css", "@/assets/css/main.css"],

  googleFonts: {
    families: {
      Inter: [400, 700],
    },
  },
});
