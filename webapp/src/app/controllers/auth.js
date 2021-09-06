const authMiddleware = require('../middlewares/auth');
const UserService = require('../services/UserService.js');

auth = app => {
    app.post('/authenticate', async (req, res) => {
        try {
            const { email, password } = req.body;
            let response = await new UserService().authentication(email, password);
            res.send(response);
        } catch (err) {
            console.log('[USER AUTHENTICATION ERROR] ' + err)
            return res.send({ error: true, status: String(err) });
        }
    });

    app.post('/user', async (req, res) => {
        try {
            const { fullName, email, password, repeatPassword } = req.body;
            let response = await new UserService().register(fullName, email, password, repeatPassword)
            res.send(response);
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