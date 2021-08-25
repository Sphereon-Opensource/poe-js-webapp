const isProduction = process.env.NODE_ENV === 'production';

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Document Sign',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Document Sign' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    scripts: []
  },

  /*
  ** Configure environment variables
   */
  env: {
    API_PROXY_SUBDOMAIN: process.env.VUE_APP_API_PROXY_SUBDOMAIN || "bcproof-api",
    BLOCKCHAIN_PROOF_CONFIG_NAME: process.env.VUE_APP_BLOCKCHAIN_PROOF_CONFIG_NAME || "multichain"
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/components',
    '~/plugins/filters',
    { src: '~/plugins/vue-click-outside', ssr: false }
  ],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/eslint-module'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    '@nuxtjs/sentry',
    '@nuxtjs/google-analytics',
    '@nuxtjs/sitemap'
  ],

  /*
  ** Router middleware
  */
  router: {
    trailingSlash: false,
    middleware: []
  },

  /*
  ** Server middleware configuration
  */
  serverMiddleware: [
    ...isProduction ? [] : [
      '~/middleware/logger.js'
    ]
  ],

  server: {
    host: '0.0.0.0'
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    browserBaseURL: '/'
  },

  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    optionsPath: './vuetify.options.js'
  },

  /*
  ** Sentry configuration
   */
  sentry: {
    dsn: process.env.SENTRY_DSN,
    config: {
      ignoreErrors: [ 'ReportingObserver' ]
    }
  },

  /*
  ** Google Analytics configuration
   */
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID,
    dev: false
  },

  /*
  ** Sitemap configuration
  */
  sitemap: {
    defaults: {
      changefreq: 'daily',
      lastmod: new Date(),
      priority: 1.0
    },

    gzip: isProduction,

    exclude: [
      '**/embed'
    ]
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: [ /^vuetify/ ],
    extractCSS: isProduction,
    hardSource: process.env.HARDSOURCE,
    templates: [
      {
        src: './templates/robots.txt',
        dst: '../static/robots.txt'
      }
    ],
    /*
    ** You can extend webpack config here
    */
    extend (config, { isClient, isDev }) {
      if (isClient && isDev) {
        config.devtool = 'source-map';
      }
    }
  }
}
