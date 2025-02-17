const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');

const bodyParser = require('body-parser');

const { response } = require('express');
const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const routes = require('./routes');

const app = express();

const port = 3000;

app.set('trust proxy', 1);

app.use(
    cookieSession({
        name: 'session',
        keys: ['Yfdaeaw812gh61z3', '8e13ew87ef9kjbwcq'],
    })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'ROUX Meetups';

app.use(express.static(path.join(__dirname, './static')));

app.use(async (req, res, next) => {
    try {
        const names = await speakersService.getNames();
        res.locals.speakerNames = names;
        return next();
    } catch (err) {
        return next(err);
    }
});

app.use(
    '/',
    routes({
        feedbackService,
        speakersService,
    })
);

app.use((req, res, next) => next(createError(404, 'File not nound')));

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    console.error(err);
    const status = err.status || 500;
    res.locals.status = status;
    res.status(status);
    res.render('error');
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
