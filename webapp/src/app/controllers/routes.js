const DeviceModel = require('../models/Device');
const UserService = require('../services/UserService');
const getUserId = require('../public/js/getUserId');

routes = app => {
    app.get('/user/:token', async (req, res) => {
        try {
            const { token } = req.params;
            const response = await new UserService().userById(token);
            res.status(200).send(response);
        } catch (err) {
            console.log('[USER BY ID ERROR] ' + err);
            res.status(404).send({ message: String(err) });
        }
    });

    app.put('/user', async (req, res) => {
        try {
            const { token, newPassword, name, email } = req.body;
            const response = await new UserService().update(token, newPassword, name, email);
            res.status(200).send(response);
        } catch (err) {
            console.log('[UPDATE USER ERROR] ' + err);
            res.status(400).send({ message: String(err) });
        }
    });

    app.post('/chatId', async (req, res) => {
        try {
            const { token, chatId, surname } = req.body;

            let ok = true;

            if (chatId === '' || isNaN(chatId))
                ok = false;

            if (surname === '')
                ok = false;

            if (ok) {
                const userIdPromise = getUserId(token);

                await userIdPromise.then(v => {
                    const userId = v.data.userId;

                    DeviceModel.create({
                        userId,
                        chatId,
                        surname
                    }).then(() => {
                        res.status(200).send({});
                    }).catch(error => {
                        console.log(error)
                        res.status(400).send({ error });
                    });
                });
            } else
                res.status(404).send({});
        } catch (error) {
            console.log('[REGISTER CHAT ID ERROR] ' + error);
            return res.status(400).send({ error });
        }
    });

    app.get('/device/:token', async (req, res) => {
        try {
            const { token } = req.params;

            const userIdPromise = getUserId(token);

            await userIdPromise.then(v => {
                const userId = v.data.userId;

                DeviceModel.find({ userId }, (err, docs) => {
                    if (err) {
                        console.log(err);
                    } if (docs === null || !docs) {
                        res.status(404).send({});
                    } else {
                        res.status(200).send(docs);
                    }
                });
            });
        } catch (err) {
            console.log('[SEARCH USER ERROR] ' + err);
            return res.status(400).send({ error: err });
        }
    });

    app.delete('/device/:chatId', async (req, res) => {
        const { chatId } = req.params;

        DeviceModel.deleteOne({ chatId }, error => {
            if (error) {
                res.status(400).send({ message: error });
            }
            res.status(200).send({ message: 'OK' });
        });
    });

    app.post('/region', async (req, res) => {
        const { region, ipCam, description, startTime, endTime, token } = req.body;

        res.status(200).send({ message: 'OK' });
    });
}

module.exports = routes;