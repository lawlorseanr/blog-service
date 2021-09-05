const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();
client.on('error', (error) => console.error(error));

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const cacheCB = (key, value) => {
  setAsync(key, value);
  next();
};

module.exports = (req, res, next) => {
  const { tagList } = req.query;
  res.cacheCB = cacheCB;
  res.body = { posts: [] };
  posts = [];

  const posts = tagList.map((tag, i) => getAsync(tag));

  Promise.all(posts)
    .then(())
  tagList.forEach((tag) => {
    client.get(tag, (error, cache) => {
      posts.push(cache);
    });
  });
  next();
};
