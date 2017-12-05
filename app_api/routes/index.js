var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

// Require controller file(s)
var ctrlMain = require('../controllers/main');
var ctrlAuth = require('../controllers/authentication');

// Events
/* NOTE FOR ALE: Don't forget to put auth in all routes after
you update that controller */
router.get('/events', ctrlMain.eventsList);
router.post('/events/new', auth, ctrlMain.createEvent);
router.get('/events/:eventid', ctrlMain.readEvent);
router.put('/events/:eventid', ctrlMain.updateEvent);
router.delete('/events/:eventid', ctrlMain.deleteEvent);

router.post('/events/search', ctrlMain.searchEventsList);
router.post('/events/tag', ctrlMain.taggedEventsList);
router.post('/events/filter', ctrlMain.filteredEventsList);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
