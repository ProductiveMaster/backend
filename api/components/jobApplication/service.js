const response = require('../../../utils/response');
const controller = require('./controller');
const boom = require('@hapi/boom');

function jobApplicationsService(injectedStore) {
    let store = injectedStore;
    const Controller = controller(store);

    const getApplications = async (req, res, next) => {
        try {
            //const page = parseInt(req.query.page);
            const applications = await Controller.getApplications();
            response.success(req, res, applications, 200);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    const getApplication = async(req, res, next) => {
        const { params } = req;
        try {
            const application = await Controller.getApplication({ _id:params.applicationId });
            if(application) 
                response.success(req, res, application, 200);
            else
                next(boom.notFound('Job Application not found'));
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    const createApplication = async(req, res, next) => {
        const { body: data } = req;
        try {
            const createdApplication = await Controller.createApplication(data);
            response.success(req, res, createdApplication, 201);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    const updateApplication = async(req, res, next) => {
        const { params } = req;
        const { body: data } = req;
        try {
            const updatedApplication = await Controller.updateApplication(params.applicationId, data);
            if(!updatedApplication)
                next(boom.notFound('Job Application not found'));
            else
                response.success(req, res, updatedApplication, 200);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        } 
    }

    const deleteApplication = async(req, res, next) => {
        const { params } = req;
        try {
            const deletedApplication = await Controller.deleteApplication(params.applicationId);
            if(!deletedApplication)
                next(boom.notFound('Job Application not found'));
            else
                response.success(req, res, deletedApplication, 201);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    return {
        createApplication,
        updateApplication,
        deleteApplication,
        getApplication,
        getApplications
    }
}

module.exports = jobApplicationsService;