const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    firstName: String,
    phone:Number,
    email: String,
    pwd:String,
    image:String

});
module.exports = mongoose.model('students',StudentSchema);