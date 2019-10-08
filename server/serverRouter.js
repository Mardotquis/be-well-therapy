const express = require('express');

const serverRouter = express.Router();

serverRouter.get('/', (req, res) => {
  res.send('BACKEND HIT');
});

module.exports = serverRouter;
