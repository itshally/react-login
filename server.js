const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./controller/router');
const PORT = process.env.PORT || 3000;
const mongoDB = require('./controller/configuration/keys').mongoURI;

const passport = require('passport');
const users = require('./controller/api_routes/user');

/**
 * A built-in middleware function in Express. It parses incoming requests
 * with URLENCODED payloads and is based on body-parser
 */ app.use(bodyParser.urlencoded({ extended: false }));

/**
 * A built-in middleware function in Express. It parses incoming requests with
 * JSON payloads and is based on body-parse
 */ app.use(bodyParser.json());


 // serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
     app.use(express.static('view/build'));
}

// app.use(routes)

// passport middleware
app.use(passport.initialize());

// passport configuration
require('./controller/configuration/passport')(passport);

// routes for user's api
app.use('/api/users');

// connects to database
if(mongoDB){
     mongoose.connect(mongoDB)
             .then( () => console.log(`MongoDB successfully connected`))
             .catch( error => console.log(`Error found while connecting. \n ${error}`));
}else{
     mongoose.connect('mongodb://localhost/user_login', {
          useNewUrlParser: true,
          useUnifiedTopology: true
     }).then( () => console.log(`MongoDB successfully connected on localhost`))
       .catch( error => console.log(`Error found while connecting to localhost. \n ${error}`));
     
}


app.listen(PORT, () => {
    console.log( `Live at http://localhost:${PORT}/`)
});

