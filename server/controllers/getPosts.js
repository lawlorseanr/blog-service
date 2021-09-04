const Endpoint = require('../lib/Endpoint');

const sortByAllowed = ['id', 'reads', 'likes', 'popularity'];
const directionAllowed = ['asc', 'desc'];

const checkSortBy = (sortBy) => {
  if (sortBy === undefined) {
    return sortByAllowed[0];
  }
  if (typeof sortBy === 'string' && sortByAllowed.indexOf(sortBy) >= 0) {
    return sortBy;
  }
  return false;
};

const checkDirection = (direction) => {
  if (direction === undefined) {
    return directionAllowed[0];
  }
  if (typeof direction === 'string' && directionAllowed.indexOf(direction) >= 0) {
    return direction;
  }
  return false;
};

module.exports = (req, res) => {
  const params = req.params;

  if (params.tags && params.tags.length > 0) {
    const tags = params.tags;

    const sortBy = checkSortBy(params.sortBy);
    const direction = checkDirection(params.direction);
    if (!sortBy) {
      res.status(400).json({ error: 'sortBy parameter in invalid' });
    } else if (!direction) {
      res.status(400).json({ error: 'direction parameter is invalid' });
    } else {
      res.status(200).json({ success: true });
    }
  } else {
    res.status(400).json({ error: 'Tags parameter is required' });
  }
};
