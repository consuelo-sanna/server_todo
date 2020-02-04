/*  In questo file c'è lo schema di ogni elemento (todo)
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const TodoSchema = new Schema({
  testo: {
    type: String,
    require: true
  },
  completed: {
    type: Boolean,
    require: true
  }
});

module.exports = Todo = mongoose.model("todo", TodoSchema);
