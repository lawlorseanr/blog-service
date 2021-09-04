const express = require('express');
const routers = require('./routers');
const middlware = require('./middleware');

const HOST = 'localhost';
const PORT = 3000;

const server = express();
server.use('/api', middlware, routers);

server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
