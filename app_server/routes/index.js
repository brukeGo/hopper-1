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
router.get('/welcome', ctrlMain.welcome);
router.get('/createevent', ctrlMain.createevent);
module.exports = router;
