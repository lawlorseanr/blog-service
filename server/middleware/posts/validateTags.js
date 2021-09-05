const TAGS_ERROR = { error: 'Tags parameter is required' };

module.exports = (req, res, next) => {
  const { query } = req;
  if (query.tags && query.tags.length > 0) {
    const { tags } = query;
    req.query.tagList = tags.split(',');
    next();
  } else {
    res.status(400).json(TAGS_ERROR);
  }
};
