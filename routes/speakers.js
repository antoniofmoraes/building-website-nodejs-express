const express = require('express');

const router = express.Router();

module.exports = (params) => {
    const { speakersService } = params;

    router.get('/', async (req, res) => {
        const speakers = await speakersService.getList();
        speakers.artworks = await speakersService.getAllArtwork();
        res.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers });
    });

    router.get('/:shortname', async (req, res) => {
        const speaker = await speakersService.getSpeaker(req.params.shortname);
        speaker.artworks = await speakersService.getArtworkForSpeaker(speaker.shortname);
        console.log(speaker);
        res.render('layout', { pageTitle: speaker.name, template: 'speakers-detail', speaker });
    });

    return router;
};
