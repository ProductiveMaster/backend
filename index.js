const express = require('express');
const cors = require('cors');

const config = require('./config/index');
const db = require('./lib/db');

const { logErrors, errorHandler, } = require('./utils/middleware/errorHandler');

//Routes Call
const userRoutes = require('./api/components/user/routes');
const authRoutes = require('./api/components/auth/routes');
const jobOfferRoutes = require('./api/components/jobOffer/routes');
const masterStudentRoutes = require('./api/components/masterStudent/routes');
const jobApplicationRoutes = require('./api/components/jobApplication/routes');
const companyRoutes = require('./api/components/company/routes');

//Models
const User = require('./models/users');
const ApiKey = require('./models/apiKeys');
const JobOffer = require('./models/jobOffers');
const MasterStudent = require('./models/masterStudents');
const JobApplication = require('./models/jobApplications');
const Company = require('./models/companies');


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
jobOfferRoutes(app, JobOffer);
masterStudentRoutes(app, MasterStudent);
jobApplicationRoutes(app, JobApplication);
companyRoutes(app, Company);


app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Server Listening at http://localhost:${config.port}`);
})