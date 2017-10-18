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

router.get('/', ctrlMain.login); 			                    // log in page
router.post('/welcome', ctrlMain.doLogin);		              // logs in user and renders welcome/event menu
router.get('/event/new', ctrlMain.createEvent);		        // create an event
router.get('/event/edit', ctrlMain.editEvent);		        // edit an event
router.get('/event/draft', ctrlMain.eventDraft);	        // view an event draft
router.post('/event/saved', ctrlMain.eventSaved);	        // event saved successfully! page
router.get('/event/posted', ctrlMain.eventPosted);	      // event posted successfully! page
router.get('/event/:eventid', ctrlMain.event); 			      // view a event
router.get('/events', ctrlMain.events);			              // view a list of events
router.get('/events/finder', ctrlMain.eventFinder);	      // find event menu
router.get('/events/search', ctrlMain.searchEvents);      // search for events by keywords/tags
router.post('/events/searched', ctrlMain.eventsSearched); // view a list of events searched by keyword/tag
router.get('/events/filter', ctrlMain.filterEvents);      // checkboxes for filtering through events
router.get('/events/liked', ctrlMain.likedEvents);	      // show list of user's liked events
router.get('/events/my', ctrlMain.myEvents);		          // show list of user's event posts/drafts
router.get('/recover', ctrlMain.recover);		              // recover passwords
router.get('/register', ctrlMain.register);		            // registration page
router.post('/verify', ctrlMain.doRegister);			        //do the registration and show verification page
router.get('/account', ctrlMain.account); 		            // user menu
router.get('/account/edit', ctrlMain.editAccount);        // edit account info
router.post('/events/filtered', ctrlMain.filteredEvents); //view a list of filtered events
router.get('/features', ctrlMain.features);               // List of features

router.get('/usr', ctrlMain.user); 			                  // user manual
router.get('/dev', ctrlMain.dev); 			                  // dev manual

module.exports = router;
