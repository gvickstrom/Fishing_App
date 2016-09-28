const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const request = require('request');
const axios = require('axios');
const knex = require('../db/knex.js');


router.get('/report-new', function (req, res, next) {
  const renderObject = {};
  res.render('report-new', renderObject);
});

module.exports = router;
