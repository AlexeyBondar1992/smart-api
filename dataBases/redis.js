const redisClient = require('redis').createClient(process.env.REDIS_URI);

module.exports = { redisClient };
