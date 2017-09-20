const express = require('express')

const router = express.Router();

const queries = require('../db/login_query')


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

module.exports = router;
