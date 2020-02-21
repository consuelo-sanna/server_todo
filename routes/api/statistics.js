const express = require("express");
const router = express.Router();
const authMid = require("../../middleware/authMiddleware");
const log = require("../../myLog");

//potresti creare un nuovo middleware per autenticare il RUOLO.. anche se è gia controllato dal client al momento

const Todo = require("../../models/TodoModel");

// @route  GET api/statistics/todos
// @desc   GET statistics about todos
// @access Public
router.get("/todos", (req, res) => {
  log.logStatistics("stai provando a fare una GET api/statistics/todos");

  /* const totalTodos = async function() {
    try {
      return await Todo.countDocuments()
        .sort({ data: -1 })
        .then(todos => res.json(todos));
    } catch (err) {
      console.log(err);
    }
  };
  let totale = totalTodos();
  res.send({ totali: totale }); */

  /*var myPromise = () => {
    return new Promise((resolve, reject) => {
      Todo.countDocuments()
        .sort({ data: -1 })
        .then(todos => res.json(todos));
    });
  };
  var callMyPromise = async () => {
    var result = await myPromise();
    console.log(result);
    return result;
  };
  console.log(callMyPromise();  */

  //console.log(totalTodos());

  /*const total = async (req, res) => {
    const valore = await Todo.countDocuments()
      .sort({ data: -1 })
      .then(todos => res.json(todos));
  };
  console.log(total);
  res.json({ totale: total });*/

  const resw = Todo.countDocuments();
  console.log(resw);
  res.end(resw);
});

module.exports = router;
