const RegionService = require('../services/RegionService');

regionController = app => {
    app.post('/region', async (req, res) => {
        try {
            const { token, region, description, ipCam, startTime, endTime } = req.body;
            const response = await new RegionService().register(token, region, description, ipCam, startTime, endTime);
            res.status(200).send(response);
        } catch (error) {
            console.log(`REGISTER REGION: ${error}`);
            res.status(400).send({ message: String(error) });
        }
    });

    app.get('/region/:token', async (req, res) => {
        try {
            const { token } = req.params;
            const response = await new RegionService().searchById(token);
            res.status(200).send(response);
        } catch (error) {
            console.log(`SEARCH REGION BY ID: ${error}`);
            res.status(400).send({ message: String(error) });
        }
    });

    app.get('/region', async (req, res) => {
        try {
            const response = await new RegionService().searchAll();
            res.status(200).send(response);
        } catch (error) {
            console.log(`SEARCH REGION: ${error}`);
            res.status(400).send({ message: String(error) });
        }
    });

    app.delete('/region/:name', async (req, res) => {
        try {
            const { name } = req.params;
            const response = await new RegionService().delete(name);
            res.status(200).send(response);
        } catch (error) {
            console.log(`DELETE REGION: ${error}`);
            res.status(400).send({ message: String(error) });
        }
    });
}

module.exports = regionController;