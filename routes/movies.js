const express = require('express');
const {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movies');

const router = express.Router();

//const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getMovies)
  .post(addMovie)

router
  .route('/:id')
  .get(getMovie)
  .put(updateMovie)
  .delete(deleteMovie);

module.exports = router;
