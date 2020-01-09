const isProduction = process.env.NODE_ENV === 'production';

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Document Sign',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'},
      {hid: 'description', name: 'description', content: 'Document Sign'}
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
    proofChainId: '8ca31a136b6ecd1c16796fdef401dc471e822730dd112a21e63da3d985634143',
    disableSign: true,

    disablePageHowTo: true,
    disablePageMoreInfo: true,
    disablePageContact: true,

    main_title: process.env.MAIN_TITLE || 'Leg vast. Check, controleer en verifieer',
    main_text: process.env.MAIN_TEXT || 'This is meant as a demo-page for those interested in Blockchain as a technology. It is a real-life Blockchain demo, which allows you to upload, free-of-charge, up to 5 objects at a time.',

    main_card_verify_title: process.env.MAIN_CARD_VERIFY_TITLE || 'Verifiëren',
    main_card_verify_text: process.env.MAIN_CARD_VERIFY_TEXT || 'We just store a unique cryptographic key that represents the digital objects. This guarantees your privacy and confidentiality.',

    verify_title: process.env.VERIFY_TITLE || 'Verify your digital documents',
    verify_text: process.env.VERIFY_TEXT || 'This is meant as a demo-page for those interested in Blockchain as a technology. It is a real-life Blockchain demo, which allows you to upload, free-of-charge, up to 5 objects at a time.',
    verify_sub_title: process.env.VERIFY_SUB_TITLE || 'Process documents',
    verify_sub_text: process.env.VERIFY_SUB_TEXT || 'Use Sphereon as a Gateway to process documents and unstructured data and integrate these with Ethereum, Factom, HyperLedger, MultiCoin, VeChain, etc, to create immutable and independent verifiable records of transactions and Proof of Authenticity of documents, emails and other information objects.\n',
    verify_card_title: process.env.VERIFY_CARD_TITLE || 'Verifiëren',
    verify_card_text: process.env.VERIFY_CARD_TEXT || 'We just store a unique cryptographic digital key that represents the digital objects. It is important to understand that the files themselves are not stored in the Blockchain or any of our systems for that matter.',

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
