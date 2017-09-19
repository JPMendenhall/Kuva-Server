const express = require('express')

const router = express.Router();

const queries = require('../db/eventdata_queries')

router.get('/eventdata/:id', (req, res, next) => {
    queries.getEventData(req.params.id).then(trip => {
      if(trip) {
        res.json(trip);
      }
      else {
        res.status(404);
        next();
      }
  });
});

router.get('/profilepics/:id', (req, res, next) => {
    queries.getPatronsPics(req.params.id).then(pictures => {
      if(pictures) {
        res.json(pictures);
      }
      else {
        res.status(404);
        next();
      }
  });
});

module.exports = router;
