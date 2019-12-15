const sls = require('serverless-http');
const server = require('./server/index.js');

// wrapping and exporting the server
exports.server = sls(server,
  // helps the server serve these files - because Node and binary files don't get along
  { binary: ['application/*', 'image/*'] });
