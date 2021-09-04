const router = require('express').Router();
const controllers = require('../controllers');

router
  .get('/ping', controllers.getPing)
  .get('/posts', controllers.getPosts);

module.exports = router;
