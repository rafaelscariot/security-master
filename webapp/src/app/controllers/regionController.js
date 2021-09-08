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
}

module.exports = regionController;