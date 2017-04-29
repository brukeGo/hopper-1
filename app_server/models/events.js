var mongoose = require( 'mongoose' );

var eventSchema = new mongoose.Schema({
  title: {type: String, required: true},
  img: {data: Buffer, contentType}, 
  start: {type: Date, required: true},
  end: Date,
  location: {type: String, required: true},
  description: String,
  tags: [String],
  posted: {type: boolean, default: false},
  repeat: {repeat_every: Number, basis: String, occurences: Number}
});

mongoose.model('Event', eventSchema);