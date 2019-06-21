const statuses = {
    badRequest: 400,
    notAuthorized: 401
};
const errorMessages = {
    API: 'Unable to work with API',
    entries: 'Unable to get entries',
    notFound: 'Not found',
    user: 'Error getting user',
    getUser: 'Unable to get user',
    submission: 'Incorrect form submission',
    registration: 'Unable to register',
    credentials: 'Wrong credentials',
    update: 'Unable to update',
    unauthorized: 'Unauthorized'
};
const defaultPort = 3000;
const serverPort = process.env.PORT || defaultPort;

module.exports = {
    statuses,
    serverPort,
    errorMessages
};