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
  console.log(req.body);
  knex('patron').where('username', req.body.username)
    .then(user => {
      console.log("1")
      if (user.length === 0) {
        res.json({ Error: "Try again" });
      } else {
        console.log("2");
        var match = bcrypt.compareSync(req.body.password, user[0].password)
        console.log(match, user[0].password + "  <-- MATCH");
        if (match) {
          delete user[0].password;
          //console.log(JSON.stringify(user[0]));
          user = JSON.parse(JSON.stringify(user[0]))
          // let userObj = Object.assign({}, user[0]);
          // var token = jwt.sign({ id: user[0].id, email: user[0].email, username: user[0].username, password: user[0].password }, 'no');
          var token = jwt.sign(user, 'no');
          console.log(token + "  <--- TOKEN");
          res.json({ data: token });
        } else {
          res.json({ error: "Shit isn't working" });
        }
      }
    })
});


module.exports = router;
