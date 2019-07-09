const { statuses: { badRequest }, errorMessages, dataBases } = require('../constants');

const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    const respondError = message => res.status(badRequest).json(message);

    db.select('*').from(dataBases.users.root).where({ id })
        .then(user => user.length ? res.json(user[0]) : respondError(errorMessages.notFound))
        .catch(() => respondError(errorMessages.user));
};
const handleProfileUpdate =  (req, res, db) => {
    const { id } = req.params;
    const { name, age, pet } = req.body.formInput;
    const respondError = () => res.status(badRequest).json(errorMessages.update);

    db(dataBases.users.root)
        .where({ id })
        .update({ name })
        .then(resp => resp ? res.json('success') : respondError())
        .catch(() => respondError());
};

module.exports = {
    handleProfileGet,
    handleProfileUpdate
};
