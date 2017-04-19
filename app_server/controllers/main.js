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
/* Comment by Ale:
The index.jade file at the time of writing currently displays the
login page so all the pages show the login page. Once the other jade files are finished,
please change 'index' to the correct jade file.
@Tera: Idk why the titles don't work yet. Also, we'll organize these controllers later.
*/
module.exports.postEvent = function(req, res) {
res.render('index', {title: 'Post Event'});
}
module.exports.saveEvent = function(req, res) {
res.render('index', {title: 'Save Event'});
}
module.exports.recover = function(req, res) {
res.render('index', {title: 'Recover Password'});
}
module.exports.signUp = function(req, res) {
res.render('index', {title: 'Register'});
}

