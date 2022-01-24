const SuspectActivitieService = require("../services/SuspectActivitieService");

suspectActivitieController = (app) => {
  app.post("/activitie", async (req, res) => {
    try {
      const response = await new SuspectActivitieService().register(req.body);
      res.status(200).send(response);
    } catch (error) {
      console.info(`REGISTER ACTIVITIE: ${error}`);
      res.status(400).send({ message: String(error) });
    }
  });

  app.get("/activitie/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const response = await new SuspectActivitieService().searchById(token);
      res.status(200).send(response);
    } catch (error) {
      console.info(`SEARCH ACTIVITIE BY ID: ${error}`);
      res.status(400).send({ message: String(error) });
    }
  });
};

module.exports = suspectActivitieController;
