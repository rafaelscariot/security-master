const mongoose = require('mongoose');

const SuspectActivitieSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    ocurredDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

const SuspectActivitie = mongoose.model('SuspectActivitie', SuspectActivitieSchema);

module.exports = SuspectActivitie;