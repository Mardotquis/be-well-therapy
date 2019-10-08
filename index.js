const sls = require('serverless-http');
const server = require('./server/index.js');

// wrapping and exporting the server
exports.server = sls(server);
