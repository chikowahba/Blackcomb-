var {mongoose} = require('../db/mongoose');

var Contact = mongoose.model('Contact' , {
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  }
});

module.exports = {Contact};
