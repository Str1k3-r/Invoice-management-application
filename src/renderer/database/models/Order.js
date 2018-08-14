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
    savedInvoices: [{type: mongoose.Schema.Types.ObjectId, ref: 'invoiceModel'}],
    savedPaymentSlips: [{type: mongoose.Schema.Types.ObjectId, ref: 'paymentSlipModel'}],
    savedTransportSlips: [{type: mongoose.Schema.Types.ObjectId, ref: 'transportSlipModel'}]
})


orderSchema.pre('remove', function (callback) {
    this.model('orderItemModel').deleteMany({order: this._id}, callback);
    this.model('invoiceModel').deleteMany({order: this._id}, callback);
    this.model('paymentSlipModel').deleteMany({order: this._id}, callback);
    this.model('transportSlipModel').deleteMany({order: this._id}, callback);
    this.model('clientModel').updateOne({_id: this.client._id}, {$pull: {order: {_id: this._id}}}, callback)

});


var orderModel = mongoose.model('orderModel', orderSchema)
module.exports = orderModel