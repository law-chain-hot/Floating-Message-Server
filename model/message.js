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
  next();
});

// Create the model class
const MessageModel = mongoose.model('message', messageSchema);

// Export the model
module.exports = MessageModel;
