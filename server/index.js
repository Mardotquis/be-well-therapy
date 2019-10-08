const express = require('express');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 8080;
const setupNext = require('next');

const nextApp = setupNext({ dev });
const handle = nextApp.getRequestHandler();
const server = express();

const serverRouter = require('./serverRouter.js');
const clientRoutes = require('./clientRoutes.js');

function generateExpressToNext(arr) {
  // eslint-disable-next-line max-len
  arr.map((obj) => server.get(obj.route, (req, res) => nextApp.render(req, res, obj.redirect || obj.route)));
}

nextApp.prepare().then(() => {
  // TODO - add back later
  // server.use((req, res, next) => {
  //   console.log('hit use');
  //   res.header('Access-Control-Allow-Origin', 'https://dummy.com');
  //   console.log('made it past use');
  //   next();
  // });

  // TODO - add logging/error handling middleware


  // actual api routes
  server.use('/api', serverRouter);

  // Next pages/client routes
  server.use('/_next', express.static(path.join(__dirname, '.next')));

  // using the clientRoutes array, it automatically generates the routes
  generateExpressToNext(clientRoutes);

  // catch all
  server.get('*', (req, res) => handle(req, res));

  // for local testing
  server.listen(port, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready at http://localhost:${port}`);
  });
});


module.exports = server;
