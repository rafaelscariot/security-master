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
    hour: {
        type: String,
        required: true
    },
    ipCam: {
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