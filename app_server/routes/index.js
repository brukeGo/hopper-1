/* 
  ROUTERS
    Purpose:  Routing maps URL requests to controllers
    Example:  router.get('/') is where the router looks
                for a get request on the homepage URL path ('/')
*/

var express = require('express');
var router = express.Router();

/* Require controller file(s) */
var ctrlMain = require('../controllers/main');

router.get('/', ctrlMain.login); 			              // log in page
router.get('/welcome', ctrlMain.mainMenu);		      // welcome/event menu
router.get('/event', ctrlMain.event); 			        // view a event
router.get('/event/new', ctrlMain.createEvent);		  // create an event
router.get('/event/edit', ctrlMain.editEvent);		  // edit an event
router.get('/event/draft', ctrlMain.eventDraft);	  // view an event draft
router.get('/event/saved', ctrlMain.eventSaved);	  // event saved successfully! page
router.get('/event/posted', ctrlMain.eventPosted);	// event posted successfully! page
router.get('/events', ctrlMain.events);			        // view a list of events
router.get('/events/finder', ctrlMain.eventFinder);	// find event menu
router.get('/events/search', ctrlMain.searchEvents);// search for events by keywords/tags
router.get('/events/filter', ctrlMain.filterEvents);// checkboxes for filtering through events
router.get('/events/liked', ctrlMain.likedEvents);	// show list of user's liked events
router.get('/events/my', ctrlMain.myEvents);		    // show list of user's event posts/drafts
router.get('/recover', ctrlMain.recover);		        // recover passwords
router.get('/register', ctrlMain.register);		      // register for account
router.get('/account', ctrlMain.account); 		      // user menu
router.get('/account/edit', ctrlMain.editAccount);  // edit account info
router.get('/verify', ctrlMain.verify);             // verify e-mail

module.exports = router;
