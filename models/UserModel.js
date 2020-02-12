/*  In questo file c'è lo schema di ogni user
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: false
  },
  lastname: {
    type: String,
    require: false
  },
  role: {
    type: String,
    require: true
  }
});

module.exports = User = mongoose.model("user", UserSchema);
