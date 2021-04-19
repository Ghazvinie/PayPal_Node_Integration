const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const server = express();

server.use(bodyParser.urlencoded({extended : true}));
server.use(express.static('pub'));


server.get('/', (request, response) => {
    fs.readFile('./templates/home.html', (error, results) => {
        response.send(results);
    });
});

server.listen(8080, 'localhost', (error) => {
    console.log(error || 'Server Online');
});