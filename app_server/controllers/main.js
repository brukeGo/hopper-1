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

var jwt_decode = require('jwt-decode');

/* Controller to render login/landing page */
module.exports.login = function(req, res) {
  res.render('login', { title: 'Event Hopper',
    link:'/welcome' });
}

/* Controller to log in user */
module.exports.doLogin = function(req, res){
  var requestOptions, path;
  
    path = '/api/login';
  
    requestOptions = {
      url: apiOptions.server + path,
      method: "POST",
      form: req.body
    };
    request(
      requestOptions,
      function(err, response, body) {
        if (body[2] != 't'){
          res.redirect('/');
        }
        else {
          var end = body.indexOf("}") - 1;
          var token = body.substring(10, end);
          console.log("token: " +token);
          console.log("body: " +body);
          res.cookie('token', token, { maxAge: 900000, httpOnly: true });
          renderMainMenu(err, req, res, body);
        }
      }
    );
}

/* Renders the welcome/event menu page */
var renderMainMenu = function (err, req, res, body) {
  var t = body.substring(10, (body.indexOf("}") - 1));
  t = jwt_decode(t);
  var welcome = 'Welcome, ' + t.firstName;
  res.render('main-menu', { title: welcome});
}

/*Renders the welcome/event menu page (after login)*/
module.exports.renderWelcome = function(req, res){
  if (JSON.stringify(req.cookies) === "{}"){
    res.redirect('/');
  }
  else {
    console.log("rW req.cookies has :");
    console.log(req.cookies);
    var x = req.cookies.token;
    console.log(x);
    x = jwt_decode(x);
    var welcome = 'Welcome, ' + x.firstName;
    res.render('main-menu', { title: welcome});
  }
}

/* Controller for the user manual */
module.exports.user = function (req, res) {
  res.render('usr', { title: 'User Manual' });
}

/* Controller for the dev manual */
module.exports.dev = function (req, res) {
  res.render('dev', { title: 'Developer Manual' });
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

/* Formats date from API */
var convertDate = function(mongoDate) {
  var time = new Date(mongoDate);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = time.getFullYear();
  var month = months[time.getMonth()];
  var date = time.getDate();

  return month + " " + date + ", " + year;
}

/* Formats time from API */
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

/* API call which POSTs an event to the database. */
module.exports.eventSaved = function (req, res) {
  if (JSON.stringify(req.cookies) === "{}"){
    res.redirect('/');
  }
  else{
    console.log("eventSaved req body");
    console.log(req.body);
    console.log("eventSaved req.cookies token");
    console.log(req.cookies.token);

    var requestOptions, path;
  
    path = '/api/events/new';
  
    requestOptions = {
      url: apiOptions.server + path,
      method: "POST",
      headers: {Authorization: 'Bearer ' +req.cookies.token},
      form: req.body
    };
  
    request(
      requestOptions,
      function(err, response, body) {
        renderSavedPage(err, req, res, body);
      }
    );
  }
}

/* Renders the 'Event Saved Successfully' page */
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

/* Makes an API call to fetch all events */
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

/* Renders event list with all events fetched from API */
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

/* Makes API call to search for events with keywords inputted */
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

/* Renders event list page with events with matching tags fetched from API */
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

/* TO DO: Controller for viewing event posts/drafts made by the user */
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

/* TO DO: Controller for updating an event post/draft */
module.exports.editEvent = function(req, res) {
  res.render('event-form', { 
    title: 'Edit Event',
    link: "/event/saved"
  });
}

/* TO DO: Controller for viewing events liked by the user */
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

/* Controller rendering registration page */
module.exports.register = function(req, res) {
  res.render('register', {
    title: 'Create Account',
    message: 'Please enter your information in the fields below. You will recieve a verification email to confirm your account.',
    link: '/verify',
    buttonText: 'SIGN UP'
  });
}

/*Controller for registering for an account*/
module.exports.doRegister = function(req, res){
  var requestOptions, path;
  
    path = '/api/register';
  
    requestOptions = {
      url: apiOptions.server + path,
      method: "POST",
      form: req.body
    };
    request(
      requestOptions,
      function(err, response, body) {
        if (body[2] != 't'){
          res.redirect('/register');
        }
        else {
          verify(err, req, res, body);
        }
      }
    );
}

/* Renders the 'Verify E-mail Address' page. */
var verify = function(err, req, res, resBody) {
  console.log("Posted!: " + req);
  res.render('verify-account', {
    title: 'Verify E-mail',
    message: 'A verification message was sent to your e-mail address. Please verify your e-mail and you will be able to log in to your new account.'
  });
}

/* TO DO: Controller for recovering a user password*/
module.exports.recover = function(req, res) {
  res.render('recover', {title: 'Recover'});
}

/* Controller for the user menu*/
module.exports.account = function(req, res) {
  res.render('user-menu', {title: 'User Menu'});
}

/* TO DO: Controller for editing account. */
module.exports.editAccount = function(req, res){
  res.render('register', {
    title: 'Edit Account',
    message: 'Edit your account information by filling the necessary fields below.',
    link: '/welcome',
    buttonText: 'SAVE CHANGES'
  });
}

/* Makes an API call to fetch events based on chosen filters. */
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

/* Renders event list with events with matching filters fetched from API */
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

/*Controller to sign out*/
module.exports.signOut = function(req, res){
  if (JSON.stringify(req.cookies) === "{}"){
    res.redirect('/');
  }
  else{
    res.cookie('token', '', {expires: new Date()});
    console.log("cookies should be empty/modified etc");
    res.redirect('/');
  }
  
}