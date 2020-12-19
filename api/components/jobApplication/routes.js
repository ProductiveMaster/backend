const { Router } = require("express");
const router = Router();
const passport = require('passport');

const applicationsService = require('./service');

const scopesValidationHandler = require('../../../utils/middleware/scopesValidationHandler');

// JWT Strategy
require('../../../utils/auth/strategies/jwt');

function jobApplicationsRoutes(app, store) {
    const ApplicationsService = applicationsService(store);
    app.use('/api/jobApplications', router);

    router.post('/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:jobapplication']),
        ApplicationsService.createApplication);

    router.put('/:applicationId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['update:jobapplication']),
        ApplicationsService.updateApplication);

    router.delete('/:applicationId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['delete:jobapplication']),
        ApplicationsService.deleteApplication);

    router.get('/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:jobapplication']),
        ApplicationsService.getApplications);

    router.get('/:applicationId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:jobapplication']),
        ApplicationsService.getApplication);
}

module.exports = jobApplicationsRoutes;