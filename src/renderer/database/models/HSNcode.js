var mongoose = require('mongoose')
var Schema = mongoose.Schema

var hsnSchema = new Schema({
    hsnCode: {type: Number, required: true, unique: true},
    cgst: {type: Number, required: true},
    igst: {type: Number, required: true},
    sgst: {type: Number, required: true}
})

var hsnCodeModel = mongoose.model('hsnCodeModel', hsnSchema)

module.exports = hsnCodeModel

