const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./controller/router');
const PORT = process.env.PORT || 3000;

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

app.use(routes)

// connects to database
if(process.env.MONGODB_URI){
     mongoose.connect(process.env.MONGODB_URI)
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

