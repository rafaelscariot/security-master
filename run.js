const app = require("./src/config/custom-express");

app.listen(3000, () => {
  console.log("[INFO] Server is running on port", 3000);
});
