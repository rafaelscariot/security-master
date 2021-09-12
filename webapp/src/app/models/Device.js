const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    chatId: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    }
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;