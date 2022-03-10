export default {
  publicRuntimeConfig: {},

  privateRuntimeConfig: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGIN_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
  },

  generate: {
    fallback: true
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Comeback - Track every next album, single, EP releases.',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Find your favorite artists and track all their comeback in one place.' },
      { property: "og:site_name", content: "Pierrick's Portfolio - Zokiasu" },
      { hid: "og:type", property: "og:type", content: "website" },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://come-back.netlify.app/",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "Comeback - Track every next album, single, EP releases.",
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Find your favorite artists and track all their comeback in one place.",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://i.ibb.co/JkfZXwk/Comeback-Logo.png",
      },
      { property: "og:image:width", content: "740" },
      { property: "og:image:height", content: "300" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  target: 'static',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  ssr: false,

  loadingIndicator: {
    name: 'circle',
    color: 'white',
    background: '#1F1D1D'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/inject.js',
    '~/plugins/vtlw.js',
    { src: '~/plugins/v-calendar.js', ssr: false },
    { src: "~/plugins/infiniteloading", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  eslint: {
    fix: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/toast',
    '@nuxtjs/axios',
    ['@nuxtjs/pwa',
      {
        // disable the modules you don't need
        meta: false,
        icon: false,
        // if you omit a module key form configuration sensible defaults will be applied
        // manifest: false,

        workbox: {
          importScripts: [
            '/firebase-auth-sw.js'
          ],
          // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
          // only set this true for testing and remember to always clear your browser cache in development
          dev: process.env.NODE_ENV === 'development',
        }
      }
    ],
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGIN_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
          measurementId: process.env.FIREBASE_MEASUREMENT_ID,
        },
        services: {
          auth: {
            persistence: 'local', // default
            initialize: {
              /*onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',*/
              onAuthStateChangedAction: 'onAuthStateChangedAction',
              subscribeManually: false
            },
            ssr: true, // default
          },
          firestore: true,
          functions: {
            location: 'us-central1',
            emulatorPort: 5001,
            emulatorHost: 'http://localhost',
          },
          storage: true,
          database: true,
          messaging: true,
          performance: true,
          analytics: true,
          remoteConfig: true
        }
      }
    ]
  ],

  axios: [],

  toast: {
    position: 'top-right',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }]
      ],
    },
  },
}
