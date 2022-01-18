const express = require('express');

const router = express.Router();

module.exports = () => {
    router.get('/', (req, res) => res.send('Speakers list'));

    router.get('/:shortname', (req, res) => res.send(`Details page of ${req.params.shortname}`));

    return router;
};
