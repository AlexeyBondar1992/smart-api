const { statuses: { badRequest }, errorMessages } = require('../constants');
const Clarifai = require('clarifai');
const { CLARIFY_KEY } = process.env;

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: CLARIFY_KEY
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => res.json(data))
        .catch(() => res.status(badRequest).json(errorMessages.API));
};
const handleImage = (req, res, db) => {
    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(() => res.status(badRequest).json(errorMessages.entries));
};

module.exports = {
    handleImage,
    handleApiCall
};