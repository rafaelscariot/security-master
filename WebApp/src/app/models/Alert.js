const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
    userId: {
        type: Integer,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Alert = mongoose.model('Alert', AlertSchema);

module.exports = Alert;