const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt-nodejs');

// Define our model
const messageSchema = new Schema({
  name: String,
  content: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function
messageSchema.pre('save', function(next) {
  // // get access to the user model
  // const message = this;

  // // generate a salt then run callback
  // bcrypt.genSalt(10, function(err, salt) {
  //   if (err) { return next(err); }
  //   // hash (encrypt) our password using the salt
  //   bcrypt.hash(user.password, salt, null, function(err, hash) {
  //     if (err) { return next(err); }

  //     // overwrite plain text password with encrypted password
  //     user.password = hash;
  //     next();
  //   });
  // });
  next();
});

// Create the model class
const MessageModel = mongoose.model('message', messageSchema);

// Export the model
module.exports = MessageModel;
