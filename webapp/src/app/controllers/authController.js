const AuthService = require('../services/AuthService.js');

authController = app => {
    app.post('/authenticate', async (req, res) => {
        try {
            const { email, password } = req.body;
            let response = await new AuthService().authentication(email, password);
            res.status(200).send(response);
        } catch (err) {
            console.log(`USER AUTHENTICATION: ${err}`)
            res.status(401).send({ message: String(err) });
        }
    });

    app.post('/user', async (req, res) => {
        try {
            const { fullName, email, password, repeatPassword } = req.body;
            let response = await new AuthService().register(fullName, email, password, repeatPassword)
            res.status(200).send(response);
        } catch (err) {
            console.log(`USER REGISTER: ${err}`)
            res.status(400).send({ message: String(err) });
        }
    });

    app.post('/token/validator', async (req, res) => {
        try {
            const { token } = req.body;
            let response = await new AuthService().tokenValidator(token);
            res.status(200).send(response);
        } catch (err) {
            console.log(`TOKEN VALIDATOR: ${err}`)
            res.status(401).send({ message: String(err) });
        }
    });
}

module.exports = authController;