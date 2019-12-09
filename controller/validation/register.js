// This file is for input validation
const validator = require('validator'); //only works with strings
const isEmpty = require('is-empty');

module.exports = validateRegisterInput = (data) => {
     
     let errors = {};
     
     //converts to an empty string
     data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
     data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
     data.email = !isEmpty(data.email) ? data.email : "";
     data.password = !isEmpty(data.password) ? data.password : "";
     data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

     //validates first name
     if(validator.isEmpty(data.firstName)){
          errors.firstName = "First name must not be empty."
     }

     //validates last name
     if(validator.isEmpty(data.lastName)){
          errors.lastName = "Last name must not be empty."
     }

     //validates email name
     if(validator.isEmpty(data.email)){
          errors.email = "Email must not be empty."
     }else if(!validator.isEmail(data.email)){
          errors.email = "Email is invalid"
     }

     //validates password
     if(validator.isEmpty(data.password)){
          errors.password = "Password must not be empty."
     }

     //validates password confirmation
     if(validator.isEmpty(data.confirmPassword)){
          errors.confirmPassword = "Re-typing your password is required."
     }

     //validates if password and password confirmation is a match
     if(!validator.equals(data.password, data.confirmPassword)){
          errors.confirmPassword = "Password did not match."
     }

     //returns the error object that contains error messages
     return {
          errors,
          isValid: isEmpty(errors)
     }
}