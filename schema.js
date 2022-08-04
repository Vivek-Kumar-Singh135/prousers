var mongoose = require('mongoose')
var firstSchema = new mongoose.Schema({
    name: { type: String, required: true, uppercase: true },
    email: { type: String },
    age: { type: Number },
    prograd_id: { type: Number },
    squad: { type: Number }
})

module.exports = mongoose.model('firstModel', firstSchema);