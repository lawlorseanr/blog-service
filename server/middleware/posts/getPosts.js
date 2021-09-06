const Endpoint = require('../../lib/Endpoint');

const URL = (tag) => `/blog/posts?tag=${tag}`;

module.exports = (req, res, next) => {
  const { tagList } = req.query;
  const { posts } = res.body;

  const tagRequests = posts.map((post, i) => {
    if (post !== null) {
      return JSON.parse(post);
    }
    const tag = tagList[i];
    return Endpoint.get(URL(tag))
      .then((response) => {
        const endpointPosts = response.data.posts;
        res.setCache(tag, JSON.stringify(endpointPosts));
        return endpointPosts;
      });
  });

  Promise.all(tagRequests)
    .then((responses) => {
      [res.body.posts, ...rest] = responses;
      next();
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
