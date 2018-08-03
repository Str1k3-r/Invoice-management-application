var mongoose = require('mongoose')
var Schema = mongoose.Schema

var transportSlipSchema = new Schema({
    transport: {type: String},
    consignee: {type: String},
    privateMarka: {type: String},
    goods: [{type: String}],
    value: {type: String},
    destination: {type: String},
    date: {type: Date},
    GSTIN: {type: String},
    quantity: {type: String},
    freight: {type: String},
    cartrage: {type: String},
    order: {type: mongoose.Schema.Types.ObjectId, ref: 'orderModel'}
})


var transportSlipModel = mongoose.model('transportSlipModel', transportSlipSchema)
module.exports = transportSlipModel