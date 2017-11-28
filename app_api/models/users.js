var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

/*User schema*/
var userSchema = new mongoose.Schema({
  firstName: {
    type:String,
    required: true
  },
  lastName: {
    type:String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  hash: String,
  salt: String
});

/*Creates salt and hash from a password.*/
userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

/*Used to validate a password. */
userSchema.methods.validPassword = function(password){
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

/*Generates a JSON Web Token*/
userSchema.methods.generateJWT = function(){
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    exp: parseInt(expiry.getTime()/1000),
  }, process.env.JWT_SECRET);
};

mongoose.model('User', userSchema);