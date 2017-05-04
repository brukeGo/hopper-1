var mongoose = require('mongoose');
var hopper = mongoose.model('Event');

module.exports.eventsList = function (req, res) {
  sendResponse(res, 200, {"status": "success"});
}

module.exports.createEvent = function (req, res) {
  // place a relevant comment here
  console.log(req.body);
  sendResponse(res, 200, 
    { title: req.body.title, 
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      location: req.body.location,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      description: req.body.description,
      tags: req.body.tags
      //still need to do filters and maybe interested
  });
}

module.exports.readEvent = function (req, res) {
  // Error trap: Check that there are request params & eventid exists
  if(req.params && req.params.eventid) {
    hopper
    .findById(req.params.eventid)
    .exec(function(err, event) {
      // Error trap: If Mongoose doesn't return event, send 404 and exit
      if(!event) {
        // No event with this id exists
        sendResponse(res, 404, {
          "msg": "eventid not found"
        });
        return;
        // Error trap: If Mongoose returns an error, send 404 and exit
      } else if(err) {
        sendResponse(res, 404, err);
        return;
      }
      // Success: Send 200 and event object
      sendResponse(res, 200, event);
    });
  } else {
      // If request did not include eventid, send 404
      sendResponse(res, 404, {
        "msg": "No eventid in request"
      });
  }
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