const UserModel = require('../models/User');
const getUserId = require('../public/js/getUserId');
const bcrypt = require('bcrypt');

class AuthService {
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
            throw new Error('Um erro inesperado ocorreu');
        }
    }

    async update(token, newPassword, name, email) {
        if (name === '' || newPassword === '' || email === '') {
            throw new Error('Campos inválidos');
        }

        const userIdPromise = getUserId(token);

        let cryptHash = bcrypt.hashSync(newPassword, 10);

        return await userIdPromise.then(user => {
            const userId = user.data.userId;

            if (UserModel.findById({ userId })) {
                throw new Error('E-mail já cadastrado');
            }

            const updateObject = { fullName: name, password: cryptHash, email };

            return UserModel.updateOne({ _id: userId }, updateObject, { new: true }, err => {
                if (err) {
                    throw new Error(err);
                }
            });
        });
    }
}

module.exports = AuthService;