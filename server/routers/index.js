const router = require('express').Router();
const controllers = require('../controllers');
const middleware = require('../middleware');

/* ==============================
            /api
============================== */
router
  .get('/ping', middleware.ping, controllers.ping)
  .get('/posts', middleware.posts, controllers.posts);

module.exports = router;
