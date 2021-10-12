require("dotenv").config();

class EnvironmentConfig {
  APP_HOST = process.env.APP_HOST;
  APP_PORT = process.env.APP_PORT;
  MONGODB_URI = process.env.MONGODB_URI;
}

module.exports = EnvironmentConfig;
