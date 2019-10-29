/* eslint-disable no-console */
const express = require('express');
const { sendEmail } = require('./contact/index');
const { sanitizeBody } = require('./helpers');

const serverRouter = express.Router();

// using middleware to sanitize requests to /api
serverRouter.use(sanitizeBody);

serverRouter.get('/', (req, res) => {
  res.send('BACKEND HIT');
});

serverRouter.post('/contact', async (req, res) => {
  try {
    const result = await sendEmail(req.body);
    console.log('Email sent successfully: \n', result);
    res.sendStatus(200);
  } catch (error) {
    console.log('Error while sending email: \n', error);
    res.sendStatus(500);
  }
});

module.exports = serverRouter;
