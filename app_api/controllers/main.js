var mongoose = require('mongoose');
var Event = mongoose.model('Event');

module.exports.eventsList = function (req, res) {
  sendResponse(res, 200, {"status": "success"});
}

module.exports.createEvent = function (req, res) {
  // place a relevant comment here
  console.log(req.body);
  var tags = req.body.tags.split(",");
  var filterArray = [];

  if(Array.isArray(req.body.filters)) {
    filterArray = req.body.filters;
  } else {
    filterArray.push(req.body.filters);
  }

  var start = new Date(req.body.start);
  var end = new Date(req.body.end);
  console.log("start:" + start);
  console.log("end:" + end);
  
  Event.create({
      title: req.body.title, 
      start: start.toISOString(),
      end: end.toISOString(),
      location: req.body.location,
      description: req.body.description,
      tags: tags,
      filters: filterArray
      //still need to do filters and maybe interested
  }, function(err, event) {
    if(err) {
      sendResponse(res, 400, error);
    } else {
      sendResponse(res, 201, event);
    }
  });
}

module.exports.readEvent = function (req, res) {
  // Error trap: Check that there are request params & eventid exists
  if(req.params && req.params.eventid) {
    Event
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