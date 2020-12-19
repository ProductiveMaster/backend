const express = require('express');
const cors = require('cors');

const config = require('./config/index');
const db = require('./lib/db');

const { logErrors, errorHandler, } = require('./utils/middleware/errorHandler');

//Routes Call
const userRoutes = require('./api/components/user/routes');
const authRoutes = require('./api/components/auth/routes');

//Models
const User = require('./models/users');
const ApiKey = require('./models/apiKeys');


const app = express();

app.use(cors());
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

//Routes
userRoutes(app, User);
authRoutes(app, ApiKey);

app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Server Listening at http://localhost:${config.port}`);
})