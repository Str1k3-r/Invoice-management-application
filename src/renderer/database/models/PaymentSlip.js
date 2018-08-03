var mongoose = require('mongoose')
var Schema = mongoose.Schema

var paymentSlipSchema = new Schema({
    dbNO: {type: String},
    directNo: {type: String},
    ms: {type: String},
    billNo: {type: String},
    agent: {type: String},
    state: {type: String},
    amount: {type: String},
    gstin: {type: String},
    date: {type: Date},
    pincode: {type: Number},
    phoneNo: {type: Number},
    mobileNo: {type: Number},
    chequeNo: {type: String},
    chequeDate: {type: Date},
    chequeAmount: {type: String},
    bank: {type: String},
    order: {type: mongoose.Schema.Types.ObjectId, ref: 'orderModel'}
})


var paymentSlipModel = mongoose.model('paymentSlipModel', paymentSlipSchema)
module.exports = paymentSlipModel