const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add the name of the movie']
    },
    rating: Number,
    year: {
        type: String,
        required: [true, 'Please add the year the movie was released']
    },
    genre: String,
    synopsis: String,
    category: String,
    img: String,
    ratingFrequency: Number,
    cookies: Array,
    location: {
        type: String,
        required: [true, 'Please add a location of the movie']
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'disapproved'],
        default: 'pending',
    },
})

module.exports = mongoose.model('Movie', MovieSchema)