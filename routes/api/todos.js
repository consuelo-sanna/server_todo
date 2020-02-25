/*  qui sono presenti tutte le possibili "strade" e i comandi per
 *  get, post, put e delete
 */

const express = require("express");
const router = express.Router();

const authMid = require("../../middleware/authMiddleware");
const log = require("../../myLog");

const multer = require("multer");
var upload = multer({ dest: "uploads/" });

// Item Model
/* creo una var che fa riferimento al modello del mio db */
const Todo = require("../../models/TodoModel");

// @route  GET api/todos
// @desc   GET All todos
// @access Private
router.get("/", authMid, (req, res) => {
  log.logTodo("stai provando a fare una GET api/todos");
  Todo.find()
    .sort({ _id: -1 })
    .then(todos => res.json(todos));
});

// @route  GETByUser api/todos
// @desc   GETByUser one specific todo
// @access Private
router.get("/:user", authMid, (req, res) => {
  log.logTodo(
    "stai provando a fare una GETbyUser api/todos : " + req.params.user
  );
  Todo.find({ user: req.params.user })
    .sort({ _id: -1 })
    .then(todos => {
      res.json(todos);
    })
    .catch(err => res.status(404).json({ success: false }));
});

/*

// @route  GETById api/todos
// @desc   GETById one specific todo
// @access Private
router.get("/:id", authMid, (req, res) => {
  console.log("stai provando a fare una GET api/todos");
  Todo.findById(req.params.id)
    .then(todo => {
      if (todo) {
        res.status(200).json(todo);
      } else {
        res.status(404).send(" id Not found"); //.json({success:false})
      }
    })
    .catch(err => res.status(404).json({ success: false }));
});
*/

// @route  POST api/todos
// @desc   Create a todo
// @access Private
router.post("/", authMid, upload.single("file"), (req, res) => {
  /*log.logTodo(
    "stai provando a fare una POST api/todos e sei:  " +
      JSON.stringify(req.body)
  );*/
  console.log("req " + req);

  if (!req.body.user || !req.body.testo) {
    res.status(400).json({ msg: "Please enter all fields" });
  } else {
    const newTodo = new Todo({
      testo: req.body.testo,
      user: req.body.user,
      completed: false,
      isDeleted: false,
      data: Date(),
      FileSystemPath: req.file ? req.file.path : ""
    });

    newTodo.save().then(todo => res.json(todo));
  }
});

// @route  PUT api/todos
// @desc   Update a todo
// @access Private
router.put("/:id", authMid, (req, res) => {
  log.logTodo("stai provando a fare una PUT dell id:" + req.params.id);
  Todo.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(() => res.json(req.body))
    .catch(err => console.log(err.message));
});

// @route  DELETE api/todos
// @desc   DELETE a todo
// @access Private
router.delete("/:id", authMid, (req, res) => {
  log.logTodo("stai provando a fare una DELETE dell id:" + req.params.id);
  Todo.findById(req.params.id)
    .then(todo => todo.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

/*  var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./upload");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});   */

// @route  UPLOAD api/todos/upload
// @desc   UPLOAD a todo
// @access Public
router.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.send(req.file);
  } catch (err) {
    res.send(400);
  }
});

module.exports = router;
