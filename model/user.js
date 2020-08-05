const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// Define our model
const userModel = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
})

// Encrypt the user code
userModel.pre('save', function(next) {
    // console.log("this", this)
    const user = this    // IMPORTANT! Do not use arrow function, it will cause 'this' problem
    
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err) }
        // console.log("salt:", salt)

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return next(err) }
            console.log(hash)
            user.password = hash
            next()
        })
    })
})

// Define a fn to compare them
userModel.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) { return callback(err); }
  
      callback(null, isMatch);
    });
  }

// Create the model class
const ModelClass = mongoose.model('user', userModel)

module.exports = ModelClass

