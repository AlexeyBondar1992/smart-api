const { statuses: { badRequest }, errorMessages } = require('../constants');

const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({ id })
        .then(user => user.length ? res.json(user[0]) : res.status(badRequest).json(errorMessages.notFound))
        .catch(() => res.status(badRequest).json(errorMessages.user));
};
const handleProfileUpdate =  (req, res, db) => {
    const { id } = req.params;
    const { name, age, pet } = req.body.formInput;

    db('users')
        .where({ id })
        .update({ name })
        .then(resp => resp ? res.json('success') : res.status(badRequest).json(errorMessages.update))
        .catch(() => res.status(badRequest).json(errorMessages.update));
};

module.exports = {
    handleProfileGet,
    handleProfileUpdate
};