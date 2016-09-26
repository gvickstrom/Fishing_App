const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', function (req, res, next) {
  queries.getRivers(function(err, results) {
    var renderObject = {};
    if (err) {
      renderObject.message = err.message || 'Something terrible happened.';
      res.render('error', renderObject);
    } else {
      renderObject.rivers = results;
      res.render('index', renderObject);
    }
  });
});

module.exports = router;
