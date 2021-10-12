const mongoose = require("mongoose");

const SuspectActivitieSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  occurredRegion: {
    type: String,
    required: true,
  },
  occurredDate: {
    type: Date,
    required: true,
  },
});

const SuspectActivitie = mongoose.model(
  "SuspectActivitie",
  SuspectActivitieSchema
);

module.exports = SuspectActivitie;
