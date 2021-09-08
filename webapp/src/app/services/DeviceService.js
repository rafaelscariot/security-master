const DeviceModel = require('../models/Device');
const getUserId = require('../public/js/getUserId');

class DeviceService {
    async register(token, chatId, surname) {
        try {
            if (chatId === '' || isNaN(chatId) || surname === '') {
                throw new Error(`Chat ID ${chatId} ou apelido ${surname} inválido`);
            }

            if (await DeviceModel.findOne({ chatId })) {
                throw new Error(`Chat ID ${chatId} já cadastrado`);
            }

            if (await DeviceModel.findOne({ surname })) {
                throw new Error(`Apelido ${surname} já cadastrado`);
            }

            const userIdPromise = getUserId(token);

            await userIdPromise.then(user => {
                const userId = user.data.userId;

                DeviceModel.create({
                    userId,
                    chatId,
                    surname
                }).then(() => {
                    return { message: 'OK' };
                }).catch(error => {
                    throw new Error(error);
                });
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async deviceById(token) {
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

    async delete(chatId) {
        try {
            if (!await DeviceModel.findOne({ chatId })) {
                throw new Error(`Chat ID ${chatId} não cadastrado`);
            }

            return DeviceModel.deleteOne({ chatId }, error => {
                if (error) {
                    throw new Error(error);
                }

                return { message: 'OK' };
            });
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = DeviceService;