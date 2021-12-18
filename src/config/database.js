const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/security_master", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
