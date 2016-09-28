const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

router.post('/', (req, res, next) => {
  let loginName = req.body.login_username;
  let loginPassword = req.body.login_password;

  knex('users').select()
  .then((data) => {
    const passCompare = bcrypt.compareSync(loginPassword, data[0].password)
    if (data[0].username === loginName && passCompare === true) {
      res.redirect('/homepage');
    }
    else {
      let msg = 'Incorrect username or password';
      res.redirect('error');
    }
  })
});

module.exports = router;
