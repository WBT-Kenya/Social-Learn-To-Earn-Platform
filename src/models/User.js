const { MongoUnexpectedServerResponseError } = require('mongodb');
const mongoose = require('mongoose');
const argon2 = require('argon2');

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
    
    // phonenumber: {
    //     type: Number,
    //     required: true,
    //     unique: true,
    //     minLength: 10
        
    // },        
    password: {
        type: String,
        required: true,
        minLength: 8
    },

});

userSchema.pre('save', async function (next) {
    try {
      if (this.isModified('password') || this.isNew) {
        const hashedPassword = await argon2.hash(this.password);
        this.password = hashedPassword;
      }
      next();
    } catch (error) {
      next(error);
    }
  });
const User = mongoose.model('User', userSchema);
module.exports = User;