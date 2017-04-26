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
  res.render('index', { title: 'Hopper' });
}

module.exports.welcome = function (req, res) {
  res.render('welcome', { title: 'Welcome' });
}

module.exports.createEvent = function (req, res) {
  res.render('createevent', { title: 'Create Event' });
}

module.exports.register = function(req, res) {
res.render('register', {title: 'Register'});
}

module.exports.recover = function(req, res) {
res.render('recover', {title: 'Recover'});
}

module.exports.event = function(req, res) {
res.render('event', {event: {title: 'Movie Night', date:'04/23/2017',
time: '5:30 PM', location:'USU Ballroom 1', 
description:'Come enjoy classic films while meeting new people who share your interests. Free snacks.'}});
}

module.exports.filterCat = function(req, res) {
res.render('filtercat', {title: 'Filter Category'});
}

module.exports.filterSelect = function(req, res) {
res.render('filterselect', {title: 'Filter Select'});
}

module.exports.findEvent = function(req, res) {
res.render('findevent', {title: 'Find Event'});
}

module.exports.keywordSearch = function(req, res) {
res.render('keywordsearch', {title: 'Keyword Search'});
}

module.exports.listAll = function(req, res) {
res.render('listall', {title: 'List All', eventsList: [{title:'Movie Night'}, 
{title:'Casino Night'}, {title:'Grad Festival'}, {title:'Alumni Lunch'}, 
{title:'Speed Dating'}, {title: 'SWE Bonfire'}]});
}

module.exports.postEvent = function(req, res) {
res.render('postevent', {title: 'Post Event'});
}

module.exports.saveEvent = function(req, res) {
res.render('saveevent', {title: 'Save Event'});
}

module.exports.viewEvent = function(req, res) {
res.render('viewevent', {title: 'View Event'});
}

