const paypal = require('paypal-rest-sdk');
const mongoService = require('./mongoservice');
const paymentService = module.exports;
const ObjectID = require('mongodb').ObjectID;
require('./config').SetConfig(paypal);

paymentService.CreateItemObject = (name, price, quantity) => {
    const itemObject = {
        name: name,
        price: price,
        currency: 'GBP',
        quantity: quantity
    };
    return itemObject;
};

paymentService.CreateTransactionObject = (tax, shipping, description, itemList) => {

    let total = 0.0;

    for (let i = 0; i < itemList.length; i++) {
        let newQuantity = itemList[i].quantity;
        if (newQuantity >= 1) {
            total += itemList[i].price;
        } else {
            total = itemList[i].price;
        }
    }

    const transactionObject = {
        amount: {
            total: total,
            currency: 'GBP',
            details: {
                tax: tax,
                shipping: shipping
            }
        },
        description: description,
        item_list: {
            items: itemList
        }
    };

    return transactionObject;
};


paymentService.CreateWithPaypal = (transactionArray, returnURL, cancelURL, callback) => {

    let databaseObject = {
        OrderID: '',
        CreateTime: '',
        Transactions: ''
    };

    mongoService.Create('paypal_orders', databaseObject, (error, results) => {

        const paymentObject = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: `${returnURL}/${results.insertedIds[0]}`,
                cancel_url: `${cancelURL}/${results.insertedIds[0]}`
            },
            transactions: transactionArray
        };

        paypal.payment.create(paymentObject, (error) => {

            if (error) {

                return callback(error);

            } else {
                databaseObject = {
                    OrderID: response.id,
                    CreateTime: response.create_time,
                    Transactions: response.transactions
                };

                mongoService.Update('paypal_orders', { _id: results.insertedIds[0] }, databaseObject, (error, results) => {

                    for (let i = 0; i < response.links.length; i++) {
                        if (response.links[i].rel === 'approval_url') {
                            return callback(null, response.links[i].href);
                        }
                    }
                });
            }
        });
    });
};

paymentService.GetPayment = (paymentID, callback) => {

    paypal.payment.get(paymentID, (error, payment) => {
        if (error){
            return callback(error);
        } else {
            return callback(null, payment);
        }
    });
};

paymentService.ExecutePayment = (payerID, orderID, callback) => {

    let payerObject = {
        payer_id: payerID
    };

    mongoService.Read('paypal_orders', {_id: new ObjectID(orderID)}, (error, results) => {
        if (results) {
            paypal.payment.execute(results[0].OrderID, payerObject, {}, (error, response) => {
                if (error) {
                    return callback(error);
                }
                if (response) {
                    let updateObject = { 
                        OrderDetails: response
                    };

                    mongoService.Update('paypal_orders', { _id: new ObjectID(orderID)}, updateObject, (error, update_results) => {
                        return callback(null, orderID);
                    });
                }
            });
        } else {
            return callback('no order found for this id');
        }
    });
};

paymentService.RefundPayment = (saleID, amount, callback) => {

    const data = {
        amount : {
            currency: 'GBP',
            total: amount
        }
    };

    paypal.sale.refund(saleID, data, (error, refund) => {

        if (error) {
            return callback(error);
        } else {
            return callback(null, refund);
        }
    });
};