const { Router } = require("express");
const router = Router();
const passport = require('passport');

const studentsService = require('./service');

const scopesValidationHandler = require('../../../utils/middleware/scopesValidationHandler');

// JWT Strategy
require('../../../utils/auth/strategies/jwt');

function studentRoutes(app, store) {
    const StudentsService = studentsService(store);
    app.use('/api/masterStudents', router);

    router.post('/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['create:student']),
        StudentsService.createStudent);

    router.put('/:studentId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['update:student']),
        StudentsService.updateStudent);

    router.delete('/:studentId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['delete:student']),
        StudentsService.deleteStudent);

    router.get('/',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:student']),
        StudentsService.getStudents);

    router.get('/:studentId',
        passport.authenticate('jwt', { session: false }),
        scopesValidationHandler(['read:student']),
        StudentsService.getStudent);
}

module.exports = studentRoutes;