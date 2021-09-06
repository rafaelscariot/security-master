const mongoose = require('mongoose');

const RegionsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    userId: {
        type: Integer,
        required: true,
        unique: true
    }
});

const Region = mongoose.model('Region', RegionsSchema);

module.exports = Region;