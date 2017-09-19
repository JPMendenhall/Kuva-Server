const express = require('express')

const router = express.Router();

const queries = require('../db/photostrips_queries')


function isValidID(req, res, next ) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid photo'));
}

function validPhotoTrip(phototrip) {
  const hasPhoto = typeof phototrip.photo_id == 'number';
  const hasTrip = typeof phototrip.photo_id == 'number';
  return hasPhoto &&  hasTrip;
}

router.get('/', (req, res) => {
  queries.getAll().then(phototrip => {
    res.json(phototrip)
  });
});

router.get('/:id', isValidID, (req, res, next) => {
    queries.getOne(req.params.id).then(phototrip => {
      if(phototrip) {
        res.json(phototrip);
      }
      else {
        res.status(404);
        next();
      }
  });
});

router.post('/', (req, res, next) => {
  if(validPhotoTrip(req.body)) {
    queries.create(req.body).then(phototrip => {
      res.json(phototrip[0])
    })
  } else {
    next(new Error('Invalid photo post'));
  }
})

router.put('/:id', isValidID, (req, res, next) => {
  if(validPhotoTrip(req.body)) {
    queries.update(req.params.id, req.body).then(photoTripDetails => {
      res.json(photoTripDetails[0])
    })
  } else {
    next(new Error('Invalid phototrip put'));
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
