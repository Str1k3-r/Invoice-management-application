var mongoose = require('mongoose')
var dbURL = 'mongodb://127.0.0.1/xyphr'
mongoose.connect(dbURL);
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))

var productSpecification = require('./database/models/ProductSpecification')
var hsnCodes = require('./database/models/HSNcode')
var products = require('./database/models/Product')
var clients = require('./database/models/Client')
var orders = require('./database/models/Order')
var orderItems = require('./database/models/OrderItem')
var invoices = require('./database/models/Invoice')
var paymentSlips = require('./database/models/PaymentSlip')
var transportSlips = require('./database/models/TransportSlip')

//PRODUCTIONSPECIFICATIONS ---------------------------------------------------

function addProductSpecification(productName, fields) {
    var productSpecification = new productSpecification({
        productName: productName,
        fields: fields
    })
    productSpecification.save(function (err) {
        if (err) throw err;

        console.log('Product successfully saved.');
    });
}


function deleteProductSpecification(productName) {
    productSpecification.deleteOne({productName: productName}, (err) => {
        if (err) throw err;

        console.log('Product successfully deleted.');
    })
}


function getAllProductSpecifications() {
    return productSpecification.find((err) => {
        if (err) throw err
    }).exec()
}


function getProductSpecification(productName) {
    productSpecification.find({productName: productName}, (err, productSpecifications) => {
        if (err) throw err

        console.log(productSpecifications)
        return productSpecifications
    })
}


function updateProductSpecification(producName, fields) {
    productSpecification.updateOne({productName: producName}, {
        producName: producName,
        fields: fields
    }, (err, productSpecifications) => {
        if (err) throw err

        console.log(productSpecifications)
        return productSpecifications
    })
}


//HSNCODES ---------------------------------------------------

function addHSNCode(hsnCode, cgst, sgst, igst) {
    var hsnCode = new hsnCodes({
        hsnCode: hsnCode,
        cgst: cgst,
        sgst: sgst,
        igst: igst
    })
    hsnCode.save(function (err) {
        if (err) throw err;

        console.log('HSNCode successfully saved.');
    });
}

function deleteHSNCode(hsnCode) {
    hsnCode.deleteOne({hsnCode: hsnCode}, (err) => {
        if (err) throw err;

        console.log('HSNCode successfully deleted.');
    })
}


function getAllHSNCodes() {
    return hsnCodes.find((err) => {
        if (err) throw err
    }).exec()
}


function getHSNCode(hsnCode) {
    hsnCode.find({hsnCode: hsnCode}, (err, hsnCode) => {
        if (err) throw err

        console.log(hsnCode)
        return hsnCode
    })
}

function updateHSNCodes(hsnCode, cgst, sgst, igst) {
    hsnCode.updateOne({hsnCode: hsnCode}, {
        hsnCode: hsnCode,
        cgst: cgst,
        sgst: sgst,
        igst: igst
    }, (err, hsnCode) => {
        if (err) throw err

        console.log(hsnCode)
        return hsnCode
    })
}


//PRODUCTS ---------------------------------------------------


function addProduct(productName, fields, fieldValues) {

    data = {}
    for (i = 0; i < fields.length; i++) {
        data[fields[i]] = fieldValues[i]
    }

    var product = new products({
        productName: productName,
        fields: data
    })
    product.save(function (err) {
        if (err) throw err;

        console.log('Product successfully saved.');
    });
}

function deleteProduct(fields, fieldValues) {

    data = {}
    for (i = 0; i < fields.length; i++) {
        data[fields[i]] = fieldValues[i]
    }

    console.log(data)


    products.deleteOne({fields: data}, (err) => {
        if (err) throw err;

        console.log('Product successfully deleted.');
    })
}

function getAllProductsByProductName(productName) {
    return products.find({productName: productName}, (err, products) => {
        if (err) throw err
    }).exec()
}

function getAllProductsByProperties(obj) {
    return products.find(obj, (err, products) => {
        if (err) throw err
    }).exec()
}

function getAllProducts() {
    return products.find((err, products) => {
        if (err) throw err
    }).exec()
}

function getProduct(field, fieldValues) {

    var data = {}
    for (i = 0; i < fields.length; i++) {
        data[fields[i]] = fieldValues[i]
    }

    console.log(data)


    hsnCode.find({fields: data}, (err, product) => {
        if (err) throw err

        console.log(product)
        return product
    })
}


function updateProduct(productName, field, fieldValues, newFieldValues) {

    var data = {}
    for (i = 0; i < fields.length; i++) {
        data[fields[i]] = fieldValues[i]
    }

    console.log(data)

    var newdata = {}
    for (i = 0; i < fields.length; i++) {
        newdata[fields[i]] = newFieldValues[i]
    }

    console.log(newdata)

    hsnCode.updateOne({fields: data}, {
        productName: productName,
        fields: newdata
    }, (err, product) => {
        if (err) throw err

        console.log(product)
        return product
    })

}


//CLIENTS ---------------------------------------------------

function addClient(clientName, address1, city, state, pincode, phoneNo, mobileNo, gstUIN) {

    var client = new clients({
        clientName: clientName,
        address1: address1,
        city: city,
        state: state,
        pincode: pincode,
        phoneNo: phoneNo,
        mobileNo: mobileNo,
        gstUIN: gstUIN,
    })

    client.save().then(() => {
        console.log("Client saved successfully")
    });
}


function getAllClients() {
    return clients.find((err) => {
        if (err) throw err
    }).sort('clientName').exec()
}

function findClient(client) {
    return clients.find({
        clientName: client.clientName,
        address1: client.address1,
        city: client.city,
        state: client.state,
        pincode: client.pincode,
        phoneNo: client.phoneNo,
        mobileNo: client.mobileNo,
        gstUIN: client.gstUIN
    }, (err) => {
        if (err) throw err
    }).exec()

}


//ORDERS ---------------------------------------------------
function addOrder(orderNumber, client, orderPlacedBy, orderPlacedDate, orderCompletedDate, orderStatus, totalBeforeTaxAmount, totalCGST, totalSGST, totalIGST, totalGST, totalAfterTaxAmount, roundOff, orderItems1, callback, instance) {
    var order = new orders({
        _id: new mongoose.Types.ObjectId(),
        orderNumber: orderNumber,
        orderPlacedBy: orderPlacedBy,
        orderPlacedDate: orderPlacedDate,
        orderCompletedDate: orderCompletedDate,
        orderStatus: orderStatus,
        totalBeforeTaxAmount: totalBeforeTaxAmount,
        totalCGST: totalCGST,
        totalSGST: totalSGST,
        totalIGST: totalIGST,
        totalGST: totalGST,
        totalAfterTaxAmount: totalAfterTaxAmount,
        roundOff: roundOff,
        savedInvoices: null,
        savedPaymentSlips: null,
        savedTransportSlips: null
    })


    var promises = []

    for (var i = 0; i < orderItems1.length; i++) {

        var oI = new orderItems({
            productDescription: orderItems1[i].productDescription,
            itemStatus: orderItems1[i].itemStatus,
            hsnCode: orderItems1[i].hsnCode,
            size: orderItems1[i].size,
            discount: orderItems1[i].discount,
            quantity: orderItems1[i].quantity,
            amount: orderItems1[i].amount,
            taxableAmount: orderItems1[i].taxableAmount,
            cgstRate: orderItems1[i].cgstRate,
            cgstAmount: orderItems1[i].cgstAmount,
            sgstRate: orderItems1[i].sgstRate,
            sgstAmount: orderItems1[i].sgstAmount,
            igstRate: orderItems1[i].igstRate,
            igstAmount: orderItems1[i].igstAmount,
            totalAmount: orderItems1[i].totalAmount,
            fulfilledDate: orderItems1[i].fulfilledDate,
            order: order._id,
            invoice: null
        })

        promises.push(oI.save())
    }


    Promise.all(promises).then((values) => {
        console.log(values.length, values)
        for (var i = 0; i < values.length; i++) {
            order.orderItems.push(values[i])
        }
    }).then(() => {

        promises = []

        clients.findOneAndUpdate({
            clientName: client.clientName,
            address1: client.address1,
            city: client.city,
            state: client.state,
            pincode: client.pincode,
            phoneNo: client.phoneNo,
            mobileNo: client.mobileNo,
            gstUIN: client.gstUIN
        }, {$push: {orders: order._id}}, {"new": true}).exec().then((c, err) => {
            if (err) {
                console.log(c, err)
                throw err
            }

            if (c == null || c == undefined) {
                c = new clients({
                    clientName: client.clientName,
                    address1: client.address1,
                    city: client.city,
                    state: client.state,
                    pincode: client.pincode,
                    phoneNo: client.phoneNo,
                    mobileNo: client.mobileNo,
                    gstUIN: client.gstUIN,
                    orders: [order._id],
                    invoices: null
                })

                c.save().then(() => {
                    order.client = c._id
                }).then(() => {
                    order.save().then(() => {
                        callback(instance)
                    })
                })


            } else {
                order.client = c._id
                order.save().then(() => {
                    callback(instance)
                })
            }
        })

    })

}


function callback() {

}

function getAllOrders() {
    return orders.find((err) => {
        if (err) throw err
    }).populate('orderItems').populate('client').populate('savedInvoices').populate('savedPaymentSlips').populate('savedTransportSlips').exec()
}


var dbUtils = {
    addProductSpecification,
    getAllProductSpecifications,
    getProductSpecification,
    deleteProductSpecification,
    updateProductSpecification,
    addHSNCode,
    getAllHSNCodes,
    getHSNCode,
    deleteHSNCode,
    updateHSNCodes,
    getAllProducts,
    getAllProductsByProductName,
    getAllProductsByProperties,
    addClient,
    getAllClients,
    getAllOrders,
    addOrder
}

export default dbUtils