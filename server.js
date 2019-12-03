const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (request, response) => {
     response.send('hello world');
}).listen(PORT, () => {
    console.log( `Live at http://localhost:${PORT}/`)
});

