// const sqlite3 = require('sqlite3').verbose();
// const bd = new sqlite3.Database('data.db');

// const USERS_SCHEMA = `
//     CREATE TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         full_name VARCHAR(40) NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL
//     )
// `;

// const REGIONS_SCHEMA = `
//     CREATE TABLE IF NOT EXISTS regions (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name VARCHAR(40) NOT NULL,
//         description VARCHAR(80) NOT NULL,
//         startTime VARCHAR(10) NOT NULL,
//         endTime VARCHAR(10) NOT NULL,
//         userID INTEGER NOT NULL
//     )
// `;

// const USERS_DEVICES = `
//     CREATE TABLE IF NOT EXISTS users_devices (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         userID INTEGER NOT NULL,
//         chat_id VARCHAR(9) UNIQUE NOT NULL
//     )
// `;

// const SUSPECT_ACTIVITIES = `
//     CREATE TABLE IF NOT EXISTS suspect_activities (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         video_src VARCHAR(40) UNIQUE NOT NULL,
//         ocurred_date VARCHAR(20) NOT NULL,
//         userID INTEGER NOT NULL
//     )
// `;

// const ALERTS_HISTORY = `
//     CREATE TABLE IF NOT EXISTS alerts_history (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         userID INTEGER NOT NULL,
//         date VARCHAR(30) NOT NULL,
//         hour VARCHAR(30) NOT NULL
//     )
// `;

// bd.serialize(() => {
//     bd.run("PRAGMA foreign_keys=ON");
//     bd.run(USERS_SCHEMA);
//     bd.run(REGIONS_SCHEMA);
//     bd.run(USERS_DEVICES);
//     bd.run(SUSPECT_ACTIVITIES);
//     bd.run(ALERTS_HISTORY);

//     // bd.each("SELECT * FROM alerts_history", (err, data) => {
//     //     if (err) {
//     //         console.log(err)
//     //     } else {
//     //         console.log(data);
//     //     }
//     // });
// });

// process.on('SIGINT', () =>
//     bd.close(() => {
//         console.log('[INFO] Database finished!');
//         process.exit(0);
//     })
// );

// module.exports = bd;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/security_master', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.Promise = global.Promise;

module.exports = mongoose;