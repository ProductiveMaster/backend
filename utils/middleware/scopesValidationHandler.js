
const boom = require('@hapi/boom');

function scopesValidationHandler(allowedScopes) {
    return (req, res, next) => {
        if (!req.user || (req.user && !req.user.scopes)) {
            next(boom.unauthorized('Missing Scopes'));
        }

        const permissions = allowedScopes
            .map(scope => req.user.scopes.includes(scope));
        
        const hasAcces = !permissions.includes(false);
            
        if (hasAcces) {
            next();
        } else {
            next(boom.unauthorized('nsufficient Scopes'));
        }
    }
}

module.exports = scopesValidationHandler;