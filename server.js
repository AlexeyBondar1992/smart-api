require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const compression = require('compression');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./middlewares/authorization');
const constants = require('./constants');

require('dotenv').config();

const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOSTNAME,
    DB_PORT,
    DB_DB_NAME
} = process.env;

const db = knex({
    client: 'pg',
    connection: {
        host: DB_HOSTNAME,
        user: DB_USERNAME,
        port: DB_PORT,
        password: DB_PASSWORD,
        database: DB_DB_NAME
    }
});

const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());

app.get('/', (req, res) => res.send(db.users));
app.post('/signin', signin.signinAuthentication(db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', auth.requireAuth, (req, res) => profile.handleProfileGet(req, res, db));
app.post('/profile/:id', auth.requireAuth, (req, res) => profile.handleProfileUpdate(req, res, db));
app.put('/image', auth.requireAuth, (req, res) => image.handleImage(req, res, db));
app.post('/imageurl', auth.requireAuth, (req, res) => image.handleApiCall(req, res));

app.listen(constants.serverPort, () => {
    console.log(`app is running on port ${constants.serverPort}`);
});
