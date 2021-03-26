const express = require('express');
const {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movies');

const Movie = require('../models/Movie');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getMovies)
  .post(protect, authorize('publisher', 'admin'), addMovie);

router
  .route('/:id')
  .get(getMovie)
  .put(protect, authorize('publisher', 'admin'), updateMovie)
  .delete(protect, authorize('publisher', 'admin'), deleteMovie);

module.exports = router;
