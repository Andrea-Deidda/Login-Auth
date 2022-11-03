const mongoose = require('mongoose')

const authModelSchema =  new mongoose.Schema({
    username: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    gender: {
        type : String,
        required : true
    },
    dob: {
        type : Date,
        required : true
    }
})

module.exports = mongoose.model('authUsers', authModelSchema )