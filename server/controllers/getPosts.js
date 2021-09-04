const Endpoint = require('../lib/Endpoint');

const URL = '/blog/posts';
const TAGS_ERROR = { error: 'Tags parameter is required' };
const SORT_ERROR = { error: 'sortBy parameter in invalid' };
const DIRECTION_ERROR = { error: 'direction parameter is invalid' };
const sortByAllowed = ['id', 'reads', 'likes', 'popularity'];
const directionAllowed = ['asc', 'desc'];

const directionFn = [(a, b) => a < b, (a, b) => a > b];

const sortFn = (a, b, fn) => {
  if (a === b) {
    return 0;
  }
  if (fn(a, b)) {
    return -1;
  }
  return 1;
};

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
    return directionFn[0];
  }
  const directionIndex = directionAllowed.indexOf(direction);
  if (typeof direction === 'string' && directionIndex >= 0) {
    return directionFn[directionIndex];
  }
  return false;
};

module.exports = (req, res) => {
  const { query } = req;

  if (query.tags && query.tags.length > 0) {
    const { tags } = query;

    const sortBy = checkSortBy(query.sortBy);
    const direction = checkDirection(query.direction);
    if (!sortBy) {
      res.status(400).json(SORT_ERROR);
    } else if (!direction) {
      res.status(400).json(DIRECTION_ERROR);
    } else {
      const tagList = tags.split(',');
      const tagRequests = tagList.map((tag) => Endpoint.get(`${URL}?tag=${tag}`)
        .then((response) => response.data.posts));

      Promise.all(tagRequests)
        .then((responses) => {
          const postList = [];
          responses.forEach((response) => {
            response.forEach((post) => {
              postList.push(post);
            });
          });
          const sortedPosts = postList.sort((a, b) => sortFn(a[sortBy], b[sortBy], direction));
          res.status(200).json({ posts: sortedPosts });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    }
  } else {
    res.status(400).json(TAGS_ERROR);
  }
};
