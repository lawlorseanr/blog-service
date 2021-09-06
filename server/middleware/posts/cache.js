const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();
client.on('error', (error) => console.error(error));

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

module.exports = (req, res, next) => {
  const { tagList } = req.query;
  res.getCache = getAsync;
  res.setCache = setAsync;

  res.body = { posts: [] };
  const posts = tagList.map((tag) => getAsync(tag));

  Promise.all(posts)
    .then((cachedPosts) => {
      res.body.posts = cachedPosts;
      next();
    })
    .catch((error) => res.status(500).json(error));
};
