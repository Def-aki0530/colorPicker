export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'AnimeColorDecision',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'AnimeColorDecision はアニメ塗りにおける色の決定を手助けするサイトです．特定のイラストレーターのイラストから色の情報を学習させ，色彩感性を模倣して色を決定します．' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'AnimeColorDecision' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'animecolordecision.netlify.app' },
      { hid: 'og:title', property: 'og:title', content: 'AnimeColorDecision' },
      { hid: 'og:description', property: 'og:description', content: 'AnimeColorDecision はアニメ塗りにおける色の決定を手助けするサイトです．特定のイラストレーターのイラストから色の情報を学習させ，色彩感性を模倣して色を決定します．' },
      { hid: 'og:image', property: 'og:image', content: 'https://animecolordecision.netlify.app/AnimeColorDecision.png' },
      { name: 'twitter:card', content: 'summary' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      { 
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap" 
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Noto+Sans+JP:400&display=swap"
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/reset.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    
  ],

  styleResources: {
    scss: ["~/assets/scss/variable.scss"]
  },
  
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
