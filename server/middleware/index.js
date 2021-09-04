const squawk = require('./squawk');
const cache = require('./redis');

module.exports = [
  squawk,
  cache,
];
