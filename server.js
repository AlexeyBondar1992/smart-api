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
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_URI
} = process.env;

const URI = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;
const db = knex({
    client: 'pg',
    connection: POSTGRES_URI || URI
});

const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());

app.get('/', (req, res) => db.select('*').from('users').then(users => res.send(JSON.stringify(users))));
app.post('/signin', signin.signinAuthentication(db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', auth.requireAuth, (req, res) => profile.handleProfileGet(req, res, db));
app.post('/profile/:id', auth.requireAuth, (req, res) => profile.handleProfileUpdate(req, res, db));
app.put('/image', auth.requireAuth, (req, res) => image.handleImage(req, res, db));
app.post('/imageurl', auth.requireAuth, (req, res) => image.handleApiCall(req, res));

app.listen(constants.serverPort, () => {
    console.log(`app is running on port ${constants.serverPort}`);
});
