const moment = require('moment');

module.exports = (req, res, next) => {
  console.log(
    `${moment(new Date()).format('M/D h:mma')} ${req.method} ${req.originalUrl}`,
  );
  next();
};
