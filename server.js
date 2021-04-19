const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const server = express();

server.use(bodyParser.urlencoded({extended : true}));
server.use(express.static('pub'));


server.get('/test/:name', (request, response) => {
    console.log(request.params.name);
    
});

server.get('/', (request, response) => {
    // fs.readFile('./templates/home.html', (error, results) => {
    //     response.send(results.toString());
    // });
});

server.get('/success/:orderID', (request, response) => {

    const orderID = request.params.orderID;

});

server.get('/cancel/:orderID', (request, response) => {
    const orderID = request.params.orderID;
});

server.get('/orderdetails/:orderID', (request, response) => {
    const orderID = request.params.orderID;
});

server.get('/refund/:orderID', (request, response) => {
    const orderID = request.params.orderID;
});

server.get('/recurring_success/:planID', (request, response) => {
    const planID = request.params.planID;
});

server.get('/recurring_cancel/:planID', (request, response) => {
    const planID = request.params.planID;
});

server.get('/recurring_orderdetails/:agreementID', (request, response) => {
    const agreementID = request.params.agreementID;
});


server.post('/buysingle', (request, response) => {
    const quantity = request.body.Quantity;

});

server.post('/byrecurring', (request, response) => {

});


server.listen(8080, 'localhost', (error) => {
    console.log(error || 'Server Online');
});