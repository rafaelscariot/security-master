const UserModel = require('../models/User');
const getUserId = require('../public/js/getUserId');
const bcrypt = require('bcrypt');

class UserService {
    async userById(token) {
        try {
            const userIdPromise = getUserId(token);

            return await userIdPromise.then(user => {
                const userId = user.data.userId;

                return UserModel.findById(userId, err => {
                    if (err) {
                        throw new Error(err);
                    }
                });
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async update(token, newPassword, name, email) {
        if (name === '' || newPassword === '' || email === '') {
            throw new Error('Campos inválidos');
        }

        if (await UserModel.findOne({ email })) {
            throw new Error(`E-mail ${email} já cadastrado`);
        }

        const userIdPromise = getUserId(token);

        let cryptHash = bcrypt.hashSync(newPassword, 10);

        return await userIdPromise.then(user => {
            const userId = user.data.userId;

            const updateObject = { fullName: name, password: cryptHash, email };

            return UserModel.updateOne({ _id: userId }, updateObject, { new: true }, err => {
                if (err) {
                    throw new Error(err);
                }
            });
        });
    }
}

module.exports = UserService;