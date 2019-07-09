require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./middlewares/authorization');
const constants = require('./constants');
const { postgresDB: db } = require('./dataBases/postgres');

const app = express();

app.use(cors());
app.use(compression());
app.use(express.static('build'));
app.use(bodyParser.json());

app.post('/signin', signin.signinAuthentication(db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', auth.requireAuth, (req, res) => profile.handleProfileGet(req, res, db));
app.post('/profile/:id', auth.requireAuth, (req, res) => profile.handleProfileUpdate(req, res, db));
app.put('/image', auth.requireAuth, (req, res) => image.handleImage(req, res, db));
app.post('/imageurl', auth.requireAuth, (req, res) => image.handleApiCall(req, res));

app.listen(constants.serverPort, () => console.log(`app is running on port ${constants.serverPort}`));
