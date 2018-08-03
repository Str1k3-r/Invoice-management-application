var mongoose = require('mongoose')
var Schema = mongoose.Schema

var clientSchema = new Schema({
    clientName: {type: String},
    address1: {type:String},
    city: {type:String},
    state: {type:String},
    pincode: {type:Number},
    phoneNo: {type: String},
    mobileNo: {type:String},
    gstUIN: {type: String},
    invoices: [{type: mongoose.Schema.Types.ObjectId, ref: 'invoiceModel'}],
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'orderModel'}]
})


var clientModel = mongoose.model('clientModel', clientSchema)
module.exports = clientModel