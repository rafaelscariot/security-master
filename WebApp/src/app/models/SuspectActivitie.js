const mongoose = require('mongoose');

const SuspectActivitieSchema = new mongoose.Schema({
    videoSrc: {
        type: String,
        required: true,
        unique: true
    },
    ocurredDate: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Integer,
        required: true,
        unique: true
    },
});

const SuspectActivitie = mongoose.model('SuspectActivitie', SuspectActivitieSchema);

module.exports = SuspectActivitie;