const express = require('express');
const {
  getPendingMovies,
  updateMovie,
} = require('../controllers/movies');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');
//const router = express.Router({ mergeParams: true });

//router.use('/:movieId/reviews', reviewRouter);

router.use(protect);
router.use(authorize('admin'));
router
  .route('/movies')
  .get(getPendingMovies)
  .put(updateMovie)


module.exports = router;
