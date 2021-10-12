const mongoose = require("mongoose");
const EnvironmentConfig = require("./environment");

mongoose.connect(
  EnvironmentConfig.MONGODB_URL || "mongodb://localhost:27017/security_master",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);

mongoose.Promise = global.Promise;

module.exports = mongoose;
