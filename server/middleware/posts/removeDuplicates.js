module.exports = (req, res, next) => {
  const { posts } = res.body;
  const idSet = new Set();
  res.body.posts = posts.reduce((accumulator, post) => {
    if (!idSet.has(post.id)) {
      idSet.add(post.id);
      accumulator.push(post);
    }
    return accumulator;
  }, []);
  next();
};
