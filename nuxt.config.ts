import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
    app: {
      head: {
        htmlAttrs: { lang: "en" },
        title: 'Nuxt Vue-Dapp',
        meta: [
          { hid: 'description', name: 'description', content: 'Nuxt Vue-Dapp' },
          { name: 'author', content: 'WeFundz' },
          { hid: 'robots', name: 'robots', content: 'index, follow' },
          { name: 'geo.placename', content: 'Paris' },
          { name: 'language', content: 'fr' },
          { name: 'keywords', content: 'Nuxt Vue-Dapp' },
          { property: 'og:image', content: '' },
          { name: 'twitter:image', content: '' },
        ],
      },
    },
    naiveui: {
      colorModePreference: 'light',
    },
    modules: [
      "@bg-dev/nuxt-naiveui",
      '@nuxtjs/google-fonts',
      '@nuxtjs/i18n',
    ],
    css: [
    "@/assets/main.scss",
    ],
    plugins: [
      '~/plugins/i18n.ts',
      '~/plugins/vue-dapp.js',
    ],
    buildModules: [
      'nuxt-naiveui',
    ],
    build: {
        transpile: [
        ],
      },
      googleFonts: {
        families: {
          'Radio+Canada': {
            wght: [100, 400, 500, 600, 700, 800],
            ital: [100]
          },
        }
      },
    vite: {
      plugins: [nodePolyfills()],
      css: {
        preprocessorOptions: {
          scss: {
          },
        },
      },
    },
  });
