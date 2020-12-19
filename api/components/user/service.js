const response = require('../../../utils/response');
const controller = require('./controller');
const boom = require('@hapi/boom');

function userService(injectedStore) {
    let store = injectedStore;
    const Controller = controller(store);

    const getUsers = async (req, res, next) => {
        try {
            const users = await Controller.getUsers();
            response.success(req, res, users, 200);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    const getUser = async (req, res, next) => {
        const { params } = req;
        try {
            const user = await Controller.getUser(params.userId);
            if (user) {
                response.success(req, res, user, 200);
            } else {
                next(boom.notFound('User not found'));
            }
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    };

    const createUser = async (req, res, next) => {
        const { body: data } = req;
        try {
            const createdUser = await Controller.createUser(data);
            response.success(req, res, createdUser, 201);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    };

    const updateUser = async (req, res, next) => {
        const { params } = req;
        const { body: data } = req;

        try {
            const updatedUser = await Controller.updateUser(params.userId, data);

            if (!updatedUser)
                next(boom.notFound('User not found'));
            else
                response.success(req, res, updatedUser, 200);

        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    };

    const deleteUser = async (req, res, next) => {
        const { params } = req;
        try {
            const deletedUser = await Controller.deleteUser(params.userId);
            if (!deletedUser)
                next(boom.notFound('User not found'));
            else
                response.success(req, res, deletedUser, 201);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    };

    const verifyUser = async (email) => {
        const verifiedUser = await Controller.getUserByEmail(email);
        return verifiedUser;
    }

    return {
        createUser,
        updateUser,
        deleteUser,
        getUsers,
        getUser,
        verifyUser
    }
}

module.exports = userService;