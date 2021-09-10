const DeviceService = require('../services/DeviceService');

deviceController = app => {
    app.get('/device/:token', async (req, res) => {
        try {
            const { token } = req.params;
            const response = await new DeviceService().search(token);
            res.status(200).send(response);
        } catch (error) {
            console.log(`DEVICE BY ID: ${error}`);
            res.status(404).send({ message: String(error) });
        }
    });

    app.post('/device', async (req, res) => {
        try {
            const { token, chatId, surname } = req.body;
            const response = await new DeviceService().register(token, chatId, surname);
            res.status(200).send(response);
        } catch (error) {
            console.log(`REGISTER DEVICE: ${error}`);
            res.status(400).send({ message: String(error) });
        }
    });

    app.delete('/device/:chatId', async (req, res) => {
        try {
            const { chatId } = req.params;
            const response = await new DeviceService().delete(chatId);
            res.status(200).send(response);
        } catch (error) {
            console.log(`DELETE DEVICE: ${error}`);
            res.status(400).send({ message: String(error) });
        }
    });
}

module.exports = deviceController;