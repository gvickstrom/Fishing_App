const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const axios = require('axios');
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');

router.get('/', function (req, res, next) {
  console.log(req.session);
  const renderObject = {};
  renderObject.title = 'Anglers';
  res.render('landing', renderObject);
});

module.exports = router;
