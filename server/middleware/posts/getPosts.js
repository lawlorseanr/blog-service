const Endpoint = require('../../lib/Endpoint');

const URL = (tag) => `/blog/posts?tag=${tag}`;

module.exports = (req, res) => {
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
      const output = responses[0];
      console.log({ output });
      const postList = [];
      res.body.posts = postList;
      next();
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
