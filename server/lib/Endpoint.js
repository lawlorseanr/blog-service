const axios = require('axios');

const baseURL = 'https://api.hatchways.io/assessment';

const Endpoint = axios.create({
  baseURL,
  headers: {
    common: {
      'access-control-allow-origin': '*',
      'access-control-allow-headers': '*',
      accept: 'application/json,/',
      'access-control-allow-methods': 'GET,POST,PUT,OPTIONS',
      'Content-Type': 'application/json',
    },
  },
});

module.exports = Endpoint;
