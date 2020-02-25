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
  },
  user: {
    type: String,
    require: true
  },
  isDeleted: {
    type: Boolean,
    require: false
  },
  FileSystemPath: {
    type: String,
    require: false
  },
  FileName: {
    type: String,
    require: false
  },
  data: Date
});

module.exports = Todo = mongoose.model("todo", TodoSchema);
