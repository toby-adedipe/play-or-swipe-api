const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add the name of the movie']
    },
    rating: Number,
    year: {
        type: String,
        required: [true, 'What year was this movie made?']
    },
    genre: String,
    synopsis: String,
    category: String,
})

module.exports = mongoose.model('Movie', MovieSchema)