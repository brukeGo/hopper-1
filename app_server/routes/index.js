/* 
  ROUTERS
    Purpose:  Routing maps URL requests to controllers
    Example:  router.get('/') is where the router looks
                for a get request on the homepage URL path ('/')
*/

var express = require('express');
var router = express.Router();

// Require controller file(s)
var ctrlMain = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlMain.login); // Reference index method of ctrlMain controller in this route definition
router.get('/welcome', ctrlMain.mainMenu);
router.get('/event', ctrlMain.event);
router.get('/event/new', ctrlMain.createEvent);
router.get('/event/draft', ctrlMain.eventDraft);
router.get('/event/saved', ctrlMain.eventSaved);
router.get('/event/posted', ctrlMain.eventPosted);
router.get('/events', ctrlMain.events);
router.get('/events/finder', ctrlMain.eventFinder);
router.get('/events/search', ctrlMain.searchEvents);
router.get('/events/filter', ctrlMain.filterEvents);
router.get('/events/my', ctrlMain.myEvents);
router.get('/events/my/edit', ctrlMain.myEventsEdit);
router.get('/events/my/liked', ctrlMain.myLikedEvents);
router.get('/recover', ctrlMain.recover);
router.get('/register', ctrlMain.register);
router.get('/account', ctrlMain.account); // need to add view for this (user-menu)

module.exports = router;
