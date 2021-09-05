const compareFn = {
  asc: (a, b) => a < b,
  desc: (a, b) => a > b,
};

const sortFn = (a, b, fn) => {
  if (a === b) {
    return 0;
  }
  if (fn(a, b)) {
    return -1;
  }
  return 1;
};

module.exports = (req, res, next) => {
  const { posts } = res.body;
  const { sortBy, direction } = req.query;
  const directionFn = compareFn[direction];

  res.body.posts = posts.sort((a, b) => sortFn(a[sortBy], b[sortBy], directionFn));
  next();
};
