const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const axios = require('axios');
const knex = require('../db/knex.js');

router.get('/', function (req, res, next) {
  res.redirect('landing');
});

module.exports = router;
