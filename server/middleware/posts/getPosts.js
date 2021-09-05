const Endpoint = require('../../lib/Endpoint');

const URL = (tag) => `/blog/posts?tag=${tag}`;

module.exports = (req, res) => {
  const { tagList } = req.query;
  const { posts } = res.body;
  console.log('posts: ', posts);

  const tagRequests = posts.map((post, i) => {
    if (post !== null) {
      return post;
    }
    const tag = tagList[i];
    return Endpoint.get(URL(tag))
      .then((response) => response.data.posts);
  });

  Promise.all(tagRequests)
    .then((responses) => {
      const postList = [];
      responses.forEach((response) => {
        response.forEach((post) => {
          postList.push(post);
        });
      });
      res.body.posts = postList;
      next();
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
