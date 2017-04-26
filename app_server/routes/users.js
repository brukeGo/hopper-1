var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/welcome', function(req, res) {
  res.send('this is welcome page');
});

router.get('/createevent', function(req, res) {
  res.send('this is create event page');
});

router.get('/event', function(req, res) {
  res.send('this is event page');
});

router.get('/filtercat', function(req, res) {
  res.send('this is filter category page');
});

router.get('/filterselect', function(req, res) {
  res.send('this is filter select page');
});

router.get('/findevent', function(req, res) {
  res.send('this is find event page');
});

router.get('/keywordsearch', function(req, res) {
  res.send('this is keyword search page');
});

router.get('/listall', function(req, res) {
  res.send('this is list all page');
});

router.get('/postevent', function(req, res) {
  res.send('this is post event page');
});

router.get('/recover', function(req, res) {
  res.send('this is recover page');
});

router.get('/register', function(req, res) {
  res.send('this is register page');
});

router.get('/saveevent', function(req, res) {
  res.send('this is save event page');
});

router.get('/viewevent', function(req, res) {
  res.send('this is view event page');
});

module.exports = router;
