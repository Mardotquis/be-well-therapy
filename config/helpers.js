const axios = require('axios');

function axiosInstanceGenerator() {
  let server;
  if (process.env.NODE_ENV === 'development') {
    server = 'http://localhost:8080';
  } else if (process.env.CURRENT_STAGE === 'development') {
    server = process.env.DEV_DOMAIN;
  } else {
    server = process.env.PROD_DOMAIN;
  }
  return axios.create({
    baseURL: server,
  });
}

exports.axios = axiosInstanceGenerator();
