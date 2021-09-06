const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    chatId: {
        type: String,
        unique: true,
        required: true,
    },
    surname: {
        type: String,
        unique: true,
        required: true,
    }
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;