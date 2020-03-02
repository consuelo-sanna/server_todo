/*  In questo file c'è lo schema di ogni elemento (todo)
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const TodoSchema = new Schema({
  testo: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    required: false
  },
  FileSystemPath: {
    type: String,
    required: false
  },
  FileName: {
    type: String,
    required: false
  },
  data: Date
});

module.exports = Todo = mongoose.model("todo", TodoSchema);
