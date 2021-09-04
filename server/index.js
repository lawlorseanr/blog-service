const express = require('express');
const routers = require('./routers');
const squawk = require('./lib/squawk');

const HOST = 'localhost';
const PORT = 3000;

const server = express();
server.use('/api', squawk, routers);

server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
