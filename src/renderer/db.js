var mongoose = require('mongoose')
var dbURL = 'mongodb://127.0.0.1/xyphr'
mongoose.connect(dbURL);
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))

var productSpecifications = require('./database/models/ProductSpecification')
var hsnCodes = require('./database/models/HSNcode')
var products = require('./database/models/Product')
import clients from './database/models/Client'
var orders = require('./database/models/Order')
var orderItems = require('./database/models/OrderItem')
var invoices = require('./database/models/Invoice')
var paymentSlips = require('./database/models/PaymentSlip')
var transportSlips = require('./database/models/TransportSlip')

//PRODUCTIONSPECIFICATIONS ---------------------------------------------------

function addProductSpecification(productName, fields, callback) {
    productSpecifications.create({
        productName: productName,
        fields: fields
    }, (err, productSpecification) => {
        if (err) {
            console.log(err)
            callback("Not Added")
        }

        callback("Product Specification has been added.")
    })
}


function deleteProductSpecification(id, callback) {
    productSpecifications.findById(id, (err, psDoc) => {
        if (err) {
            callback("Not Found")
        }
        psDoc.remove()
        callback("Found")
    })
}


function getAllProductSpecifications() {
    return productSpecifications.find((err) => {
        if (err) throw err
    }).exec()
}


function updateProductSpecification(id, producName, fields, callback) {
    productSpecifications.updateOne({_id: id}, {
        producName: producName,
        fields: fields
    }).then(() => {
        callback("Product Specification has been updated")
    });
}


//HSNCODES ---------------------------------------------------

function addHSNCode(hsnCode, cgst, sgst, igst, callback) {
    hsnCodes.create({
        hsnCode: hsnCode,
        cgst: cgst,
        sgst: sgst,
        igst: igst
    }, (err, hsnCode) => {
        if (err) {
            console.log(err)
            callback("Not Added")
        }

        callback("HSN Code has been added.")
    })

}

function deleteHSNCode(id, callback) {
    hsnCodes.findById(id, (err, hsnDoc) => {
        if (err) {
            callback("Not Found")
        }
        hsnDoc.remove()
        callback("Found")
    })
}


function getAllHSNCodes() {
    return hsnCodes.find((err) => {
        if (err) throw err
    }).exec()
}


function updateHSNCodes(id, hsnCode, cgst, sgst, igst, callback) {
    hsnCodes.updateOne({_id: id}, {
        hsnCode: hsnCode,
        cgst: cgst,
        sgst: sgst,
        igst: igst
    }).then(() => {
        callback("HSN Code has been updated")
    })
}


//PRODUCTS ---------------------------------------------------


function addProduct(productName, fields, fieldValues, callback) {

    var data = {}
    for (var i = 0; i < fields.length; i++) {
        data[fields[i]] = fieldValues[fields[i]]
    }

    products.create({
        productName: productName,
        fields: data
    }, (err, product) => {
        if (err) {
            console.log(err)
            callback("Not Added")
        }

        callback("Product has been added.")
    })

}

function deleteProduct(id, callback) {

    products.findById(id, (err, pDoc) => {
        if (err) {
            callback("Not Found")
        }
        pDoc.remove()
        callback("Found")
    })
}

function getAllProductsByProductName(productName) {
    return products.find({productName: productName}, (err, products) => {
        if (err) throw err
    }).exec()
}


function getAllProducts() {
    return products.find((err, products) => {
        if (err) throw err
    }).exec()
}

function updateProduct(id, productName, fields, newFieldValues, callback) {

    var newdata = {}
    for (var i = 0; i < fields.length; i++) {
        newdata[fields[i]] = newFieldValues[fields[i]]
    }

    products.updateOne({_id: id}, {
        productName: productName,
        fields: newdata
    }).then(() => {
        callback("Product has been updated")
    })

}


//CLIENTS ---------------------------------------------------

function addClient(clientName, address1, city, state, pincode, phoneNo, mobileNo, gstUIN, callback) {

    clients.create({
        clientName: clientName,
        address1: address1,
        city: city,
        state: state,
        pincode: pincode,
        phoneNo: phoneNo,
        mobileNo: mobileNo,
        gstUIN: gstUIN,
    }, (err, client) => {
        if (err) {
            console.log(err)
            callback("Not Added")
        }

        callback("Client has been added.")
    })

}


function getAllClients() {
    return clients.find((err) => {
        if (err) throw err
    }).sort('clientName').exec()
}

function getClientById(id) {
    return clients.findOne({_id: id}).exec()
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


function deleteClient(id, callback) {
    clients.findById(id, (err, cDoc) => {
        if (err) {
            callback("Not Found")
        }
        cDoc.remove()
        callback("Found")
    })
}

function updateClient(id, clientName, address1, city, state, pincode, phoneNo, mobileNo, gstUIN, callback) {
    clients.updateOne({
        _id: id
    }, {
        clientName: clientName,
        address1: address1,
        city: city,
        state: state,
        pincode: pincode,
        phoneNo: phoneNo,
        mobileNo: mobileNo,
        gstUIN: gstUIN
    }).then(() => {
        callback("Client has been updated!")
    })
}


//ORDERS ---------------------------------------------------
function addOrder(orderNumber, client, orderPlacedBy, orderPlacedDate, orderCompletedDate, orderStatus, orderItems1, callback, instance) {
    var order = new orders({
        _id: new mongoose.Types.ObjectId(),
        orderNumber: orderNumber,
        orderPlacedBy: orderPlacedBy,
        orderPlacedDate: orderPlacedDate,
        orderCompletedDate: orderCompletedDate,
        orderStatus: orderStatus,
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


function getOrderById(id) {
    return orders.find({_id: id}, (err) => {
        if (err) throw err
    }).populate('orderItems').populate('client').populate('savedInvoices').populate('savedPaymentSlips').populate('savedTransportSlips').exec()
}


function callback() {

}

function deleteOrderById(id, callback) {
    orders.findById(id, (err, cDoc) => {
        if (err) {
            callback("Not Found")
        }
        cDoc.remove()
        callback("Found")
    })
}

function deleteOrderItemById(id, callback) {
    orderItems.findById(id, (err, oIDoc) => {
        if (err) {
            callback("Not Found")
        }
        oIDoc.remove()
        callback("Found")
    })
}


function updateOrderItem(id, callback) {
    orderItems.updateOne({_id: id}, {
        productDescription: productDescription,
        itemStatus: itemStatus,
        hsnCode: hsnCode,
        size: size,
        discount: discount,
        quantity: quantity,
        amount: amount,
        taxableAmount: taxableAmount,
        cgstRate: cgstRate,
        cgstAmount: cgstAmount,
        sgstRate: sgstRate,
        sgstAmount: sgstAmount,
        igstRate: igstRate,
        igstAmount: igstAmount,
        totalAmount: totalAmount,
        fulfilledDate: fulfilledDate,
    }).then(() => {
        callback()
    })
}

function getAllOrders() {
    return orders.find((err) => {
        if (err) throw err
    }).populate('orderItems').populate('client').populate('savedInvoices').populate('savedPaymentSlips').populate('savedTransportSlips').exec()
}


var dbUtils = {
    addProductSpecification,
    getAllProductSpecifications,
    deleteProductSpecification,
    updateProductSpecification,
    addHSNCode,
    getAllHSNCodes,
    deleteHSNCode,
    updateHSNCodes,
    addProduct,
    deleteProduct,
    getAllProducts,
    getAllProductsByProductName,
    updateProduct,
    addClient,
    getAllClients,
    updateClient,
    findClient,
    deleteClient,
    getClientById,
    getAllOrders,
    getOrderById,
    deleteOrderById,
    addOrder
}

export default dbUtils