var mongoose = require('mongoose');
var hopper = mongoose.model('Event');

module.exports.eventsList = function (req, res) {
  sendResponse(res, 200, {"status": "success"});
}

module.exports.createEvent = function (req, res) {
  sendResponse(res, 200, {"status": "success"});
}

module.exports.readEvent = function (req, res) {
  sendResponse(res, 200, {"status": "success"});
}

module.exports.updateEvent = function (req, res) {
  sendResponse(res, 200, {"status": "success"});
}

module.exports.deleteEvent = function (req, res) {
  sendResponse(res, 200, {"status": "success"});
}

var sendResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
}