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
const dataBases = {
   users: {
       root: 'users',
       id: 'id',
       email: 'email',
       entries: 'entries',
       name: 'name',
       joined: 'joined'
   },
   login: {
       root: 'login',
       email: 'email',
       hash: 'hash',
       id: 'id'
   }
};

module.exports = {
    statuses,
    serverPort,
    errorMessages,
    dataBases
};
