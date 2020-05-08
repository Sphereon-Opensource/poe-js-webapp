const isProduction = process.env.NODE_ENV === 'production';

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Verifiable Credentials',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'},
      {hid: 'description', name: 'description', content: 'Verifiable Credentials'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ],
    scripts: []
  },

  /*
  ** Configure environment variables
   */
  env: {
    vcApiBaseURL: process.env.VC_API_BASE_URL,
    disableSign: true,

    disablePageHowTo: true,
    disablePageMoreInfo: true,
    disablePageContact: true,

    main_title: process.env.MAIN_TITLE || 'Factom Verifiable Credentials',
    main_text: process.env.MAIN_TEXT || 'In this portal you can check the validity of Verifiable Credentials.',

    main_card_verify_title: process.env.MAIN_CARD_VERIFY_TITLE || 'Verify',
    main_card_verify_text: process.env.MAIN_CARD_VERIFY_TEXT || 'The credential files you upload here are not being stored on any permanent storage device. When the credential file validation is successful, its authenticity is guaranteed.',

    verify_title: process.env.VERIFY_TITLE || 'Verifiable Credentials Verification Page',
    verify_text: process.env.VERIFY_TEXT || 'Check here if the credentials & claims that are made in your file are authentic.',
    verify_sub_title: process.env.VERIFY_SUB_TITLE || ' ',
    verify_sub_text: process.env.VERIFY_SUB_TEXT || '',
    verify_card_title: process.env.VERIFY_CARD_TITLE || 'Verify',
    verify_card_text: process.env.VERIFY_CARD_TEXT || 'The credential files you upload here are not being stored on any permanent storage device. When the credential file validation is successful, its authenticity is guaranteed. ',

    theme: 'blockchange',
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3B8070'},

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
    '~/plugins/vue-moment',
    {src: '~/plugins/vue-click-outside', ssr: false}
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
    // '@nuxtjs/google-analytics',
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
      ignoreErrors: ['ReportingObserver']
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
    transpile: [/^vuetify/],
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
    extend(config, {isClient, isDev}) {
      if (isClient && isDev) {
        config.devtool = 'source-map';
      }
    }
  }
}
