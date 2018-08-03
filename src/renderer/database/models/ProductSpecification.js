var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productSpecificationSchema = new Schema({
    fields: [{
        type:String
    }],
    productName: {type: String, unique:true}
})


var productSpecificationModel = mongoose.model('productSpecificationModel', productSpecificationSchema)

module.exports = productSpecificationModel

