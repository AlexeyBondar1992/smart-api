const { statuses: { notAuthorized }, errorMessages } = require('../constants');
const { redisClient } = require('../dataBases/redis');

const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;
    const errorResponse = () => res.status(notAuthorized).json(errorMessages.unauthorized);

    if (!authorization) {
        return errorResponse();
    }

    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply) {
            return errorResponse();
        }

        return next();
    });
};

module.exports = { requireAuth };
