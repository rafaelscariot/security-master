const DeviceService = require("../services/DeviceService");

deviceController = (app) => {
  app.get("/device/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const response = await new DeviceService().searchById(token);
      res.status(200).send(response);
    } catch (error) {
      console.info(`DEVICE BY ID: ${error}`);
      res.status(404).send({ message: String(error) });
    }
  });

  app.get("/device/surveillance/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const response = await new DeviceService().searchByUserId(userId);
      res.status(200).send(response);
    } catch (error) {
      console.info(`DEVICE BY USER ID: ${error}`);
      res.status(404).send({ message: String(error) });
    }
  });

  app.get("/device", async (req, res) => {
    try {
      const response = await new DeviceService().searchAll();
      res.status(200).send(response);
    } catch (error) {
      console.info(`ALL DEVICES: ${error}`);
      res.status(404).send({ message: String(error) });
    }
  });

  app.post("/device", async (req, res) => {
    try {
      const { token, chatId, surname } = req.body;
      const response = await new DeviceService().register(
        token,
        chatId,
        surname
      );
      res.status(200).send(response);
    } catch (error) {
      console.info(`REGISTER DEVICE: ${error}`);
      res.status(400).send({ message: String(error) });
    }
  });

  app.delete("/device/:chatId", async (req, res) => {
    try {
      const { chatId } = req.params;
      const response = await new DeviceService().delete(chatId);
      res.status(200).send(response);
    } catch (error) {
      console.info(`DELETE DEVICE: ${error}`);
      res.status(400).send({ message: String(error) });
    }
  });
};

module.exports = deviceController;
