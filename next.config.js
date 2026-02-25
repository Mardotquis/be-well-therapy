const withImages = require('next-images');

module.exports = withImages({
  exportPathMap() {
    return {
      '/': { page: '/' },
      '/forms': { page: '/forms' },
      '/about-us': { page: '/about-us' },
      '/our-staff': { page: '/our-staff' },
      '/our-services': { page: '/our-services' },
    };
  },
  images: {
    domains: [
      "bewelltherapy.org",
    ],
  }
});
