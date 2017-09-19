const express = require('express')

const router = express.Router();

const queries = require('../db/trips_queries')


function isValidID(req, res, next ) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid trip'));
}

function validTrip(trip) {
  const hasName = typeof trip.name == 'string' && trip.name.trim() != '';
  const hasStart = typeof trip.start_date == 'string';
  const hasEnd = typeof trip.end_date == 'string';
  return hasName;
}

router.get('/', (req, res) => {
  queries.getAll().then(trip => {
    res.json(trip)
  });
});

router.get('/:id', isValidID, (req, res, next) => {
    queries.getOne(req.params.id).then(trip => {
      if(trip) {
        res.json(trip);
      }
      else {
        res.status(404);
        next();
      }
  });
});

router.post('/', (req, res, next) => {
  if(validTrip(req.body)) {
    queries.create(req.body).then(trip => {
      res.json(trip[0])
    })
  } else {
    next(new Error('Invalid trip post'));
  }
})

router.put('/:id', isValidID, (req, res, next) => {
  if(validTrip(req.body)) {
    queries.update(req.params.id, req.body).then(tripDetails => {
      res.json(tripDetails[0])
    })
  } else {
    next(new Error('Invalid trip put'));
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
