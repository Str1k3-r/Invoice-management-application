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


clientSchema.pre('remove', function (callback) {
    console.log("CLIENT PRE REMOVE")
    var instance = this
    instance.model('orderModel').find({client: this._id}).then((orders) => {
        Promise.all(orders.map(function (order) {
            instance.model('orderItemModel').deleteMany({order: order._id}).then(() => {
                instance.model('invoiceModel').deleteMany({order: order._id}).then(() => {
                    instance.model('paymentSlipModel').deleteMany({order: order._id}).then(() => {
                        instance.model('transportSlipModel').deleteMany({order: order._id})
                    })
                })
            })
        }))
    }).then(() => {
        instance.model('orderModel').deleteMany({client: this._id}).then(() => {
            callback()
        })
    });
});

var clients = mongoose.model('clientModel', clientSchema)
export default clients