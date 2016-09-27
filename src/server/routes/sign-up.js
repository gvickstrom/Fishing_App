const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const axios = require('axios');
const knex = require('../db/knex.js');

const bcrypt = require('bcrypt');

router.get('/', function (req, res, next) {
  const renderObject = {};
  renderObject.title = 'Anglers: Sign Up'
  res.render('sign-up', renderObject);
});

router.post('/', function (req, res, next) {
  const password = bcrypt.hashSync(req.body.password, 10);
  knex('users').insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    username: req.body.username,
    password: password
  })
  .then(() => {
    res.redirect('/homepage');
  })
})

module.exports = router;
