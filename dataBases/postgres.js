const knex = require('knex');

const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_URI
} = process.env;

const URI = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;
const postgresDB = knex({
    client: 'pg',
    connection: POSTGRES_URI || URI
});

module.exports = { postgresDB };
