const SuspectActivitieService = require("../services/SuspectActivitieService");

suspectActivitieController = (app) => {
  app.post("/activitie", async (req, res) => {
    try {
      const { userId, type, occurredRegion } = req.body;
      const response = await new SuspectActivitieService().register(
        userId,
        type,
        occurredRegion
      );
      res.status(200).send(response);
    } catch (error) {
      console.log(`REGISTER ACTIVITIE: ${error}`);
      res.status(400).send({ message: String(error) });
    }
  });

  app.get("/activitie/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const response = await new SuspectActivitieService().searchById(token);
      res.status(200).send(response);
    } catch (error) {
      console.log(`SEARCH ACTIVITIE BY ID: ${error}`);
      res.status(400).send({ message: String(error) });
    }
  });
};

module.exports = suspectActivitieController;
