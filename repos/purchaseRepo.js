const ObjectID = require('mongodb').ObjectID;
const paypal = require('paypal-rest-sdk');
const mongoService = require('../services/mongoservice.js');
const paymentService = require('../services/paymentservice.js');
const purchaseRepo = module.exports;

purchaseRepo.BuySingle = (purchaseName, purchasePrice, taxPrice, shippingPrice, itemCount, description, callback) => {

    let transactionsArray = [];

    for (let i = 0; i < itemCount; i++){
        let itemObject = paymentService.CreateItemObject(purchaseName, purchasePrice, 1);
        transactionsArray.push(itemObject);
    }

    let transactionItemObject = [paymentService.CreateTransactionObject(taxPrice, shippingPrice, description, transactionsArray)];

    paymentService.CreateWithPaypal(transactionItemObject, 
        "http://localhost:8080/success",
        "http://localhost:8080/cancel", (error, results) => {
            if (error) {
                return callback(error);
            } else {
                return callback(null, results);
            }
        });
};