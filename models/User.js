const { MongoUnexpectedServerResponseError } = require('mongodb');
const mongoose = require('mongoose');

userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        unique: true,
    },    
    lastName: {
        type: String,
        required: true,
        unique: true,
        
    },       
    
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phonenumber: {
        type: Number,
        required: true,
        unique: true,
        minLength: 10
        
    },   
    password: {
        type: String,
        required: true,
        minLength: 8
    },

});

const User = mongoose.model('User', userSchema);
module.exports = User;