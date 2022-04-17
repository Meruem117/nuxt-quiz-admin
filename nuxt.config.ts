import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // meta
  meta: {
    title: "Nuxt Quiz Admin",
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "A quiz system",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // css
  css: ["~/assets/scss/index.scss"],

  // build
  build: {},

  // build modules
  buildModules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    "@pinia/nuxt",
    "@nuxtjs/svg",
  ],

  // auto import components
  components: true,

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  unocss: {
    uno: true,
    attributify: true,
    preflight: false,
    icons: {
      scale: 1.2,
    },
    shortcuts: [
      ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ],
  },
});
