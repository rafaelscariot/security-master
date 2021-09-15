const DeviceModel = require('../models/Device');
const getUserId = require('../public/js/getUserId');

class DeviceService {
    async register(token, chatId, surname) {
        try {
            if (chatId === '' || isNaN(chatId) || surname === '') {
                throw new Error(`Chat ID ${chatId} ou apelido ${surname} inválido`);
            }

            const userIdPromise = getUserId(token);

            return await userIdPromise.then(user => {
                const userId = user.data.userId;

                return DeviceModel.find({ userId })
                    .then(devices => {
                        devices.forEach(device => {
                            if (device.chatId === chatId) {
                                throw new Error(`Chat ID ${chatId} já cadastrado`);
                            }
                        });

                        DeviceModel.create({
                            userId,
                            chatId,
                            surname
                        }).then(() => {
                            console.log(`Created device ${chatId}`);
                        }).catch(error => {
                            throw new Error(error);
                        });
                    });
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async searchById(token) {
        try {
            const userIdPromise = getUserId(token);

            return await userIdPromise.then(user => {
                const userId = user.data.userId;

                return DeviceModel.find({ userId }, (err, docs) => {
                    if (err) {
                        throw new Error(err);
                    }
                });
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async searchAll() {
        try {
            return DeviceModel.find({ userId }, (err, docs) => {
                if (err) {
                    throw new Error(err);
                }
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async delete(chatId) {
        try {
            if (!await DeviceModel.findOne({ chatId })) {
                throw new Error(`Chat ID ${chatId} não cadastrado`);
            }

            return DeviceModel.deleteOne({ chatId }, error => {
                if (error) {
                    throw new Error(error);
                }
            });
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = DeviceService;