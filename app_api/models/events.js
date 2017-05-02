var mongoose = require( 'mongoose' );

var eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  img: { data: Buffer, contentType: String }, 
  start: { type: Date, required: true, "default": Date.now },
  end: Date,
  location: { type: String, required: true },
  description: String,
  filters: [ String ],
  tags: [ String ],
  interested: { type: Number, default: 0 },
  posted: { type: Boolean, "default": false },
  repeat: { repeat_every: Number, basis: String, occurences: Number }
});

mongoose.model('Event', eventSchema);