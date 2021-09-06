const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');
const bcrypt = require('bcrypt');

class UserService {

    async authentication(email, password) {
        if (!email || !password || email === '' || password === '') {
            return {
                error: true,
                status: "E-mail ou senha inválidos!"
            };
        }

        let token = undefined;

        const user = await UserModel.findOne({ email }).select('+password');

        if (!user) {
            return { error: true, status: "E-mail não cadastrado!" };
        }

        if (!await bcrypt.compare(password, user.password)) {
            return { error: true, status: "Senha incorreta!" };
        } else {
            user.password = undefined;

            token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: 86400
            });

            return {
                error: false,
                fullName: user.fullName,
                token
            };
        }
    }

    async register(fullName, email, password, repeatPassword) {
        let responseStatus = 'Ok';
        let ok = false;

        if (email === '' || password === '' || fullName === '' || repeatPassword === '') {
            responseStatus = 'Preencha todos os campos!';
        } else if (fullName.length < 4) {
            responseStatus = 'Nome inválido!';
        } else if (password.length < 4) {
            responseStatus = 'Sua senha deve ter ao menos 4 caracteres!';
        } else if (password !== repeatPassword) {
            responseStatus = 'Senhas não conferem!';
        } else { ok = true }

        if (await UserModel.findOne({ email })) {
            responseStatus = 'E-mail já cadastrado';
            ok = false;
        }

        if (ok) {
            let cryptHash = bcrypt.hashSync(password, 10);

            await UserModel.create({
                fullName,
                email: email,
                password: cryptHash
            });

            return { error: false, status: responseStatus };
        } else {
            return { error: true, status: responseStatus };
        }
    }

}

module.exports = UserService;