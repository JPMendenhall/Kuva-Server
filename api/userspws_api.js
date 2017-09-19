const express = require('express')

const router = express.Router();

const queries = require('../db/userspws_queries')


function isValidID(req, res, next ) {
  if(!isNaN(req.params.id)) return next();
  next(new Error('Invalid user_pw'));
}

function validUserPw(user_pw) {
  const hasName = typeof user_pw.user_id == 'number';
  const hasPassword = typeof user_pw.password == 'string' && user_pw.password.trim() != '';
  return hasName && hasPassword;
}

router.get('/', (req, res) => {
  queries.getAll().then(user_pw => {
    res.json(user_pw)
  });
});

router.get('/:id', isValidID, (req, res, next) => {
    queries.getOne(req.params.id).then(user_pw => {
      if(user_pw) {
        res.json(user_pw);
      }
      else {
        res.status(404);
        next();
      }
  });
});

router.post('/', (req, res, next) => {
  if(validUserPw(req.body)) {
    queries.create(req.body).then(user_pw => {
      res.json(user_pw[0])
    })
  } else {
    next(new Error('Invalid user_pw post'));
  }
})

router.put('/:id', isValidID, (req, res, next) => {
  if(validUserPw(req.body)) {
    queries.update(req.params.id, req.body).then(user_pwDetails => {
      res.json(user_pwDetails[0])
    })
  } else {
    next(new Error('Invalid user_pw put'));
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
