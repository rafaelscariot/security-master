const RegionModel = require('../models/Region');
const getUserId = require('../public/js/getUserId');

class RegionService {
    async register(token, name, description, ipCam, startTime, endTime) {
        try {
            if (name === '' || description === '' || ipCam === '' || startTime === '' || endTime === '') {
                throw new Error('Campos inválidos');
            }

            if (await RegionModel.findOne({ name })) {
                throw new Error(`Região ${name} já cadastrada`);
            }

            if (await RegionModel.findOne({ ipCam })) {
                throw new Error(`Câmera IP ${ipCam} já cadastrada`);
            }

            const userIdPromise = getUserId(token);

            return await userIdPromise.then(user => {
                const userId = user.data.userId;

                RegionModel.create({
                    userId,
                    name,
                    description,
                    ipCam,
                    startTime,
                    endTime
                }).then(() => {
                    console.log(`Created region ${name}`);
                }).catch(error => {
                    throw new Error(error);
                });
            });
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = RegionService;