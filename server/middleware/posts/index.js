const squawk = require('./squawk');
const validateTags = require('./validateTags');
const validateDirection = require('./validateDirection');
const validateSortBy = require('./validateSortBy');
const cache = require('./cache');
const getPosts = require('./getPosts');
const removeDuplicates = require('./removeDuplicates');
const sortResponse = require('./sortResponse');

module.exports = [
  squawk,
  validateTags,
  validateDirection,
  validateSortBy,
  cache,
  getPosts,
  removeDuplicates,
  sortResponse,
];
