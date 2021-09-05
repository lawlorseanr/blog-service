const DIRECTION_ERROR = { error: 'direction parameter is invalid' };
const directionAllowed = ['asc', 'desc'];

module.exports = (req, res, next) => {
  const { direction } = req.query;
  if (direction === undefined) {
    req.query.direction = 'asc';
    next();
  } else {
    const directionIndex = directionAllowed.indexOf(direction);
    if (typeof direction === 'string' && directionIndex >= 0) {
      req.query.direction = direction;
      next();
    } else {
      res.status(400).json(DIRECTION_ERROR);
    }
  }
};
