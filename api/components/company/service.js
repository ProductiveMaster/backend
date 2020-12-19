const response = require('../../../utils/response');
const controller = require('./controller');
const boom = require('@hapi/boom');

function CompanyService(injectedStore) {
    let store = injectedStore;
    const Controller = controller(store);

    const getCompanies = async (req, res, next) => {
        try {
            const companies = await Controller.getCompanies();
            response.success(req, res, companies, 200);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    const getCompany = async(req, res, next) => {
        const { params } = req;
        try {
            const company = await Controller.getCompany({ _id:params.companyId });
            if(student) 
                response.success(req, res, company, 200);
            else
                next(boom.notFound('Company not found'));
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    const createCompany = async(req, res, next) => {
        const { body: data } = req;
        try {
            const createdCompany = await Controller.createCompany(data);
            response.success(req, res, createdCompany, 201);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    const updateCompany = async(req, res, next) => {
        const { params } = req;
        const { body: data } = req;
        try {
            const updatedCompany = await Controller.updateCompany(params.companyId, data);
            if(!updatedCompany)
                next(boom.notFound('Company not found'));
            else
                response.success(req, res, updatedCompany, 200);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        } 
    }

    const deleteCompany = async(req, res, next) => {
        const { params } = req;
        try {
            const deletedCompany = await Controller.deleteCompany(params.studentId);
            if(!deletedCompany)
                next(boom.notFound('Company not found'));
            else
                response.success(req, res, deletedCompany, 201);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    return {
        createCompany,
        updateCompany,
        deleteCompany,
        getCompany,
        getCompanies
    }
}

module.exports = CompanyService;