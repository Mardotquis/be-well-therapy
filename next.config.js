const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins(
  [
    withImages, withCSS, withSass,
  ],
  {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        },
      });
      return config;
    },
    exportPathMap() {
      return {
        '/': { page: '/' },
        '/forms': { page: '/forms' },
        '/about-us': { page: '/about-us' },
        '/our-staff': { page: '/our-staff' },
        '/our-services': { page: '/our-services' },
      };
    },
  },
);
// TODO - put assets over a CDN
