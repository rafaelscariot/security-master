require("dotenv").config();

const mongoose = require("mongoose");

const { MONGODB_USER, MONGODB_PASS, MONGODB_DATABASE, MONGODB_HOST } =
  process.env;

mongoose.connect(
  `mongodb://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_HOST}/${MONGODB_DATABASE}`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);

mongoose.Promise = global.Promise;
module.exports = mongoose;
