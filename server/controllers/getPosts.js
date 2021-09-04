const Endpoint = require('../lib/Endpoint');

module.exports = (req, res) => {
  res.status(200).json('posts');
};
