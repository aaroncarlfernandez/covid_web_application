const Controller = require('../controllers/Controller');
const express = require('express');
const router = express.Router();

router.get('/top/confirmed', (req, res) => {
    Controller.getTopConfirmed(req, res).then(results => res.send(results));
});

router.get('/unique/observation-dates', (req, res) => {
    Controller.getUniqueObservationDates().then(results => res.send(results));
});

module.exports = router;