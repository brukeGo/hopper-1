var mongoose = require('mongoose');
var Event = mongoose.model('Event');

/* This controller is going to return a list of events based on chosen filters. */
module.exports.filteredEventsList = function (req, res) {
  console.log(req.body);

  var mongoArray = [];
  var filterArray = [];

  if(Array.isArray(req.body.filters)) {
    filterArray = req.body.filters;
  } else {
    filterArray.push(req.body.filters);
  }

  for (var f = 0; f < filterArray.length; f++){
    var filterObj = {"filters": ""};
    filterObj.filters = filterArray[f];
    mongoArray.push(filterObj);
    console.log(filterArray[f]);
  }

  console.log(JSON.stringify(mongoArray));

  Event.find({$and: mongoArray}, function (err, events){
    if(events.length === 0){
      sendResponse(res, 201, {msg:'No events match selected filter(s).'});
      return; 
    } else if(err) {
      // Error trap: If Mongoose returns an error, send 404 and exit
        sendResponse(res, 404, err);
        return;
    }
    console.log('Events: '+ events);
    sendResponse(res, 201, events);  
  });
}

/* This controller SHOULD return a list of events based on searched input */
module.exports.searchEventsList = function (req, res) {
  var keys = req.body.tags.split(",");

  console.log(JSON.stringify(keys));

  var regexArray = [];

  for(var key = 0; key < keys.length; key++) {
    var regExp = new RegExp('.*' + keys[key] + '.*', 'i');
    console.log(regExp);
    regexArray.push(regExp);
  }

  console.log(JSON.toString(regexArray));

  Event.find( { $or: [ { tags: { $in: keys } }, { description: { $in: regexArray } }, { title: { $in: regexArray } } ] }, function (err, events){
    if(events.length === 0) {
      sendResponse(res, 201, {msg:'No events match your search'});
      return; 
    } else if(err) {
      // Error trap: If Mongoose returns an error, send 404 and exit
        sendResponse(res, 404, err);
        return;
    }
    console.log('Events: '+ events);
    sendResponse(res, 201, events);  
  });
}

/* This controller SHOULD return a list of events based on comma separated tags. */
module.exports.taggedEventsList = function (req, res) {
  var tags = req.body.tags.split(",");

  console.log(JSON.stringify(tags));
  
  Event.find( { tags: { $in: tags } }, function (err, events){
    if(events.length === 0){
      sendResponse(res, 201, {msg:'No events match your search'});
      return; 
    } else if(err) {
      // Error trap: If Mongoose returns an error, send 404 and exit
        sendResponse(res, 404, err);
        return;
    }
    console.log('Events: '+ events);
    sendResponse(res, 201, events);  
  });
}

/* This controller SHOULD return a list of all events. */
module.exports.eventsList = function (req, res) {
  sendResponse(res, 200, {"status": "success"});
}

/* This controller takes information for an event (provided by user), and stores in a database. */
module.exports.createEvent = function (req, res) {
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
  }, function(err, event) {
    if(err) {
      sendResponse(res, 400, error);
    } else {
      sendResponse(res, 201, event);
    }
  });
}

/* This controller returns event information from database. */
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

/* This controller SHOULD update an event's information in the database. */
module.exports.updateEvent = function (req, res) {
  sendResponse(res, 200, {"status": "success"});
}

/* This controller SHOULD delete an event document from database. */
module.exports.deleteEvent = function (req, res) {
  sendResponse(res, 200, {"status": "success"});
}

/* Sends a HTTP status code and data in JSON format.*/
var sendResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
}
