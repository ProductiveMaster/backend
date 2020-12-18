const express = require('express');

const config = require('./config/index');
const db = require('./lib/db');

const app = express();


db.connect();


app.listen(config.port, () => {
    console.log(`Server Listening at http://localhost:${config.port}`);
})