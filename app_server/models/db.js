var mongoose = require('mongoose');

// Use the prod URI unless it is local
var dbURI = 'mongodb://127.0.0.1:27017/hopper';

// Use prod URI if the NODE_ENV is prod
if(process.env.NODE_ENV === 'production') {
  dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI, function (err, res) {
  if(err) {
    console.log('ERROR connecting to: ' + dbURI + '. ' + err);
  } else {
    console.log('Successful connection to: ' + dbURI);
  }
});

/*Line 7 - 22: Event Listeners*/
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

/*Gracefully close Mongoose connection*/
var gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

/*Lines 27-45: Calls gracefulShutdown when app terminates or nodemon restarts app*/
//for nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});

//for app termination
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});

//for heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app shutdown', function () {
    process.exit(0);
  });
});

require('./events');