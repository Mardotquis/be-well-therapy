const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

module.exports = withPlugins(
  [withCSS, withSass, withImages],
  {
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
