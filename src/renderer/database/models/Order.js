var mongoose = require('mongoose')
var Schema = mongoose.Schema

var orderSchema = new Schema({
    orderNumber: {type: String},
    orderItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'orderItemModel'}],
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'clientModel'},
    orderPlacedBy: {type:String},
    orderPlacedDate: {type: Date},
    orderCompletedDate: {type: Date},
    orderStatus: {type:String},
    totalBeforeTaxAmount: {type: Number},
    totalCGST: {type: Number},
    totalSGST: {type: Number},
    totalIGST: {type: Number},
    totalGST: {type: Number},
    totalAfterTaxAmount: {type: Number},
    roundOff: {type: Number},
    savedInvoices: [{type: mongoose.Schema.Types.ObjectId, ref: 'invoiceModel'}],
    savedPaymentSlips: [{type: mongoose.Schema.Types.ObjectId, ref: 'paymentSlipModel'}],
    savedTransportSlips: [{type: mongoose.Schema.Types.ObjectId, ref: 'transportSlipModel'}]
})


var orderModel = mongoose.model('orderModel', orderSchema)
module.exports = orderModel