/*  qui sono presenti tutte le possibili "strade" e i comandi per
 *  get, post e delete
 */

const express = require("express");
const router = express.Router();

// Item Model
/* creo una var che fa riferimento al modello del mio db */
const Todo = require("../../models/TodoModel");
const Editable = require("../../models/editableModel");

// @route  GET api/todos
// @desc   GET All todos
// @access Public
router.get("/", (req, res) => {
  console.log("stai provando a fare una GET api/todos");
  Todo.find().then(todos => res.json(todos));
});

// @route  GETById api/todos
// @desc   GETById one specific todo
// @access Public
router.get("/:id", (req, res) => {
  console.log("stai provando a fare una GET api/todos");
  Todo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.status(404).json({ success: false }));
});

// @route  POST api/todos
// @desc   Create a todo
// @access Public
router.post("/", (req, res) => {
  console.log("stai provando a fare una POST api/todos   " + req.body.testo);
  const newTodo = new Todo({
    testo: req.body.testo,
    completed: false
  });
  newTodo.save().then(todo => res.json(todo));
});

// @route  PUT api/todos
// @desc   Update a todo
// @access Public
router.put("/:id", (req, res) => {
  console.log("stai provando a fare una PUT dell id:" + req.params.id);
  Todo.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(todo => res.json(todo))
    .catch(err => res.status(404).json({ success: false }));
});

// @route  DELETE api/todos
// @desc   DELETE a todo
// @access Public
router.delete("/:id", (req, res) => {
  console.log("stai provando a fare una DELETE dell id:" + req.params.id);
  Todo.findById(req.params.id)
    .then(todo => todo.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
