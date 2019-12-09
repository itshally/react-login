//this is the api routes for the registration and login
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const keys = require()

//loads input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

//loads the user model
const User = require('../../model/User');

//creating endpoint for the registration
router.post('/register', (request, response) => {

     //form validation
     const { errors, isValid } = validateRegisterInput(request.body);

     //checks validation
     if(!isValid){
          return response.status(400).json(errors);
     }


     //validates if user is already registered or not
     User.findOne({
               email: request.body.email
          })
          .then(user => {
               
               if(user){
                    return response.status(400).json({
                         email: "Email already exists."
                    });
               }else{
                    const newUser = new User({
                         firstName: request.body.firstName,
                         lastName: request.body.lastName,
                         email: request.body.email,
                         password: request.body.password
                    })
               }

               //for the new user, password will be hashed before saving to the database
               bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                         //detects error
                         if(error) throw error;

                         //hashes the password
                         newUser.password = hash;

                         //saves the hashed password to the new user data
                         newUser.save()
                                .then( user => response.json(user) )
                                .catch( error => console.log(error))
                    })
               })
          })
})