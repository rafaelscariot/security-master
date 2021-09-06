const User = require('../models/User');
const Device = require('../models/Device');
const getUserId = require('../public/js/getUserId');
const db = require('../../config/database');
const bcrypt = require('bcrypt');

routes = app => {
    app.post('/search/user', async (req, res) => {
        try {
            const { token } = req.body;

            const userIdPromise = getUserId(token);

            await userIdPromise.then(v => {
                const userId = v.data.status;

                User.findById(userId, (err, docs) => {
                    if (err)
                        console.log(err);
                    else
                        res.send({
                            'email': docs.email,
                            'fullName': docs.fullName,
                            'password': docs.password
                        })
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
                const userId = v.data.status;

                console.log(name)

                const update = { fullName: name, password: cryptHash, email };

                User.updateOne({ _id: userId }, update, { new: true }, (err, doc) => {
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
                    const userId = v.data.status;

                    Device.create({
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

    app.post('/search/device', async (req, res) => {
        try {
            const { token } = req.body;

            const userIdPromise = getUserId(token);

            await userIdPromise.then(v => {
                const userId = v.data.status;

                Device.find({ userId }, (err, docs) => {
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

    app.delete('/device', async (req, res) => {
        const { chatId } = req.body;

        Device.deleteOne({ chatId }, error => {
            if (error) {
                res.status(400).send({});
            }
            res.status(200).send({});
        });
    });

    app.post('/register/region', (req, res) => {
        try {
            const { name, description, startTime, endTime, userID } = req.body;

            let status = ''
            let ok = false;

            if (name === '' || description === '' || startTime === '' || endTime === '' || userID === '') {
                status = 'Preencha todos os campos!';
            } else { ok = true }

            if (ok) {
                db.run(
                    'INSERT INTO regions (name, description, startTime, endTime, userID) VALUES (?, ?, ?, ?, ?)',
                    [name, description, startTime, endTime, userID],
                    err => {
                        if (err) {
                            console.log('[ERROR]:', err);
                        } else {
                            res.send({ 'status': 200 });
                        }
                    }
                );
            } else {
                res.send(status);
            }
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    });

    app.post('/search/regions', (req, res) => {
        try {
            const { userID } = req.body;

            db.all(
                'SELECT name, description, startTime, endTime FROM regions WHERE userID = ?',
                [userID],
                (err, rows) => {
                    if (err) {
                        console.log('[ERROR]', err);
                    }

                    if (rows === undefined || rows.length == 0) {
                        res.status(404);
                    }

                    res.status(200).send(rows);
                }
            );
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    });

    app.post('/search/alerts', (req, res) => {
        try {
            const { userID } = req.body;

            db.all(
                'SELECT userID, date, hour FROM alerts_history WHERE userID = ?',
                [userID],
                (err, rows) => {
                    if (err) {
                        console.log('[ERROR]', err);
                    }

                    if (rows === undefined || rows.length === 0) {
                        res.status(404);
                    }

                    res.status(200).send(rows);
                }
            );
        } catch (error) {
            return res.status(400).send({ error: err });
        }
    });
}

module.exports = routes;