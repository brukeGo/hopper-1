var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/welcome', function(req, res) {
  res.send('this is the welcome page');
});

router.get('/createevent', function(req, res) {
  res.send('this is event creation page');
});

module.exports = router;
