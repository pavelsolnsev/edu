/* eslint-env node */

const fs = require('fs');
const path = require('path');

function loadDotEnv() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;
  fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach((line) => {
    const t = line.trim();
    if (!t || t.startsWith('#')) return;
    const i = t.indexOf('=');
    if (i === -1) return;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (process.env[k] === undefined) process.env[k] = v;
  });
}
loadDotEnv();

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js

const ESLintPlugin = require('eslint-webpack-plugin');

/* eslint func-names: 0 */
/* eslint global-require: 0 */

const { configure } = require('quasar/wrappers');

module.exports = configure((ctx) => ({
  // https://v2.quasar.dev/quasar-cli-webpack/supporting-ts
  supportTS: false,

  // https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
  preFetch: true,

  // app boot file (/src/boot)
  // --> boot files are part of "main.js"
  // https://v2.quasar.dev/quasar-cli-webpack/boot-files
  boot: ['axios'],

  // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-css
  css: ['app.scss'],

  // https://github.com/quasarframework/quasar/tree/dev/extras
  extras: [
    // 'ionicons-v4',
    // 'mdi-v5',
    // 'fontawesome-v6',
    // 'eva-icons',
    // 'themify',
    // 'line-awesome',
    // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

    // 'roboto-font', // optional, you are not bound to it
    'material-icons', // optional, you are not bound to it
    'material-icons-outlined',
    // 'svg-material-icons-outlined',
  ],

  // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-build
  build: {
    vueRouterMode: 'history', // available values: 'hash', 'history'
    scssLoaderOptions: {
      additionalData: '@import "src/css/tools/_mixins.scss";',
    },
    env: {
      API: process.env.API || '',
      SITE_ORIGIN: process.env.SITE_ORIGIN || '',
      YANDEX_MAP_API_KEY: process.env.YANDEX_MAP_API_KEY || '',
    },

    // transpile: false,
    // publicPath: '/',

    // Add dependencies for transpiling with Babel (Array of string/regex)
    // (from node_modules, which are by default not transpiled).
    // Applies only if "transpile" is set to true.
    // transpileDependencies: [],

    // rtl: true, // https://quasar.dev/options/rtl-support
    // preloadChunks: true,
    // showProgress: false,
    // gzip: true,
    // analyze: true,

    // Options below are automatically set depending on the env, set them if you want to override
    // extractCSS: false,

    // https://v2.quasar.dev/quasar-cli-webpack/handling-webpack
    // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain

    chainWebpack(chain) {
      chain.plugin('eslint-webpack-plugin').use(ESLintPlugin, [{ extensions: ['js', 'vue'] }]);
    },
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-devServer
  devServer: {
    server: {
      type: 'http',
    },
    port: 8080,
    open: false, // opens browser window automatically
    // vueDevtools: true,
  },

  // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-framework
  framework: {
    config: {
      notify: {
        iconColor: 'red',
        iconSize: '2rem',
        classes: 'a-pa-32 text-semibold-xl',
        multiline: true,
        icon: 'report_problem',
        position: 'bottom-right',
      },
    },

    // iconSet: 'material-icons', // Quasar icon set
    // lang: 'en-US', // Quasar language pack
    lang: 'ru', // Quasar language pack

    // For special cases outside of where the auto-import strategy can have an impact
    // (like functional components as one of the examples),
    // you can manually specify Quasar components/directives to be available everywhere:
    //
    // components: [],
    // directives: [],

    // Quasar plugins
    plugins: ['Meta', 'Notify', 'Cookies', 'Dialog'],
  },

  // animations: 'all', // --- includes all animations
  // https://quasar.dev/options/animations
  animations: [
    'fadeInLeftBig',
    'fadeOutLeftBig',
    'slideInRight',
    'slideOutRight',
  ],

  // https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
  ssr: {
    pwa: false,

    // manualStoreHydration: true,
    // manualPostHydrationTrigger: true,

    prodPort: 3000, // The default port that the production server should use
    // (gets superseded if process.env.PORT is specified at runtime)

    maxAge: 1000 * 60 * 60 * 24 * 30,
    // Tell browser when a file from the server should expire from cache (in ms)

    chainWebpackWebserver(chain) {
      chain.plugin('eslint-webpack-plugin').use(ESLintPlugin, [{ extensions: ['js'] }]);
    },

    middlewares: [
      ctx.prod ? 'compression' : '',
      'render', // keep this as last one
    ],
  },

  // https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
  pwa: {
    workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
    workboxOptions: {}, // only for GenerateSW

    // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
    // if using workbox in InjectManifest mode

    chainWebpackCustomSW(chain) {
      chain.plugin('eslint-webpack-plugin').use(ESLintPlugin, [{ extensions: ['js'] }]);
    },

    manifest: {
      name: 'University Directory Demo',
      short_name: 'Uni Demo',
      description: 'Демо-интерфейс каталога вузов (портфолио)',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#ffffff',
      theme_color: '#027be3',
      icons: [
        {
          src: 'icons/icon-128x128.png',
          sizes: '128x128',
          type: 'image/png',
        },
        {
          src: 'icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icons/icon-256x256.png',
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: 'icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png',
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-cordova-apps/configuring-cordova
  cordova: {
    // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-capacitor-apps/configuring-capacitor
  capacitor: {
    hideSplashscreen: true,
  },

  // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/configuring-electron
  electron: {
    bundler: 'packager', // 'packager' or 'builder'

    packager: {
      // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
      // OS X / Mac App Store
      // appBundleId: '',
      // appCategoryType: '',
      // osxSign: '',
      // protocol: 'myapp://path',
      // Windows only
      // win32metadata: { ... }
    },

    builder: {
      // https://www.electron.build/configuration/configuration

      appId: 'com.example.university-directory-demo',
    },

    // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain

    chainWebpackMain(chain) {
      chain.plugin('eslint-webpack-plugin').use(ESLintPlugin, [{ extensions: ['js'] }]);
    },

    chainWebpackPreload(chain) {
      chain.plugin('eslint-webpack-plugin').use(ESLintPlugin, [{ extensions: ['js'] }]);
    },
  },
}));
