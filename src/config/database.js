const mongoose = require("mongoose");

mongoose.connect("mongodb://mongodb/security_master", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
