const mongoose = require("mongoose");

const RegionsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  camStatus: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: false,
  },
  endTime: {
    type: String,
    required: false,
  },
  ipCam: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Region = mongoose.model("Region", RegionsSchema);

module.exports = Region;
