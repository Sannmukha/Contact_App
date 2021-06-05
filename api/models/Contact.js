const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ContactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
});

module.exports = Contact = mongoose.model("contacts", ContactSchema);
