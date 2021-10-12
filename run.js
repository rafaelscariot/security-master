const app = require("./src/config/custom-express");
const EnvironmentConfig = require("./src/config/environment");

app.listen(EnvironmentConfig.APP_PORT || 3000, () => {
  console.log(
    "[INFO] Server is running on port",
    EnvironmentConfig.APP_PORT || 3000
  );
});
