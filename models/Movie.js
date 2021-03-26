const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: String,
    rating: Number,
    year: String,
    genre: String,
    synopsis: String,
})

module.exports = mongoose.model('Movie', MovieSchema)