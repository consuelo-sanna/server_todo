const chalk = require("chalk");

exports.logSocket = (function() {
  var context = chalk.blue(`Socket:`);
  return Function.prototype.bind.call(console.log, console, context);
})();

exports.logTodo = (function() {
  var todo = chalk.magenta("Todo:");
  return Function.prototype.bind.call(console.log, console, todo);
})();

exports.logAutenticazione = (function() {
  var context = chalk.yellow("Todo:");
  return Function.prototype.bind.call(console.log, console, context);
})();

exports.logServizio = (function() {
  var context = chalk.green("Todo:");
  return Function.prototype.bind.call(console.log, console, context);
})();

exports.logStatistics = (function() {
  var context = chalk.yellowBright("Stat:");
  return Function.prototype.bind.call(console.log, console, context);
})();

exports.myTime = function() {
  let date = new Date();

  let ora = date.getHours();
  let min = date.getMinutes();
  return `[${ora}:${min}]`;
};
