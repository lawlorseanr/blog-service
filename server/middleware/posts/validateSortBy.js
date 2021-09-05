const SORT_ERROR = { error: 'sortBy parameter in invalid' };
const sortByAllowed = ['id', 'reads', 'likes', 'popularity'];

module.exports = (req, res, next) => {
  const { sortBy } = req.query;
  if (sortBy === undefined) {
    req.query.sortBy = 'id';
    next();
  } else {
    const sortByIndex = sortByAllowed.indexOf(sortBy);
    if (typeof sortBy === 'string' && sortByIndex >= 0) {
      req.query.sortBy = sortBy;
      next();
    } else {
      res.status(400).json(SORT_ERROR);
    }
  }
};
