const express = require('express')

const router = express.Router();

const queries = require('../db/photos_queries')


function isValidID(req, res, next ) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid photo'));
}

function validPhoto(photo) {
  const hasID = typeof photo.user_id == 'string';
  const hasURL = typeof photo.photo_url == 'string' && photo.photo_url.trim() != '';
  const hasDate = typeof photo.post_date == 'string';
  return hasID &&  hasDate;
}

router.get('/', (req, res) => {
  queries.getAll().then(photo => {
    res.json(photo)
  });
});

router.get('/:id', isValidID, (req, res, next) => {
    queries.getOne(req.params.id).then(photo => {
      if(photo) {
        res.json(photo);
      }
      else {
        res.status(404);
        next();
      }
  });
});

router.post('/', (req, res, next) => {
  if(validPhoto(req.body)) {
    queries.create(req.body).then(photo => {
      res.json(photo[0])
    })
  } else {
    next(new Error('Invalid photo post'));
  }
})

router.put('/:id', isValidID, (req, res, next) => {
  if(validPhoto(req.body)) {
    queries.update(req.params.id, req.body).then(photoDetails => {
      res.json(photoDetails[0])
    })
  } else {
    next(new Error('Invalid photo put'));
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
