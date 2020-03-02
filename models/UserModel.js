/*  In questo file c'è lo schema di ogni user
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  },
  lastname: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model("user", UserSchema);
