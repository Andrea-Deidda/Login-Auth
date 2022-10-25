const mongoose = require('mongoose')

const bugModelSchema =  new mongoose.Schema({
    title: {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    severity: {
        type : String,
        required : true
    },
    dob: {
        type : String,
        required : true
    },
    username: {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('bug',bugModelSchema )