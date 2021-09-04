const moment = require('moment');

const squawk = (req, res, next) => {
  console.log(
    `${moment(new Date()).format('M/D h:mma')} ${req.method} ${req.originalUrl}`,
  );
  next();
};

module.exports = squawk;
