templates = app => {
    app.get('/', async (req, res) => {
        try {
            res.marko(require('../../views/home/home.marko'));
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    });

    app.get('/securitymaster/home', async (req, res) => {
        try {
            res.marko(require('../../views/base/home.marko'));
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    });

    app.get('/securitymaster/profile', async (req, res) => {
        try {
            res.marko(require('../../views/base/profile.marko'));
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    });

    app.get('/securitymaster/region', async (req, res) => {
        try {
            res.marko(require('../../views/base/region.marko'));
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    });

    app.get('/error', async (req, res) => {
        try {
            res.marko(require('../../views/errors/500.marko'));
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    });

    app.get('*', async (req, res) => {
        try {
            res.status(404).marko(require('../views/errors/404.marko'));
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    });
}

module.exports = templates;