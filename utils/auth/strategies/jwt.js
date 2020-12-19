const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const config = require('../../../config');
const userService = require('../../../api/components/user/service');
const userModel = require('../../../models/users');

const UserService = userService(userModel);

passport.use(
    new Strategy({
        secretOrKey: config.AUTH_JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
        async (tokenPayload, cb) => {
            try {
                const user = await UserService.verifyUser(tokenPayload.email);
                if (!user) {
                    return cb("Unauthorized", false);
                }
                delete user.password;
                return cb(null, { ...user, scopes: tokenPayload.scopes });
            } catch (error) {
                return cb(error);
            }
        })
);