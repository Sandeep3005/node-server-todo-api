const mongoose = require('mongoose');

let Users = mongoose.model('User',{
  email: {
    type: String,
    require: true,
    trim: true,
    minlength: 5
  }
});

module.exports = { Users };
