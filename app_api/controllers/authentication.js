var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* Controller to register for an account */
module.exports.register = function(req, res){
    //User needs to fill in all fields of the form to register
    if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password){
        sendJSONresponse(res, 400, {"message": "All fields required"});
        return;
    }
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save(function(err){
        var token;
        if (err){
            sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJWT();
            sendJSONresponse(res, 200, {
                "token": token
            });
        }
    });
};

/* Controller to log in */
module.exports.login = function(req, res){
    //User needs email AND password to log in.
    if (!req.body.email || !req.body.password){
        sendJSONresponse(res, 400, {"message": "All fields required."});
        return;
    }

    passport.authenticate('local', function(err, user, info){
        var token;
        if (err){
            sendJSONresponse(res, 404, err);
            return;
        }
        if (user){
            token = user.generateJWT();
            sendJSONresponse(res, 200, {
                "token": token
            });
        } else {
            sendJSONresponse(res, 401, info);
        }
    })(req, res);
};