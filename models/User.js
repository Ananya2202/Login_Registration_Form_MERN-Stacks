const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  rname: {
    type: String,
    required: true
  },
  rcontact: {
    type: String,
    required: true
  },
  rcountry: {
    type: String,
    required: true
  },
  remail: {
    type: String,
    required: true
  },
  rpassword: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = User = mongoose.model("users", UserSchema);