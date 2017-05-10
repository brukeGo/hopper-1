/* 
  CONTROLLERS
    General Purpose:  Controllers should manage the application logic
    Purpose in this project:  These controllers render views.

  Understanding res.render:
    - render is the Express function for compiling a view
      template to send as the HTML response to the browser
        
    - res.render('index', { title: ' Hopper' });
      
    - render takes the name of the view template and a JavaScript
      data object
        - index: name of template file to use -- references index.jade
        - { title: 'Hopper' }: JavaScript object containing data for template
*/

var request = require('request');

var apiOptions = {
  server: "http://localhost:3000"
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "http://eventhopper.herokuapp.com";
}

/* Controller for login/landing page */
module.exports.login = function(req, res) {
  res.render('login', { title: 'Event Hopper' });
}

/* Controller for the welcome/event menu */
module.exports.mainMenu = function (req, res) {
  res.render('main-menu', { title: 'Welcome' });
}

/* Controller for viewing a posted event */
module.exports.event = function(req, res) {
  var requestOptions, path;
  path = '/api/events/' + req.params.eventid;
  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
    qs: {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      console.log(body);

      if(err) {
        console.log(error);
        return;
      }
      
      if(body.msg === "eventid not found") {
        res.render('event-not-found', { 
            msg: "event not found"
        }); 
      } else {
        //TODO: FIX THE DATE AND TIME

        console.log("START: " + body.start);
        
        var end = new Date(body.end);
        var event = {
          title: body.title,
          location: body.location,
          description: body.description,
          tags: body.tags,
          filters: body.filters,
          startDate: convertDate(body.start),
          startTime: convertTime(body.start),
          endDate: convertDate(body.end),
          endTime: convertTime(body.start)
        }
        res.render('event', { 
            event: event
        });
      }
      
    }
  )
  
}

var convertDate = function(mongoDate) {
  var time = new Date(mongoDate);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = time.getFullYear();
  var month = months[time.getMonth()];
  var date = time.getDate();

  return month + " " + date + ", " + year;
}

var convertTime = function(mongoDate) {
  var time = new Date(mongoDate);
  var hour = time.getHours();
  var min = time.getMinutes();
  var sec = time.getSeconds();

  var hourDisplayed = hour;

  if(hour > 12) {
    hourDisplayed = hour % 12;
  }

  return hourDisplayed + ":" + ((min < 10) ? "00" : min) + " " + ((hour >= 12) ? "PM" : "AM");
}

/* Controller for creating an event */
module.exports.createEvent = function (req, res) {
  res.render('event-form', 
    { title: 'Create Event',
      link: "/event/saved"
  });
}

/* Controller for viewing an event draft */
module.exports.eventDraft = function (req, res) {
  res.render('event-draft', 
    { title: 'Draft',
      links: [
        { title: "Edit",
          link: "/event/edit" 
        },
        { title: "Delete",
          link: "/event/delete" 
        },
        { title: "Post",
          link: "/event/posted" 
        }
      ],
      event: { title: 'Movie Night',
        date:'04/23/2017',
        time: '5:30 PM',
        location:'USU Ballroom 1', 
        description:'Come enjoy classic films while meeting new people who share your interests. Free snacks.'
      }
  });
}

/* Controller for viewing the "Event saved successfully" page */
module.exports.eventSaved = function (req, res) {
  var requestOptions, path;

  path = '/api/events/new';

  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    form: req.body
  };

  request(
    requestOptions,
    function(err, response, body) {
      renderSavedPage(err, req, res, body);
    }
  );
}

var renderSavedPage = function(err, req, res, resBody) {
  console.log("Posted!: " + req);
  //TODO: Catch errors
  res.render('event-success', { 
    title: 'Event Saved',
    message: 'Your event has been saved as a draft. To post, view, or edit this event go to My Events in the user menu.'
 });
}

/* Controller for viewing the "Event posted successfully page */
module.exports.eventPosted = function (req, res) {
  res.render('event-success', { 
    title: 'Event Posted',
    message: 'Congratulations. Your event has been posted. To view or edit this event go to My Events in the user menu.'
   });
}

/* Controller for viewing a list of events */
module.exports.events = function(req, res) {
  var requestOptions, path;

  path = '/api/events';

  requestOptions = {
    url: apiOptions.server + path,
    method: "GET",
    json: {},
    qs: {}
  };

  request(
    requestOptions,
    function(err, response, body) {
      renderEventsPage(err, req, res, body);
    }
  );
}

var renderEventsPage = function(err, req, res, responseBody) {
  var message;
  console.log(responseBody);
  if(!(responseBody instanceof Array)) {
    message = "API lookup error" + responseBody;
    responseBody = [];
  } else {
      if(!responseBody.length) {
        message = "No events found";
      }
  }

  res.render('events', {
      title: 'All Events',
      eventsList: responseBody,
      link: "/event",
      message: message
  });
}

/* Controller for viewing the find event menu */
module.exports.eventFinder = function(req, res) {
  res.render('event-finder', {title: 'Find Event'});
}

/* Controller to show view to search for events by keywords */
module.exports.searchEvents = function(req, res) {
  res.render('search-events', {title: 'Keyword Search'});
}

/* Controller to make api call to search for events with keywords inputted */
module.exports.eventsSearched = function(req, res) {
  var requestOptions, path;

  path = '/api/events/search';

  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    form: req.body
  };

  request(
    requestOptions,
    function(err, response, body) {
      if(err) {
        console.log(err);
        return;
      }
      console.log(body);
      renderSearchedPage(err, req, res, body);
    }
  );
}

var renderSearchedPage = function(err, req, res, responseBody) {
  var msg;

  console.log(Array.isArray(JSON.parse(responseBody)));

  if(!Array.isArray(JSON.parse(responseBody))) {
    console.log("API lookup error");
    msg = "API lookup error" + responseBody;
    responseBody = JSON.stringify([]);
  } else {
      if(!JSON.parse(responseBody).length) {
        console.log("no events found");
        msg = "No events match your search";
        responseBody = JSON.stringify([]);
      }
  }

  res.render('events', {
      title: 'Searched Events',
      eventsList: JSON.parse(responseBody),
      link: "/event",
      msg: msg
  });
}

/* Controller for filtering through events by selecting categories */
module.exports.filterEvents = function(req, res) {
  res.render('filter-events', { 
    title: 'Filter Events',
    link: "/events/filtered"
  });
}

/* Controller for viewing event posts/drafts made by the user */
module.exports.myEvents = function(req, res) {
  res.render('events', { 
    title: 'My Events',
    eventsList: [ 
      { title:'Movie Night'}, 
      { title:'Casino Night'}
    ],
    link: "/event/draft"
  });
}

/* Controller for updating an event post/draft */
module.exports.editEvent = function(req, res) {
  res.render('event-form', { 
    title: 'Edit Event',
    link: "/event/saved"
  });
}

/* Controller for viewing events liked by the user */
module.exports.likedEvents = function(req, res) {
  res.render('events', { 
    title: 'Liked Events',
    eventsList: [ 
      { title:'Speed Dating' },
      { title: 'SWE Bonfire' }
    ],
    link: "/event"
  });
}

/* Controller for registering for an account*/
module.exports.register = function(req, res) {
  res.render('register', {
    title: 'Create Account',
    message: 'Please enter your information in the fields below. You will recieve a verification email to confirm your account.',
    link: '/verify',
    buttonText: 'SEND EMAIL'
  });
}

/* Controller for recovering a user password*/
module.exports.recover = function(req, res) {
  res.render('recover', {title: 'Recover'});
}

/* Controller for the user menu*/
module.exports.account = function(req, res) {
  res.render('user-menu', {title: 'User Menu'});
}

/*Controller for viewing the 'Verify E-mail Address' page. */
module.exports.verify = function(req, res){
  res.render('verify-account', {
    title: 'Verify E-mail',
    message: 'A verification message was sent to your e-mail address. Please verify your e-mail and you will be able to log in to your new account.'
  });
}

/* Controller for editing account. */
module.exports.editAccount = function(req, res){
  res.render('register', {
    title: 'Edit Account',
    message: 'Edit your account information by filling the necessary fields below.',
    link: '/welcome',
    buttonText: 'SAVE CHANGES'
  });
}

module.exports.filteredEvents = function(req, res){
  var requestOptions, path;
  path = '/api/events/filter';
  requestOptions = {
    url: apiOptions.server + path,
    method: "POST",
    form: req.body
  };
   request(
    requestOptions,
    function(err, response, body) {
      renderFilteredEvents(err, req, res, body);
    }
  );
}

var renderFilteredEvents = function(err, req, res, responseBody){
  var msg;
  if (!(JSON.parse(responseBody) instanceof Array)){
    msg = "API lookup error" + responseBody;
    responseBody = [];
  } else{
    if (!JSON.parse(responseBody).length){
      console.log('No events with matching filter');
      msg = "No events with matching filter(s) found.";
    }
  }
  res.render('events', {
    title: 'Filtered Events',
    eventsList: JSON.parse(responseBody),
    link: '/event',
    msg: msg
  });
}

/* Controller to list features */
module.exports.features = function(req, res) {
  res.render('features', {
    features: [
      "Find an event: by filter, title, description, or tags",
      "Post an event",
      "RESTful API: create event, read a event, delete event, read all events, search by filters, search by keywords, search by tags"
    ]
  });
}
