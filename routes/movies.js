const express = require('express');
const {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
  filterMovie,
} = require('../controllers/movies');

const reviewRouter = require('./reviews');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
//const router = express.Router({ mergeParams: true });

router.use('/:movieId/reviews', reviewRouter);

router
  .route('/')
  .get(getMovies)
  .post(addMovie)

router
  .route('/:id')
  .get(getMovie)
  .put(updateMovie)
  .delete(deleteMovie);

router
  .route('/:location/:year')
  .get(filterMovie)

module.exports = router;
