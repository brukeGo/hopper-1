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
router.get('/', ctrlMain.index); // Reference index method of ctrlMain controller in this route definition

/*Comment by Ale:
Once you get the thing running on your local host, you'll
be able to load different URLs by typing stuff like "localhost:3000/createEvent" in the URL bar for the future
create events page. At the time of writing, you'll see the login page but with different URLs.
*/
router.get('/createEvent', ctrlMain.createEvent);
router.get('/postEvent', ctrlMain.postEvent);
router.get('/saveEvent', ctrlMain.saveEvent);
router.get('/recover', ctrlMain.recover);
router.get('/viewEvent', ctrlMain.viewEvent);
router.get('/welcome', ctrlMain.welcome);
router.get('/signUp', ctrlMain.signUp);

module.exports = router;
