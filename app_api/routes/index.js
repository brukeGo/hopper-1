var express = require('express');
var router = express.Router();

// Require controller file(s)
var ctrlMain = require('../controllers/main');

// Events
router.get('/events', ctrlMain.eventsList);
router.post('/events', ctrlMain.createEvent);
router.get('/events/:eventid', ctrlMain.readEvent);
router.put('/events/:eventid', ctrlMain.updateEvent);
router.delete('/events/:eventid', ctrlMain.deleteEvent);

module.exports = router;