const express = require('express');

const router = express.Router();

module.exports = (params) => {
    const { speakersService } = params;

    router.get('/', async (req, res, next) => {
        try {
            const speakers = await speakersService.getList();
            const artworks = await speakersService.getAllArtwork();
            return res.render('layout', {
                pageTitle: 'Speakers',
                template: 'speakers',
                speakers,
                artworks,
            });
        } catch (err) {
            return next(err);
        }
    });

    router.get('/:shortname', async (req, res, next) => {
        try {
            const speaker = await speakersService.getSpeaker(req.params.shortname);
            const artworks = await speakersService.getArtworkForSpeaker(speaker.shortname);
            return res.render('layout', {
                pageTitle: speaker.name,
                template: 'speakers-detail',
                speaker,
                artworks,
            });
        } catch (err) {
            return next(err);
        }
    });

    return router;
};
