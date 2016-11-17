const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

router.get('/', function (req, res, next) {
  queries.getDataFromTwoTables('rivers', 'stations', function (err, result) {
    const { renderObject } = req;
    if (err) {
      console.log(err);
    } else {
      renderObject.rivers = result.first;
      renderObject.stationsExport = JSON.stringify(result.second);
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
      
      // req.session.user_id = data[0].id;
      res.redirect('/homepage');
    }
    else {
      res.redirect('error');
    }
  })
  .catch(err => next(err));
});

module.exports = router;
