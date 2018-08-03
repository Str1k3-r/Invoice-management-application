var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productSchema = new Schema({
    productName: {type: String, required: true, unique:true},
    fields: [Schema.Types.Mixed]

}, {strict:false})


var productModel = mongoose.model('productModel', productSchema)
module.exports = productModel
