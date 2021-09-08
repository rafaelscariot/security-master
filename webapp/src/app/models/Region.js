const mongoose = require('mongoose');

const RegionsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    ipCam: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true
    }
});

const Region = mongoose.model('Region', RegionsSchema);

module.exports = Region;