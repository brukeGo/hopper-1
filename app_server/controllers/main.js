/* 
  CONTROLLERS
    Purpose:  Controllers should manage the application logic
    Example:  Render views, make API calls then render view, etc.
*/

module.exports.index = function(req, res) {
  /*
    Understanding res.render:
      - render is the Express function for compiling a view
      template to send as the HTML response to the browser
        
        res.render('index', { title: ' Hopper' });
      
      render takes the name of the view template and a JavaScript
      data object
        - index: name of template file to use -- references index.jade
        - { title: 'Hopper' }: JavaScript object containing data for template
  */
  res.render('login', { title: 'Hopper' });
}

module.exports.mainMenu = function (req, res) {
  res.render('main-menu', { title: 'Welcome' });
}

module.exports.event = function (req, res) {
  res.render('event', { title: 'Event' });
}

module.exports.createEvent = function (req, res) {
  res.render('event-form', { title: 'Create Event' });
}

module.exports.eventDraft = function (req, res) {
  res.render('event-draft', { title: 'Draft' });
}

module.exports.eventSaved = function (req, res) {
  res.render('event-saved', { title: 'Saved' });
}

module.exports.eventPosted = function (req, res) {
  res.render('event-posted', { title: 'Posted' });
}

module.exports.events = function(req, res) {
res.render('events', {title: 'Events'});
}

module.exports.eventFinder = function(req, res) {
res.render('event-finder', {title: 'Find Event'});
}

module.exports.searchEvents = function(req, res) {
res.render('search-events', {title: 'Keyword Search'});
}

module.exports.filterEvents = function(req, res) {
res.render('filter-events', {title: 'Filter Events'});
}

module.exports.myEvents = function(req, res) {
res.render('events', {title: 'My Events'});
}

module.exports.myEventsEdit = function(req, res) {
res.render('event-form', {title: 'Edit Event'});
}

module.exports.myLikedEvents = function(req, res) {
res.render('events', {title: 'Liked Events'});
}

module.exports.register = function(req, res) {
res.render('register', {title: 'Register'});
}

module.exports.recover = function(req, res) {
res.render('recover', {title: 'Recover'});
}

module.exports.account = function(req, res) {
res.render('account', {title: 'User Menu'});
}



