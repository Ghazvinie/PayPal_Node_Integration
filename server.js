const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const purchaseRepo = require('./repos/purchaseRepo.js');

const server = express();

server.use(bodyParser.urlencoded({extended : true}));


server.get('/test/:name', (request, response) => {
    request.send(request.params.name);
    
});

server.get('/', (request, response) => {
    fs.readFile('./templates/home.html', (error, results) => {
        response.send(results.toString());
    });
});

server.get('/success/:orderID', (request, response) => {

    const orderID = request.params.orderID;
    response.send(orderID);

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
    const purchaseName = "Buy Me";
    const purchasePrice = 10.00;
    const taxPrice = 0;
    const shippingPrice = 0;
    const description = "Single Purchase";

    purchaseRepo.BuySingle(purchaseName, purchasePrice, taxPrice, shippingPrice, quantity, description, (error, url) => {
        if (error) {
            response.json(error);
        } else {
            response.redirect(url);
        }

    });

});

server.post('/byrecurring', (request, response) => {

});


server.listen(8080, 'localhost', (error) => {
    console.log(error || 'Server Online');
});