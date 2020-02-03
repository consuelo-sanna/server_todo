/*  In questo file c'è lo schema di ogni elemento (todo)
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const TodoSchema = new Schema({
  todos: [
    {
      id: 1,
      testo: "mangiare",
      completed: false
    },
    {
      id: 2,
      testo: "bere",
      completed: false
    },
    {
      id: 3,
      testo: "studiare",
      completed: false
    }
  ],
  editable: {
    id: 0,
    title: ""
  }
});

module.exports = Item = mongoose.model("item", ItemSchema);
