const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');
const validation = require('../../client/js/validation');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

router.get('/', (req, res, next) => {

});

module.exports = router;
