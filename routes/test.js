const express = require('express');

const router = express.Router();

//const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(async (req, res, next) => {

    res.send('Hello')
})

module.exports = router;
