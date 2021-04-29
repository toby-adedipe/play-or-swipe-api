const express = require('express');
const {
  adminUpdateMovie,
  addMovie,
  deleteMovie,
  getMovies,
} = require('../controllers/movies');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');
const Movie = require('../models/Movie');
//const router = express.Router({ mergeParams: true });

//router.use('/:movieId/reviews', reviewRouter);

router.use(protect);
router.use(authorize('admin'));

router
  .route('/movies')
  .get(advancedResults(Movie), getMovies)
  .post(addMovie);

router
  .route('/movies/:id')
  .put(adminUpdateMovie)
  .delete(deleteMovie);

module.exports = router;
