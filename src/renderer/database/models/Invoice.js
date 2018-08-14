var mongoose = require('mongoose')
var Schema = mongoose.Schema

var invoiceSchema = new Schema({
    orderNumber: {type:String},
    orderItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'orderItemModel'}],
    billedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'clientModel'},
    shippedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'clientModel'},
    orderPlacedBy: {type: String},
    reverseCharge: {type: String},
    transportationMode: {type:String},
    dateOfSupply: {type: Date},
    placeOfSupply: {type: String},
    state: {type: String},
    stateCode: {type: Number},
    invoiceNumber: {type: String},
    invoiceDate: {type: Date},
    transportationAgency: {type: String},
    numberOfPacking: {type: String},
    privateMarka: {type: String},
    grNo: {type: String},
    date: {type: Date},
    freight: {type: String},
    weight: {type: String},
    msg: {type: String},
    order: {type: mongoose.Schema.Types.ObjectId, ref: 'orderModel'}
})


var invoiceModel = mongoose.model('invoiceModel', invoiceSchema)
module.exports = invoiceModel