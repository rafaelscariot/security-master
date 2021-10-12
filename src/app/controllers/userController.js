const UserService = require("../services/UserService");

userController = (app) => {
  app.get("/user/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const response = await new UserService().userById(token);
      res.status(200).send(response);
    } catch (err) {
      console.log(`SEARCH USER: ${err}`);
      res.status(404).send({ message: String(err) });
    }
  });

  app.put("/user", async (req, res) => {
    try {
      const { token, newPassword, name, email } = req.body;
      const response = await new UserService().update(
        token,
        newPassword,
        name,
        email
      );
      res.status(200).send(response);
    } catch (err) {
      console.log(`UPDATE USER: ${err}`);
      res.status(400).send({ message: String(err) });
    }
  });
};

module.exports = userController;
