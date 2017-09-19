const express = require('express')

const router = express.Router();

const queries = require('../db/patrons_queries')


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

router.post('/', (req, res, next) => {
  if(validpatron(req.body)) {
    queries.create(req.body).then(patron => {
      res.json(patron[0])
    })
  } else {
    next(new Error('Invalid patron post'));
  }
})

router.put('/:id', isValidID, (req, res, next) => {
  if(validpatron(req.body)) {
    queries.update(req.params.id, req.body).then(patronDetails => {
      res.json(patronDetails[0])
    })
  } else {
    next(new Error('Invalid patron put'));
  }
})

router.delete('/:id', isValidID, (req, res) => {
  queries.delete(req.params.id).then(() => {
    res.json({
      delete: true
    })
  })
})

module.exports = router;
