const redis = require('redis');

const client = redis.createClient();
client.on('error', (error) => console.error(error));

module.exports = (req, res, next) => {
  const { originalUrl } = req;
  client.get(originalUrl, (error, cache) => {
    if (error || cache === null) {
      const oldJson = res.json;
      res.json = (body) => {
        client.set(originalUrl, JSON.stringify(body));
        oldJson.call(res, body);
      };
      next();
    } else {
      res.status(200).json(JSON.parse(cache));
    }
  });
};
