const response = require('../../../utils/response');
const controller = require('./controller');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../../config/index');

const userController = require('../user/controller');
const userModel = require('../../../models/users');

const boom = require('@hapi/boom');

//Basic Strategy
require('../../../utils/auth/strategies/basic');

function authService(injectedStore) {
    let store = injectedStore;
    const Controller = controller(store);
    const DEFAULT_PROFILE = 'master';

    const signIn = async (req, res, next) => {

        passport.authenticate('basic', function (error, user) {
            try {
                if (error || !user)
                    next(boom.unauthorized('Authenticate Process Failed'));

                req.login(user, { session: false }, async (error) => {
                    if (error)
                        next(error);

                    console.log(user);
                    const apiKey = await Controller.getApiKey(user.type);

                    if (!apiKey)
                        next(boom.unauthorized('Invalid user type'));

                    const { _id: id, name, email } = user;
                    const payload = {
                        sub: id,
                        name,
                        email,
                        scopes: apiKey.scopes
                    };

                    const token = jwt.sign(payload, config.AUTH_JWT_SECRET, {
                        expiresIn: '60m'
                    });

                    return response.success(req, res, { token, user: user }, 200);
                });
            } catch (error) {
                next(error)
            }
        })(req, res, next);
    };

    const signUp = async (req, res, next) => {
        const UserController = userController(userModel);
        const user = req.body;
        try {
            const findUser = await UserController.getUserByEmail(user.email);
            if (findUser)
                next(boom.unauthorized('Email already exists'));
            else {
                //assign default profile
                if (!user.type)
                    user.type = DEFAULT_PROFILE;

                const createdUser = await UserController.createUser(user);
                response.success(req, res, createdUser, 201);
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    return {
        signIn,
        signUp
    }
}

module.exports = authService;