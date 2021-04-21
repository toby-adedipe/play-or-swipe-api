const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Movie = require('../models/Movie');

// @desc      Get movies
// @route     GET /api/v1/movies
// @access    Public
exports.getMovies = asyncHandler(async (req, res, next) => {
    let movies = await Movie.find();
    
    let filteredMovies = movies.filter((movie)=> movie.status === 'approved');
    
    res.status(200).json({
        success: true,
        data: filteredMovies,
    });
});

// @desc      Get movies
// @route     GET /api/v1/movies/admin
// @access    Public

exports.getPendingMovies = asyncHandler(async (req, res, next) => {
  let movies = await Movie.find();
  
  let filteredMovies = movies.filter((movie)=> movie.status === 'pending');
  
  res.status(200).json({
      success: true,
      count: filteredMovies.length,
      data: filteredMovies,
  });
});

// @desc      Get single movie
// @route     GET /api/v1/movies/:id
// @access    Public
exports.getMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id).populate({
    path: 'movie',
    select: 'name description'
  });

  if (!movie) {
    return next(
      new ErrorResponse(`No movie with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: movie
  });
});

// @desc      Add movie
// @route     POST /api/v1/bootcamps/:bootcampId/movies
// @access    Public
exports.addMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.create(req.body);

  res.status(200).json({
    success: true,
    data: movie
  });
});

// @desc      Update movie
// @route     PUT /api/v1/movies/:id
// @access    Private
exports.updateMovie = asyncHandler(async (req, res, next) => {
  let movie = await Movie.findById(req.params.id);

  let data = req.body;
  let newArr = movie.cookies;

  if (!movie) {
    return next(
      new ErrorResponse(`No movie with the id of ${req.params.id}`, 404)
    );
  }else if(movie.cookies.includes(req.body.cookieToken)){
    return next(
      new ErrorResponse(`You've already rated ${movie.title}`, 404)
    );
  };
  
  newArr.push(req.body.cookieToken);
  data = {
    ...data,
    cookies: newArr,
  };
  
  movie = await Movie.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  });

  console.log(data);
  movie.save();

  res.status(200).json({
    success: true,
    data: movie
  });
});


exports.adminUpdateMovie = asyncHandler(async (req, res, next) => {
  let movie = await Movie.findById(req.params.id);

  let data = req.body;
  let cookies = movie.cookies;
  
  if (!movie) {
    return next(
      new ErrorResponse(`No movie with the id of ${req.params.id}`, 404)
    );
  }
  
  data = {
    ...data,
    cookies,
  };
  
  movie = await Movie.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true
  });

  console.log(data);
  movie.save();

  res.status(200).json({
    success: true,
    data: movie
  });
});

// @desc      Delete movie
// @route     DELETE /api/v1/movies/:id
// @access    Private
exports.deleteMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    return next(
      new ErrorResponse(`No movie with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is movie owner
//   if (movie.user.toString() !== req.user.id && req.user.role !== 'admin') {
//     return next(
//       new ErrorResponse(
//         `User ${req.user.id} is not authorized to delete movie ${movie._id}`,
//         401
//       )
//     );
//   }

  await movie.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});

exports.filterMovie = asyncHandler(async (req, res, next) => {
  const movies = await Movie.find();

  const location = req.params.location;
  const year = req.params.year;

  const data = movies.filter((item)=>{
    return item.location === location && item.year === year
  })

  res.status(200).json({
      success: true,
      count: data.length,
      data: data,
  });
});

