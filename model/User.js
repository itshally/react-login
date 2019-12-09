const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creates modele for new users
const User = new Schema({
     firstName: { 
          type: String, 
          match: /[A-Za-z]/, 
          required: true
     },
     lastName: { 
          type: String, 
          match: /[A-Za-z]/, 
          required: true
     },
     email: {
          type: String, 
          required: true
     },
     password: {
          type: String, 
          required: true
     },
     date: {
          type: Date,
          default: Date.now()
     }
})

// exports the model
module.exports = User = mongoose.model('User', User);