var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  rack: {type: String},
  date: {type: Date},  
  temp: {type: Number},
  humidity: {type: Number}
});

module.exports = mongoose.model('dht', schema);