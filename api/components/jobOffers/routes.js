const { Router } = require('express');
const router = Router();
const passport = require('passport');

const offersService = require('./service');

const scopesValidationHandler = require('../../../utils/middleware/scopesValidationHandler');

// JWT Strategy
require('../../../utils/auth/strategies/jwt');

function offersRoutes(app, store) {
    const OffersService = offersService(store);
    app.use('/api/jobOffers', router);

    router.post('/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:joboffer']),
        OffersService.createOffer);

    router.put('/:offerId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['update:joboffer']),
        OffersService.updateOffer);

    router.delete('/offerId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['delete:joboffer']),
        OffersService.deleteOffer);

    router.get('/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:joboffer']),
        OffersService.getOffers);

    router.get('/:offerId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:joboffer']),
        OffersService.getOffer);
}

module.exports = offersRoutes;