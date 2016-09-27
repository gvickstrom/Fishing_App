const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const axios = require('axios');
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Anglers';
  res.render('landing', renderObject);
});

router.post('/', function (req, res, next) {
  knex('users').where('username', req.body.username).then((data) => {
    if (data.length > 0) {
      bcrypt.compare(req.body.password, data[0].password, function(err, resp) {
        if (err) {
          res.send(err);
        }
        if (resp) {
          req.session.user = data[0];
          res.redirect('/restaurants');
        } else {
          res.redirect('/login/logErr');
        }
      });
    } else {
      res.redirect('/login/logErr');
    }
  });
});

module.exports = router;
