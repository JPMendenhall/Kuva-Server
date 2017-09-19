const express = require('express')

const router = express.Router();

const queries = require('../db/getSideNavBar_query')

router.get('/events/:id', (req, res, next) => {
    queries.getSideNavBar(req.params.id).then(event => {
      if(event) {
        res.json(event);
      }
      else {
        res.status(404);
        next();
      }
  });
});

router.get('/patron/:id', (req, res, next) => {
    queries.getPicAndName(req.params.id).then(patron => {
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
