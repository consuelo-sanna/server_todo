/*  qui sono presenti tutte le possibili "strade" e i comandi per
 *  get, post, put e delete
 */

const express = require("express");
const router = express.Router();

const authMid = require("../../middleware/authMiddleware");
const log = require("../../myLog");

const multer = require("multer");
var upload = multer({ dest: "uploads/" });
const fs = require("fs");

const schemas = require("../../schemas");
const validation = require("../../middleware/validationMiddleware");

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

// @route  DOWNLOAD api/todos/download
// @desc   DOWNLOAD a todo
// @access Private

router.get("/download/:path", authMid, (req, res) => {
  var filePath = req.params.path; // Or format the path using the `id` rest param
  console.log("path creato: " + __dirname + "/../../uploads/" + filePath);
  try {
    res.download(__dirname + "/../../uploads/" + filePath);
  } catch (err) {
    54;
    res.send(400);
  }
});

// @route  GETByUser api/todos
// @desc   GETByUser one specific todo
// @access Private
router.get(
  "/:user",
  authMid,
  validation(schemas.todoListByUser, "params"),
  (req, res) => {
    log.logTodo(
      "stai provando a fare una GETbyUser api/todos : " + req.params.user
    );

    Todo.find({ user: req.params.user })
      .sort({ _id: -1 })
      .then(todos => {
        res.json(todos);
      })
      .catch(err => res.status(404).json({ success: false }));
  }
);

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
      FileSystemPath: req.file ? req.file.path : "",
      FileName: req.file ? req.file.originalname : ""
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
router.delete("/:id", authMid, async (req, res) => {
  log.logTodo("stai provando a fare una DELETE dell id:" + req.params.id);
  Todo.findById(req.params.id)
    .then(todo => {
      /** elimino il file dal file system */
      if (todo.FileSystemPath !== "") {
        fs.unlink(__dirname + "/../../" + todo.FileSystemPath, function(err) {
          if (err) throw err;
        });
      }
      return todo;
    })
    .then(todo => todo.remove().then(() => res.json({ success: true })))
    .catch(err => {
      console.log(err);
      res.status(404).json({ success: false });
    });
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
  console.log("sono in upload");
  try {
    res.send(req.file);
  } catch (err) {
    res.send(400);
  }
});

module.exports = router;
