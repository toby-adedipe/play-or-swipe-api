const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit', 'status', 'location', 'year'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = model.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort({[sortBy]: -1});
  } else {
    query = query.sort('title');
  }

  //Filter by status
  if(req.query.status){
    const param = req.query.status.split(',').join(' ');
    query.setQuery({ status: param});
  }

  //filter data by location and year
  if(req.query.location && req.query.year){
    const locationParam = req.query.location.split(',').join(' ');
    const yearParam = req.query.year.split(',').join(' ');
    //query.where('location').equals([locationParam]).where('year').equals([yearParam])
    query.find({'location': [locationParam], 'year': [yearParam]})
  }else if(req.query.location && !req.query.year){
    const locationParam = req.query.location.split(',').join(' ');
    query.where('location').equals([locationParam])
  }else if(!req.query.location && req.query.year){
    const yearParam = req.query.year.split(',').join(' ');
    query.where('year').equals([yearParam])
  }

  //filter by name

  //total before pagination
  const totalResults = await query;


  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < totalResults.length) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination:{
      ...pagination,
      total: totalResults.length,
    },
    data: results
  };

  next();
};

module.exports = advancedResults;
