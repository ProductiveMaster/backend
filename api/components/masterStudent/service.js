const response = require('../../../utils/response');
const controller = require('./controller');
const boom = require('@hapi/boom');

function studentsService(injectedStore) {
    let store = injectedStore;
    const Controller = controller(store);

    const getStudents = async (req, res, next) => {
        try {
            const students = await Controller.getStudents();
            response.success(req, res, students, 200);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    const getStudent = async(req, res, next) => {
        const { params } = req;
        try {
            const student = await Controller.getStudent({ _id:params.studentId });
            if(student) 
                response.success(req, res, student, 200);
            else
                next(boom.notFound('Master Student not found'));
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    const createStudent = async(req, res, next) => {
        const { body: data } = req;
        try {
            const createdStudent = await Controller.createStudent(data);
            response.success(req, res, createdStudent, 201);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    const updateStudent = async(req, res, next) => {
        const { params } = req;
        const { body: data } = req;
        try {
            const updatedStudent = await Controller.updateStudent(params.studentId, data);
            if(!updatedStudent)
                next(boom.notFound('Master Student not found'));
            else
                response.success(req, res, updatedStudent, 200);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        } 
    }

    const deleteStudent = async(req, res, next) => {
        const { params } = req;
        try {
            const deletedStudent = await Controller.deleteStudent(params.studentId);
            if(!deletedStudent)
                next(boom.notFound('Master Student not found'));
            else
                response.success(req, res, deletedStudent, 201);
        } catch (error) {
            next(boom.boomify(error, { statusCode: 500 }));
        }
    }

    return {
        createStudent,
        updateStudent,
        deleteStudent,
        getStudent,
        getStudents
    }
}

module.exports = studentsService;