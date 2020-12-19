const express = require('express');
const cors = require('cors');

const config = require('./config/index');
const db = require('./lib/db');

const app = express();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({
    extended: false
}));

app.get('/api', (req, res) => {
    res.send('Hello World');
});

//Database Connect
db.connect();


app.listen(config.port, () => {
    console.log(`Server Listening at http://localhost:${config.port}`);
})