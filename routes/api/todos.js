/*  qui sono presenti tutte le possibili "strade" e i comandi per
 *  get, post e delete
 */

const express = require("express");
const router = express.Router();

// @route  GET api/todos
// @desc   GET All todos
// @access Public
router.get("/", (req, res) => {
  console.log("stai provando a fare una GET api/todos");
  res.send(JSON.parse('{"status": "sent Get"}'));
});

// @route  POST api/todos
// @desc   Create a todo
// @access Public
router.post("/", (req, res) => {
  console.log("stai provando a fare una POST api/todos");
  res.send(JSON.parse('{"status": "sent POST"}'));
});

// @route  PUT api/todos
// @desc   Update a todo
// @access Public
router.put("/:id", (req, res) => {
  console.log("stai provando a fare una PUT dell id:" + req.params.id);
  res.send(JSON.parse('{"status": "sent PUT"}'));
});

// @route  DELETE api/todos
// @desc   DELETE a todo
// @access Public
router.delete("/:id", (req, res) => {
  console.log("stai provando a fare una DELETE dell id:" + req.params.id);
  res.send(JSON.parse('{"status": "sent DELETE"}'));
});

module.exports = router;
