const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3000;
const routes = require('./controller/router')

/**
 * A built-in middleware function in Express. It parses incoming requests
 * with URLENCODED payloads and is based on body-parser
 */ app.use(express.urlencoded({ extended: true }));

/**
 * A built-in middleware function in Express. It parses incoming requests with
 * JSON payloads and is based on body-parse
 */ app.use(express.json());


 // serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
     app.use(express.static('view/public'));
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


app.get('/', (request, response) => {
     response.send('hello world');
}).listen(PORT, () => {
    console.log( `Live at http://localhost:${PORT}/`)
});

