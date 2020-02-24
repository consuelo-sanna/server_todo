const express = require("express");
const router = express.Router();
const authMid = require("../../middleware/authMiddleware");
const log = require("../../myLog");

//potresti creare un nuovo middleware per autenticare il RUOLO.. anche se è gia controllato dal client al momento

const Todo = require("../../models/TodoModel");
const User = require("../../models/UserModel");

// @route  GET api/statistics/
// @desc   GET statistics about todos
// @access Private
router.get("/", authMid, async (req, res) => {
  log.logStatistics("stai provando a fare una GET api/statistics/todos");

  // perche non cambia niente se metto o non metto exec? e perche non funziona con const?
  var totaleTodo = await Todo.countDocuments().exec();
  var totaleUser = await User.countDocuments().exec();
  console.log(totaleTodo);
  var lista = await Todo.find()
    .sort({ data: -1 })
    .limit(5)
    .exec();
  console.log(lista);
  const card = [
    { titolo: "Tot Todo", risultato: totaleTodo },
    { titolo: "Tot User", risultato: totaleUser }
  ];

  const risultato = {
    card: card,
    lista: lista
  };
  res.send(risultato);
});

module.exports = router;
