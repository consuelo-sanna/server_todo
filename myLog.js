const chalk = require("chalk");

exports.logSocket = (function() {
  var context = chalk.blue("Socket:");
  return Function.prototype.bind.call(console.log, console, context);
})();

exports.logTodo = (function() {
  var todo = chalk.magenta("Todo:");
  return Function.prototype.bind.call(console.log, console, todo);
})();

exports.logAutenticazione = (function() {
  var todo = chalk.yellow("Todo:");
  return Function.prototype.bind.call(console.log, console, todo);
})();
