var mongoose = require('mongoose')
var Schema = mongoose.Schema

var invoiceSchema = new Schema({
    orderNumber: {type:String},
    orderItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'orderItemModel'}],
    billedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'clientModel'},
    shippedTo: {
        clientName: {type: String},
        address1: {type: String},
        city: {type: String},
        state: {type: String},
        phoneNo: {type: Number},
        mobileNo: {type: Number},
        gstUIN: {type: String},
        pincode: {type: Number}
    },
    orderPlacedBy: {type: String},
    orderPlacedDate: {type: Date},
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
    ewayBillNo: {type: String},
}, {strict: false})


var invoiceModel = mongoose.model('invoiceModel', invoiceSchema)
module.exports = invoiceModel