const express = require('express');
const routers = require('../server/routers');

const server = express();
server.use('/api', routers);

module.exports = server;
