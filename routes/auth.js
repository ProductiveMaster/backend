const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const apiKeysService = require('../services/apiKey');
const userService = require('../services/users');

const userSchema = require('../models/users');

const config = require('../config');

require('../utils/auth/basic');

function authApi(app) {
    const router = express.Router();
    app.use('/api/auth', router);

    const apiKeysService = new apiKeysService();
    const userService = new userService();

    router.post('/sign-in', async function (req, res, next) {
        try {
            const { apiKeyToken } = req.body;

            if (!apiKeysService) {
                next(boom.unauthorized('apiKeyToken is required'));
            }

            passport.authenticate('basic', function (error, user) {
                if (error || !user)
                    next(boom.unauthorized());

                req.login(user, { session: false }, async function (error) {
                    if (error)
                        next(error);

                    const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });

                    if (!apiKey)
                        next(boom.unauthorized());

                    const { _id: id, name, email, imgPath } = user;
                    const payload = {
                        sub: _id,
                        name,
                        email,
                        imgPath,
                        scopes: apiKey.scopes
                    };
                    const token = jwt.sign(payload, config.authJwtSecret, {
                        expiresIn: '30m'
                    });
                    return res.status(200).json({ token, user: { id, name, email } });
                });
            })(req, res, next);
        } catch (err) {
            next(err);
        }
    });
}