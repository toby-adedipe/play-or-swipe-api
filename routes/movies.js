const express = require('express');
const {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  filterMovie,
} = require('../controllers/movies');
const Movie = require('../models/Movie');


const reviewRouter = require('./reviews');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
//const router = express.Router({ mergeParams: true });

router.use('/:movieId/reviews', reviewRouter);

router
  .route('/')
  .get(advancedResults(Movie), getMovies)
  .post(addMovie)


router
  .route('/:id')
  .get(getMovie)
  .put(updateMovie)

router
  .route('/:location/:year')
  .get(filterMovie)

module.exports = router;
