var mongoose = require ('mongoose');

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

// var newTodo =  new Todo ({
//     text : 'good'
// });

// newTodo.save().then((doc)=>{
//     console.log('user saved' , doc);
// },(e)=> {
//     console.log(e);
// })
// newTodo.save().then((doc)=>{
//     console.log('good' , doc);
// },(e)=> {
//     console.log(e);
// })

module.exports = {Contact};
