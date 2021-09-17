require('./database');

require('marko/node-require').install();
require('marko/express');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use('/static', express.static('src/app/public'));
app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));

// application routes
require('../app/controllers/suspectActivitieController.js')(app);
require('../app/controllers/deviceController.js')(app);
require('../app/controllers/regionController.js')(app);
require('../app/controllers/userController.js')(app);
require('../app/controllers/templateController.js')(app);
require('../app/controllers/authController.js')(app);

module.exports = app;