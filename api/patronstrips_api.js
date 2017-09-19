const express = require('express')

const router = express.Router();

const queries = require('../db/patronstrips_queries')


function isValidID(req, res, next ) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid patronstrip'));
}

function validPatronStrip(patronstrip) {
  const hasUser = typeof patronstrip.user_id == 'number';
  const hasTrip = typeof patronstrip.trip_id == 'number';
  return hasUser && hasTrip;
}

router.get('/', (req, res) => {
  queries.getAll().then(patronstrip => {
    res.json(patronstrip)
  });
});

router.get('/:id', isValidID, (req, res, next) => {
    queries.getOne(req.params.id).then(patronstrip => {
      if(patronstrip) {
        res.json(patronstrip);
      }
      else {
        res.status(404);
        next();
      }
  });
});

router.post('/', (req, res, next) => {
  if(validPatronStrip(req.body)) {
    queries.create(req.body).then(patronstrip => {
      res.json(patronstrip[0])
    })
  } else {
    next(new Error('Invalid patronstrip post'));
  }
})

router.put('/:id', isValidID, (req, res, next) => {
  if(validPatronStrip(req.body)) {
    queries.update(req.params.id, req.body).then(patronstripDetails => {
      res.json(patronstripDetails[0])
    })
  } else {
    next(new Error('Invalid patronspatronstrips put'));
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
