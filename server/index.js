const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const cors = require('cors');
require('dotenv').config();

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8080;
const setupNext = require('next');

const nextApp = setupNext({ dev });
const handle = nextApp.getRequestHandler();
const server = express();

const { logger } = require('./helpers');
const serverRouter = require('./serverRouter.js');
const clientRoutes = require('./clientRoutes.js');

function generateExpressToNext(arr) {
  // eslint-disable-next-line max-len
  arr.map((obj) => server.get(obj.route, (req, res) => nextApp.render(req, res, obj.redirect || obj.route)));
}

nextApp.prepare().then(() => {
  const originWhitelist = ['http://bewelltherapy.org', 'http://testing.bewelltherapy.org'];
  server.use(cors({ origin: originWhitelist }));

  // body-parser middleware
  server.use(bodyParser.json());

  // to sanitize the body with helper
  server.use(expressSanitizer());

  // custom logger for prod
  server.use(logger);

  // actual api routes
  server.use('/api', serverRouter);

  // Next pages/client routes
  server.use('/_next', express.static(path.join(__dirname, '.next')));

  // using the clientRoutes array, it automatically generates the routes
  generateExpressToNext(clientRoutes);

  // catch all
  server.get('*', (req, res) => handle(req, res));

  if (dev) {
    // for local testing
    server.listen(port, (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`> Ready at http://localhost:${port}`);
    });
  }
});


module.exports = server;
