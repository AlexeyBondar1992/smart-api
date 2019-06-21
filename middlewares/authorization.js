const { statuses: { notAuthorized }, errorMessages } = require('../constants');
const { redisClient } = require('../controllers/signin');

const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(notAuthorized).json(errorMessages.unauthorized);
    }

    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return res.status(notAuthorized).json(errorMessages.unauthorized);
        }

        return next();
    });
};

module.exports = {
    requireAuth
};