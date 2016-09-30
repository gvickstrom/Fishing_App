const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

router.get('/', function (req, res, next) {
  queries.getRivers(function(err, results) {
    const { renderObject } = req;
    if (err) {
      renderObject.message = err.message || 'Something terrible happened.';
      res.render('error', renderObject);
    } else {
      renderObject.rivers = results;
      res.render('index', renderObject);
    }
  });
});

router.post('/', (req, res, next) => {
  const loginName = req.body.login_username;
  const loginPassword = req.body.login_password;

  knex('users').where('username', loginName)
  .then((data) => {
    const passCompare = bcrypt.compareSync(loginPassword, data[0].password);
    if (data[0].username === loginName && passCompare === true) {
      req.session.user = data[0];
      res.redirect('/homepage');
    }
    else {
      res.redirect('error');
    }
  })
  .catch((err) => {
    return next(err);
  });
});

module.exports = router;
