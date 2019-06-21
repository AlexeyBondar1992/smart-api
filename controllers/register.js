const { statuses: { badRequest }, errorMessages } = require('../constants');

const handleRegister = (req, res, db, bcrypt) => {
    const {email, name, password} = req.body;

    if (!email || !name || !password) {
        return res.status(badRequest).json(errorMessages.submission);
    }

    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    });
            })
            .then(trx.commit)
            .catch(trx.rollback);
    })
        .catch(() => res.status(badRequest).json(errorMessages.registration));
};

module.exports = {
    handleRegister: handleRegister
};


