const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Please add some text']
  },
  userName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: 'Movie',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// Prevent user from submitting more than one review per movie
//ReviewSchema.index({ movie: 1, user: 1 }, { unique: true });

// // Static method to get avg rating and save
// ReviewSchema.statics.getAverageRating = async function(movieId) {
//   const obj = await this.aggregate([
//     {
//       $match: { movie: movieId }
//     },
//     {
//       $group: {
//         _id: '$movie',
//         averageRating: { $avg: '$rating' }
//       }
//     }
//   ]);

//   try {
//     await this.model('Movie').findByIdAndUpdate(movieId, {
//       averageRating: obj[0].averageRating
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// // Call getAverageCost after save
// ReviewSchema.post('save', async function() {
//   await this.constructor.getAverageRating(this.movie);
// });

// // Call getAverageCost before remove
// ReviewSchema.post('remove', async function() {
//   await this.constructor.getAverageRating(this.movie);
// });

module.exports = mongoose.model('Review', ReviewSchema);
