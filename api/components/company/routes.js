const { Router } = require("express");
const router = Router();
const passport = require('passport');

const companyService = require('./service');

const scopesValidationHandler = require('../../../utils/middleware/scopesValidationHandler');

// JWT Strategy
require('../../../utils/auth/strategies/jwt');

function companyRoutes(app, store) {
    const CompanyService = companyService(store);
    app.use('/api/company', router);

    router.post('/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:company']),
        CompanyService.createCompany);

    router.put('/:companyId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['update:company']),
        CompanyService.updateCompany);

    router.delete('/:companyId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['delete:company']),
        CompanyService.deleteCompany);

    router.get('/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:company']),
        CompanyService.getCompanies);

    router.get('/:companyId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:company']),
        CompanyService.getCompany);
}

module.exports = companyRoutes;