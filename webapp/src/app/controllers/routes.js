const UserModel = require('../models/User');
const DeviceModel = require('../models/Device');
const getUserId = require('../public/js/getUserId');
const bcrypt = require('bcrypt');

routes = app => {
    app.get('/user/:token', async (req, res) => {
        try {
            const { token } = req.params;

            const userIdPromise = getUserId(token);

            await userIdPromise.then(v => {
                const userId = v.data.userId;

                UserModel.findById(userId, (err, docs) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send({
                            'email': docs.email,
                            'fullName': docs.fullName,
                            'password': docs.password
                        })
                    }
                }).select('+password');
            });
        } catch (err) {
            console.log('[SEARCH USER ERROR] ' + err);
            return res.status(400).send({ error: err });
        }
    });

    app.put('/user', async (req, res) => {
        try {
            const { token, newPassword, name, email } = req.body;

            if (name === '' || newPassword === '' || email === '') {
                res.status(404).send({});
            }

            const userIdPromise = getUserId(token);

            let cryptHash = bcrypt.hashSync(newPassword, 10);

            await userIdPromise.then(v => {
                const userId = v.data.userId;

                const update = { fullName: name, password: cryptHash, email };

                UserModel.updateOne({ _id: userId }, update, { new: true }, (err, doc) => {
                    if (err)
                        console.log(err);
                    else
                        res.send({ 'status': 200 });
                });
            });
        } catch (err) {
            console.log('[CHANGE USER INFORMATION ERROR] ' + err);
            return res.status(400).send({ error: err });
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