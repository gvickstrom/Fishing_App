const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

router.get('/', (req, res, next) => {
  const renderObject = {};
  renderObject.title = 'Anglers: Sign Up'
  res.render('sign-up', renderObject);
});

router.post('/', (req, res, next) => {
  const password = bcrypt.hashSync(req.body.password, salt);
  knex('users').insert({
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: password
  })
  .then((stuff) => {
    res.redirect('/homepage');
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;
