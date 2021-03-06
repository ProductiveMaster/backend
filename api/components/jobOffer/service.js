const response = require('../../../utils/response');
const controller = require('./controller');
const boom = require('@hapi/boom');
const userController = require('../user/controller');
const userModel = require('../../../models/users');


function jobOffersService(injectedStore) {
    let store = injectedStore;
    const Controller = controller(store);

    const getOffers = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page);
            const offers = await Controller.getOffers(page);
            response.success(req, res, offers, 200);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    const getOffer = async(req, res, next) => {
        const { params } = req;
        try {
            const offer = await Controller.getOffer({ _id:params.offerId });
            if(offer) 
                response.success(req, res, offer, 200);
            else
                next(boom.notFound('Offer not found'));
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    const createOffer = async(req, res, next) => {
        const { body: data } = req;
        try {
            const createdOffer = await Controller.createOffer(data);
            //const notifyUsers = await notifyCandidates(createdOffer);

            response.success(req, res, createdOffer, 201);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    const updateOffer = async(req, res, next) => {
        const { params } = req;
        const { body: data } = req;
        try {
            const updatedOffer = await Controller.updateOffer(params.offerId, data);
            if(!updatedOffer)
                next(boom.notFound('Offer not found'));
            else
                response.success(req, res, updatedOffer, 200);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        } 
    }

    const deleteOffer = async(req, res, next) => {
        const { params } = req;
        try {
            const deletedOffer = await Controller.deleteOffer(params.offerId);
            if(!deletedOffer)
                next(boom.notFound('Offer not found'));
            else
                response.success(req, res, deletedOffer, 201);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    const searchOffers = async(req, res, next) => {
        const { params } = req;
        const type = req.query.type;
        try {
            const searchResult = await Controller.search(params.filter, type);
            response.success(req, res, searchResult, 200);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    const notifyCandidates = async (offer) => {
        console.log("Entra a notificación de vacantes", offer);
        const UserController = userController(userModel);
        const candidates = await UserController.getUsersBySkills(offer.skills);
        requiredSkills = { ...offer.skills };
        candidates.map((candidate) => {
            let weight = 100 / requiredSkills.length;
            //let
            console.log(candidate); 
        });

    }


    return {
        createOffer,
        updateOffer,
        deleteOffer,
        getOffer,
        getOffers,
        searchOffers,
        notifyCandidates
    }
}

module.exports = jobOffersService;