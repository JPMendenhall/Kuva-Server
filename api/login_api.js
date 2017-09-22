const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const queries = require('../db/login_query')
const jwt = require('jsonwebtoken')
const knex = require('../db/knex')

function isValidID(req, res, next ) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid patron'));
}

function validpatron(patron) {
  const hasFirstName = typeof patron.first_name == 'string' && patron.first_name.trim() != '';
  const hasLastName = typeof patron.last_name == 'string' && patron.last_name.trim() != '';
  return hasFirstName && hasLastName;
}

router.get('/', (req, res) => {
  queries.getAll().then(patron => {
    res.json(patron)
  });
});

router.get('/:id', isValidID, (req, res, next) => {
    queries.getOne(req.params.id).then(patron => {
      if(patron) {
        res.json(patron);
      }
      else {
        res.status(404);
        next();
      }
  });
});

router.post('/', function (req, res, next) {
  knex('patron').where('username', req.body.username)
    .then(user => {
      if (user.length === 0) {
        res.statusCode = 403;
        res.json({ Error: "Try again" });
      } else {
        var match = bcrypt.compareSync(req.body.password, user[0].password)
        if (match) {
          delete user[0].password;
          user = JSON.parse(JSON.stringify(user[0]))
          var token = jwt.sign(user, 'no');
          res.json({ data: token });
        } else {
          res.json({ error: "Shit isn't working" });
        }
      }
    })
});


module.exports = router;
