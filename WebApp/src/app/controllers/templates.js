templates = app => {
    app.get('/', async (req, res) => {
        try {
            res.marko(require('../views/base/home/home.marko'));
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    });

    app.get('/securitymaster/home', async (req, res) => {
        try {
            res.marko(require('../views/base/securitymaster/home.marko'));
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    });

    app.get('/securitymaster/suspectactivities', async (req, res) => {
        try {
            res.marko(require('../views/base/securitymaster/suspectactivities.marko'));
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    });

    app.get('/securitymaster/profile', async (req, res) => {
        try {
            res.marko(require('../views/base/securitymaster/profile.marko'));
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    });

    app.get('/securitymaster/register/region', async (req, res) => {
        try {
            res.marko(require('../views/base/securitymaster/registerregion.marko'));
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    });

    app.get('/securitymaster/monitoring', async (req, res) => {
        try {
            res.marko(require('../views/base/securitymaster/monitoring.marko'));
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    });

    app.get('/error', async (req, res) => {
        try {
            res.marko(require('../views/base/errors/500.marko'));
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    });

    app.get('*', async (req, res) => {
        try {
            res.status(404).marko(require('../views/base/errors/404.marko'));
        } catch (err) {
            return res.status(400).send({ error: err });
        }
    });
}

module.exports = templates;