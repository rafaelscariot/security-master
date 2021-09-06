const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');
const authMiddleware = require('../middlewares/auth');

auth = app => {
    app.post('/authenticate', async (req, res) => {
        try {
            const { email, password } = req.body;

            let token = undefined;

            if (!email || !password || email === '' || password === '') {
                res.send({ error: true, status: "E-mail ou senha inválidos!" });
            }

            const user = await User.findOne({ email }).select('+password');

            if (!user) {
                res.send({ error: true, status: "E-mail não cadastrado!" });
            }

            if (!await bcrypt.compare(password, user.password)) {
                res.send({ error: true, status: "Senha incorreta!" });
            } else {
                user.password = undefined;

                token = jwt.sign({ id: user.id }, authConfig.secret, {
                    expiresIn: 86400
                });

                res.send({
                    error: false,
                    fullName: user.fullName,
                    token
                });
            }
        } catch (err) {
            console.log('[USER AUTHENTICATION ERROR] ' + err)
            return res.send({ error: true, status: String(err) });
        }
    });

    app.post('/user', async (req, res) => {
        try {
            const { fullName, emailRegister, passwordRegister, repeatPassword } = req.body;

            let responseStatus = 'Ok';
            let ok = false;

            if (emailRegister === '' || passwordRegister === '' || fullName === '' || repeatPassword === '') {
                responseStatus = 'Preencha todos os campos!';
            } else if (fullName.length < 4) {
                responseStatus = 'Nome inválido!';
            } else if (passwordRegister.length < 4) {
                responseStatus = 'Sua senha deve ter ao menos 4 caracteres!';
            } else if (passwordRegister !== repeatPassword) {
                responseStatus = 'Senhas não conferem!';
            } else { ok = true }

            if (await User.findOne({ emailRegister })) {
                responseStatus = 'E-mail já cadastrado';
                ok = false;
            }

            if (ok) {
                let cryptHash = bcrypt.hashSync(passwordRegister, 10);

                await User.create({
                    fullName,
                    email: emailRegister,
                    password: cryptHash
                });

                res.send({ error: false, status: responseStatus });
            } else {
                res.send({ error: true, status: responseStatus });
            }
        } catch (err) {
            console.log('[USER REGISTER ERROR] ' + err)
            return res.send({ error: true, status: "E-mail já cadastrado" });
        }
    });

    app.post('/token/validator', async (req, res) => {
        try {
            const { token } = req.body;

            const tokenFormated = 'Bearer ' + token;

            const tokenValidator = authMiddleware(tokenFormated);

            let error = true;
            let status = 'Invalid token';

            if (tokenValidator.error === false) {
                error = false;
                status = tokenValidator.status;
            }

            return res.send({ error, status })
        } catch (err) {
            console.log('[TOKEN VALIDATOR ERROR] ' + err)
            return res.send({ error: true, status: String(err) });
        }
    });
}

module.exports = auth;