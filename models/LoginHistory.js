const mongoose = require('mongoose');

const LoginHistorySchema = new mongoose.Schema({
    loginTime: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Add a user id']
    },
})

module.exports = mongoose.model('LoginHistory', LoginHistorySchema);