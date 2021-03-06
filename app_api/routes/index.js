var express = require('express');
var router = express.Router();

// Require controller file(s)
var ctrlMain = require('../controllers/main');
var ctrlAuth = require('../controllers/authentication');

// Events
router.get('/events', ctrlMain.eventsList);
router.post('/events/new', ctrlMain.createEvent);
router.get('/events/:eventid', ctrlMain.readEvent);
router.put('/events/:eventid', ctrlMain.updateEvent);
router.delete('/events/:eventid', ctrlMain.deleteEvent);

router.post('/events/search', ctrlMain.searchEventsList);
router.post('/events/tag', ctrlMain.taggedEventsList);
router.post('/events/filter', ctrlMain.filteredEventsList);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
