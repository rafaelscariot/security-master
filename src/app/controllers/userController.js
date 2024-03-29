const UserService = require("../services/UserService");

userController = (app) => {
  app.get("/user/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const response = await new UserService().userById(token);
      res.status(200).send(response);
    } catch (err) {
      console.info(`SEARCH USER: ${err}`);
      res.status(404).send({ message: String(err) });
    }
  });

  app.put("/user", async (req, res) => {
    try {
      const response = await new UserService().update(req.body);
      res.status(200).send(response);
    } catch (err) {
      console.info(`UPDATE USER: ${err}`);
      res.status(400).send({ message: String(err) });
    }
  });
};

module.exports = userController;
