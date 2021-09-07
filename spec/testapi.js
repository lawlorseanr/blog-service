const express = require('express');
const data = require('./data');

const api = express();
const router = express.Router();
const HOST = 'localhost';
const PORT = 3002;

const controller = (req, res) => {
  const { tag } = req.query;
  res.status(200).json(data[tag]);
};

router.get('/mockapi', controller);

api.listen(PORT, HOST, () => console.log(`Mock API listening on http://${HOST}:${PORT}`));

module.exports = api;
