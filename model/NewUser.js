const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creates modele for new users
const NewUser = new Schema({
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
     username: {
          type: String, 
          required: true
     },
     password: {
          type: String, 
          required: true
     }
})

// exports the model
module.exports = NewUser = mongoose.model('NewUser', NewUser);