const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', function(req,res,next) {
  var riverName = req.query.river;
  queries.getRiverSites(riverName, function(err, results) {
    var returnObject = {};
    if (err) {
      returnObject.message = err.message || 'Could not find sites';
      res.status(400).render('error', returnObject);
    } else {
      returnObject.sites = results;
      console.log(results);
      res.send(returnObject);
    }
  });
});



module.exports = router;
