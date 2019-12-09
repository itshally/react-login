// This file is for input validation
const validator = require('validator'); //only works with strings
const isEmpty = require('is-empty');

module.exports = validateInputLogin = (data) => {

     let errors = {};

     //converts to an empty string
     data.email = !isEmpty(data.email) ? data.email : "";
     data.password = !isEmpty(data.password) ? data.password : "";

     //validates email
     if(validator.isEmpty(data.email)){
          errors.email = "Email must not be empty."
     }else if(!validator.isEmail(data.email)){
          errors.email = "Email is invalid."
     }

     //validates password
     if(validator.isEmpty(data.password)){
          errors.password = "Password must not be empty."
     }

     //returns the error object that contains error messages
     return {
          errors,
          isValid: isEmpty(errors)
     }
}