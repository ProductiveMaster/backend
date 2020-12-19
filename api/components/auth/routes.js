
const { Router } = require("express");
const router = Router();
const passport = require('passport');
// // JWT Strategy
// require('../../../utils/auth/strategies/jwt');

const authService = require('./service');

function authRoutes(app, store) {
    const AuthService = authService(store);
    app.use('/api/auth', router);

    router.post('/sign-in', AuthService.signIn);
    router.post('/sign-up', AuthService.signUp);
}

module.exports = authRoutes;