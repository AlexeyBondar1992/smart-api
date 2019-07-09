const { statuses: { badRequest }, errorMessages, dataBases } = require('../constants');
const { redisClient } = require('../dataBases/redis');
const jwt = require('jsonwebtoken');

const signinAuthentication = (db, bcrypt) => (req, res) => {
    const { authorization } = req.headers;
    const sessionPromise = authorization ?
        getAuthTokenId(authorization) :
        handleSignin(db, bcrypt, req)
            .then(user => user.id && user.email ? createSessions(user) : Promise.reject(user));

    return sessionPromise
            .then(session => res.json(session))
            .catch(err => res.status(badRequest).json(err));
};

function getAuthTokenId (authorization) {
    return new Promise((resolve, reject) => {
        redisClient.get(authorization, (err, reply) => {
            if (err || !reply) {
                reject(errorMessages.unauthorized);
            } else {
                resolve({ userId: reply, success: true });
            }
        });
    });

}

function handleSignin (db, bcrypt, req) {
    const { email, password } = req.body;
    const dbEmail = dataBases.login.email;

    if (!email || !password) {
        return Promise.reject(errorMessages.submission);
    }

    return db.select(dbEmail, dataBases.login.hash).from(dataBases.login.root)
        .where(dbEmail, '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);

            if (isValid) {
                return db.select('*').from(dataBases.users.root)
                    .where(dataBases.users.email, '=', email)
                    .then(user => user[0])
                    .catch(() => Promise.reject(errorMessages.getUser));
            } else {
                return Promise.reject(errorMessages.credentials);
            }
        })
        .catch(() => Promise.reject(errorMessages.credentials));
}


function createSessions (user) {
    const { email, id } = user;
    const token = signToken(email);

    return setToken(token, id)
        .then(() => ({ success: true, userId: id, token }))
        .catch(console.log);

}

function signToken (email) {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '2 hours' });
}

function setToken (key, value) {
    return Promise.resolve(redisClient.set(key, value));
}

module.exports = { signinAuthentication };
