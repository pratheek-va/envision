const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    id: String,
    department: String,
    name: String,
    type: String,
    venue: String,
    rules: Array,
    details:
      String,
    orgname: String,
    orgno: String,
    fee: Number,
    regfee: String,
    date: String,
    time: String,
    image: String,
  }
)

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;