
export default defineNuxtConfig({

  css: ["vuetify/styles"],
  modules: ["@pinia/nuxt"],

  build: {
    transpile: ["vuetify"],
  },

  // Ensure SSR is enabled
  ssr: false,

  app: {
    head: {
      title: "Manager Pro Dashboard",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'Kerolos Sadek' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
      ],
    },
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  compatibilityDate: '2025-02-23',
});