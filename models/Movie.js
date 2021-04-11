const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add the name of the movie']
    },
    rating: Number,
    year: String,
    genre: String,
    synopsis: String,
    category: String,
    img: String,
    ratingFrequency: Number,
    cookies: Array,
    location: String,
})

module.exports = mongoose.model('Movie', MovieSchema)